import { API } from "@/lib/axios";
import { User } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";

export const useCheckContact = () => {
  return useMutation({
    mutationFn: async (contactData: any) => {
      const { data } = await API.post("/users/check-contact", contactData);
      return data.data as {
        verified: boolean;
        user: User;
      };
    },
  });
};

export const useVerifyOTP = () => {
  return useMutation({
    mutationFn: async (otp: string) => {
      const { data } = await API.post("/users/verify-otp", { otp });
      return data as {
        verified: boolean;
        message: string;
      };
    },
  });
};
