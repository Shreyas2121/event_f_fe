"use client";

import FormError from "@/components/error";
import Loader from "@/components/loader";
import TicketCard from "@/components/ticket/ticket-card";
import { useGetMyTickets } from "@/hooks/ticket";
import { ContactForm, contactFormSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

const Tickets = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      email: "",
      phone: "",
    },
  });

  const email = watch("email");
  const phone = watch("phone");

  const { data, isLoading, refetch } = useGetMyTickets({
    email,
    phone,
  });

  const onSubmit = async (data: ContactForm) => {
    console.log(data);
    refetch();
  };

  console.log(data);

  return (
    <div className="mt-5">
      <h3 className="font-bold text-3xl text-center text-vibrant-pink">
        My Tickets
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" p-2 grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
      >
        <div>
          <label className="input input-bordered flex items-center gap-2">
            Email
            <input
              type="email"
              {...register("email")}
              className="grow"
              disabled={phone ? true : false}
              placeholder="Enter your email"
            />
          </label>
          {errors.email && <FormError message={errors.email.message} />}
        </div>

        <div>
          <label className="input input-bordered flex items-center gap-2">
            Phone
            <input
              type="text"
              {...register("phone")}
              className="grow"
              disabled={email ? true : false}
              placeholder="Enter your phone number"
            />
          </label>
          {errors.phone && <FormError message={errors.phone.message} />}
        </div>

        <button className="btn btn-primary text-white">Search</button>
      </form>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {data &&
            (data.length === 0 ? (
              <p>No Tickets Found.</p>
            ) : (
              <div className="space-y-6">
                {data.map((ev) => (
                  <div
                    key={ev.id}
                    className="card bg-base-100 shadow-xl p-5 border border-gray-200 rounded-2xl"
                  >
                    <div className="card-body">
                      <h2 className="card-title text-2xl font-bold text-primary">
                        {ev.name}
                      </h2>
                      <p className="text-gray-500">
                        {new Date(ev.date).toLocaleString()} | {ev.location}
                      </p>

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {ev.tickets.map((t) => (
                          <TicketCard ticket={t} key={t.id} />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Tickets;
