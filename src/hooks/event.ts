import { API } from "@/lib/axios";
import { QUERY_KEYS } from "@/lib/constants";
import { Event } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export const useGetEvents = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.events.all],
    queryFn: async () => {
      const { data } = await API.get("/events");
      return data.data as Event[];
    },
  });
};

export const useGetEvent = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.events.single, id],
    queryFn: async () => {
      const { data } = await API.get(`/events/${id}`);
      return data.data as Event;
    },
    enabled: !!id,
  });
};
