import React, { useEffect } from "react";

import { useStep } from "@/store/step";
import TicketCard from "./ticket-card";

function Success() {
  const { tickets } = useStep();

  if (!tickets || tickets.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="font-bold text-lg">Your Tickets</h3>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 ">
        {tickets.map((ticket) => (
          <TicketCard ticket={ticket} key={ticket.id} />
        ))}
      </div>
    </div>
  );
}

export default Success;
