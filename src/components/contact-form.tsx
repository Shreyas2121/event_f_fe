import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormError from "./error";
import { useCheckContact } from "@/hooks/user";
import { useStep } from "@/store/step";
import toast from "react-hot-toast";
import { contactFormSchema } from "@/lib/zodSchema";

const ContactForm = () => {
  const contactM = useCheckContact();
  const { setStep, setUser } = useStep();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof contactFormSchema>) => {
    const res = await contactM.mutateAsync(data);
    setUser(res.user);
    if (res.verified) {
      setStep(3);
    } else {
      toast.success("OTP Sent Successfully.");
      setStep(2);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="input input-bordered flex items-center gap-2">
          Email
          <input
            type="email"
            {...register("email")}
            className="grow"
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
            placeholder="Enter your phone number"
          />
        </label>
        {errors.phone && <FormError message={errors.phone.message} />}
      </div>

      <button
        type="submit"
        className="btn btn-primary w-1/4 text-white"
        disabled={contactM.isPending}
      >
        Verify
      </button>
    </form>
  );
};

export default ContactForm;
