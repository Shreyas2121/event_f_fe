import { API } from "@/lib/axios";
import { QUERY_KEYS } from "@/lib/constants";
import { Payment, TicketC, UserTickets } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useValidateTicket = () => {
  return useMutation({
    mutationFn: async (validateData: any) => {
      const { data } = await API.post("/tickets/validate", validateData);
      return data.message as string;
    },
  });
};

export const useProcessPayment = () => {
  return useMutation({
    mutationFn: async (paymentData: any) => {
      const { data } = await API.post("/payments/process", paymentData);
      return data.data as Payment;
    },
  });
};

export const useBuyTickets = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (ticketsData: any) => {
      const { data } = await API.post("/tickets/buy", ticketsData);
      return data.data as TicketC[];
    },
    onSuccess: (data) => {
      client.invalidateQueries({
        queryKey: [QUERY_KEYS.events.single, data[0].event.id],
      });
    },
  });
};

export const useGetMyTickets = () => {
  return useMutation({
    mutationFn: async (contactData: any) => {
      const { data } = await API.get("/tickets", {
        params: {
          email: contactData.email,
          phone: contactData.phone,
        },
      });
      return data.data as UserTickets[];
    },
  });
};
