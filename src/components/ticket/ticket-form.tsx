"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Event } from "@/lib/types";

import { formatPrice } from "@/lib/utils";
import {
  useBuyTickets,
  useProcessPayment,
  useValidatePayment,
  useValidateTicket,
} from "@/hooks/ticket";
import { useStep } from "@/store/step";
import toast from "react-hot-toast";
import { ticketSchema } from "@/lib/zodSchema";
import FormError from "../error";

type ZodT = z.infer<typeof ticketSchema>;

const TicketForm = ({ event }: { event: Event }) => {
  const { user, setTickets, setStep, setUser } = useStep();
  const validateM = useValidateTicket();
  const paymentM = useProcessPayment();
  const validatePaymentM = useValidatePayment();
  const ticketM = useBuyTickets();

  const {
    register,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm<ZodT>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  const quantity = watch("quantity");

  const onSubmit = async (data: ZodT) => {
    const obj = {
      eventId: event.id,
      userId: user?.id,
      quantity: data.quantity,
    };
    await validateM.mutateAsync(obj);
    const paymentRes = await paymentM.mutateAsync({
      amount: quantity * event.price,
      userId: user?.id,
      eId: event.id,
    });

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_ID,
      amount: paymentRes.order.amount,
      order_id: paymentRes.order.id,

      handler: async (response: any) => {
        await validatePaymentM.mutateAsync({
          ...response,
          paymentId: paymentRes.paymentInfo.id,
        });

        toast.success("Payment successful");

        const newObj = {
          ...obj,
          paymentId: paymentRes.paymentInfo.id,
        };
        await ticketM.mutateAsync(newObj, {
          onSuccess: (tickets) => {
            toast.success("Tickets booked successfully");
            setTickets(tickets);
            setUser(null);
            setStep(4);
          },
        });
      },
    };

    const rz = new (window as any).Razorpay(options);
    rz.open();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="input input-bordered flex items-center gap-2">
            Quantity (Max {event.maxTicketsPerUser})
            <input
              type="number"
              {...register("quantity", { valueAsNumber: true })}
              min="1"
              disabled={
                validateM.isPending || paymentM.isPending || ticketM.isPending
              }
              max={event.maxTicketsPerUser}
              className="grow"
              placeholder="1"
            />
          </label>
          {errors.quantity && <FormError message={errors.quantity.message} />}
        </div>

        <p className="text-lg text-center">
          <strong>Total:</strong> {formatPrice(event.price * quantity)}
        </p>

        <button
          type="submit"
          className="btn btn-primary text-white w-full hover:scale-105 transition-transform duration-300"
          disabled={
            event.availableTickets === 0 ||
            validateM.isPending ||
            paymentM.isPending ||
            ticketM.isPending ||
            validatePaymentM.isPending
          }
        >
          Buy Tickets Now
        </button>
      </form>
    </>
  );
};

export default TicketForm;
