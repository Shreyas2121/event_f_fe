import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import FormError from "./error";
import { useVerifyOTP } from "@/hooks/user";
import toast from "react-hot-toast";
import { useStep } from "@/store/step";

const otpSchema = z.object({
  otp: z.string().regex(/^\d{6}$/, "OTP must be a 6-digit number"),
});

const OTPVerify = () => {
  const otpM = useVerifyOTP();
  const { setStep } = useStep();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof otpSchema>) => {
    otpM.mutate(data.otp, {
      onSuccess: (res) => {
        if (res.verified) {
          toast.success(res.message);
          setStep(3);
        }
      },
    });
  };

  return (
    <div>
      <h3 className="font-bold text-lg">Enter OTP</h3>
      <p className="py-2">Please enter the OTP sent to your contact.</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Enter OTP"
          className="input input-bordered w-full mb-2"
          maxLength={6}
          {...register("otp")}
        />

        {errors.otp && <FormError message={errors.otp.message} />}

        <button
          disabled={otpM.isPending}
          className="btn btn-primary text-white w-full"
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default OTPVerify;
