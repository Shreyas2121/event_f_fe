import { MutationCache, QueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  mutationCache: new MutationCache({
    onError: (err: any) => {
      console.log(err);
      const message = err.response.data.message;
      toast.error(message || "Error Occured");
    },
  }),
});
