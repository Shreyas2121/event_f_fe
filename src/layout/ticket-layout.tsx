import ContactForm from "@/components/user/contact-form";
import OTPVerify from "@/components//user/otp-verify";
import Success from "@/components/success";
import TicketForm from "@/components/ticket/ticket-form";
import { Event } from "@/lib/types";
import { useStep } from "@/store/step";

import React, { useEffect, useMemo } from "react";

const TicketLayout = ({ event }: { event: Event }) => {
  const { setStep, step, user: stepUser } = useStep();

  useEffect(() => {
    if (step === 4) return;

    if (stepUser && stepUser.verified) {
      setStep(3);
    } else if (stepUser) {
      setStep(2);
    } else {
      setStep(1);
    }
  }, [stepUser, setStep, step, event]);

  const Comp = useMemo(() => {
    if (step === 1) {
      return <ContactForm />;
    } else if (step === 2) {
      return <OTPVerify />;
    } else if (step === 3) {
      return <TicketForm event={event} />;
    } else if (step === 4) {
      return <Success />;
    }
  }, [step, event]);

  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-neon-green text-center">
        Buy Tickets 🎫
      </h2>

      {Comp}
    </div>
  );
};

export default TicketLayout;
