import { API } from "@/lib/axios";
import { QUERY_KEYS } from "@/lib/constants";
import { Payment, TicketC, UserTickets } from "@/lib/types";
import { useMutation, useQuery } from "@tanstack/react-query";

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
  return useMutation({
    mutationFn: async (ticketsData: any) => {
      const { data } = await API.post("/tickets/buy", ticketsData);
      return data.data as TicketC[];
    },
  });
};

export const useGetMyTickets = (contactData: any) => {
  return useQuery({
    queryKey: [QUERY_KEYS.tickets.user],
    queryFn: async () => {
      const { data } = await API.get("/tickets", {
        params: {
          email: contactData.email,
          phone: contactData.phone,
        },
      });
      return data.data as UserTickets[];
    },
    enabled: false,
  });
};
