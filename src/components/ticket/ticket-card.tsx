import { TicketC } from "@/lib/types";
import { Download } from "lucide-react";
import Image from "next/image";
import React from "react";

const TicketCard = ({ ticket }: { ticket: TicketC }) => {
  const handleDownload = (qr: string, eventName: string) => {
    const link = document.createElement("a");
    link.href = qr;
    link.download = `${eventName}_QR.png`;
    link.click();
  };

  return (
    <div className="flex flex-col items-center">
      <Image
        src={ticket.qr}
        alt="QR Code"
        height={192}
        width={192}
        className="rounded-lg border"
      />
      <div className="text-center">
        <h2 className="text-2xl font-bold">{ticket.event.name}</h2>
        <p className="text-gray-500">
          {new Date(ticket.event.date).toLocaleString()}
        </p>
        <p className="text-gray-500">Location: {ticket.event.location}</p>
      </div>
      <div className="text-sm text-gray-400">
        Ticket UID: {ticket.ticketUid}
      </div>
      <button
        type="button"
        onClick={() => handleDownload(ticket.qr, ticket.event.name)}
        className="btn btn-primary text-white flex items-center gap-2"
      >
        <Download className="w-4 h-4" /> Download QR
      </button>
    </div>
  );
};

export default TicketCard;
