import { TicketC, User } from "@/lib/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface StepState {
  step: number;
  setStep: (step: number) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  clear: () => void;
  tickets: TicketC[];
  setTickets: (ticket: TicketC[]) => void;
}

export const useStep = create<StepState>()(
  persist(
    (set) => ({
      step: 1,
      setStep: (step) => set({ step }),
      user: null,
      setUser: (user) => set({ user }),
      tickets: [],
      setTickets: (tickets) => set({ tickets }),
      clear: () =>
        set({
          step: 1,
          user: null,
          tickets: [],
        }),
    }),
    {
      name: "step-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
