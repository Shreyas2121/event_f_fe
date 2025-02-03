"use client";

import Loader from "@/components/loader";
import { useGetEvent } from "@/hooks/event";
import TicketLayout from "@/layout/ticket-layout";
import React, { use } from "react";

const EventDetails = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = use(params);
  const { data, isLoading } = useGetEvent(Number(resolvedParams.id));

  if (isLoading || data === undefined) {
    return <Loader />;
  }

  const event = data;

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Event Header */}
      <div className="bg-gradient-to-r from-vibrant-pink to-electric-blue p-8 text-white text-center">
        <h1 className="text-4xl font-extrabold mb-2 drop-shadow-lg">
          {event.name}
        </h1>
        <p className="text-xl font-medium">
          {new Date(event.date).toLocaleDateString()}
        </p>
      </div>

      <div className="p-8 space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Event Details Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-vibrant-pink">
              Event Details
            </h2>
            <p className="mb-4 text-gray-700 leading-relaxed">
              {event.description}
            </p>

            <div className="space-y-2 text-gray-800">
              <p>
                <strong className="text-electric-blue">📍 Location:</strong>{" "}
                {event.location}
              </p>
              <p>
                <strong className="text-electric-blue">📅 Date:</strong>{" "}
                {new Date(event.date).toLocaleString()}
              </p>
              <p>
                <strong className="text-electric-blue">
                  🎟️ Available Tickets:
                </strong>{" "}
                {event.availableTickets} / {event.totalTickets}
              </p>
              <p>
                <strong className="text-electric-blue">💸 Price:</strong> $
                {event.price.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Ticket Purchase Form */}
          <TicketLayout event={event} />
        </div>

        {/* Additional Info Section */}
        <div className="border-t pt-6">
          <h2 className="text-2xl font-semibold mb-4 text-sunny-yellow">
            Additional Information
          </h2>
          <div className="space-y-2 text-gray-800">
            <p>
              <strong className="text-electric-blue">🔔 Event Status:</strong>{" "}
              {event.isActive ? "Active" : "Inactive"}
            </p>
            <p>
              <strong className="text-electric-blue">📅 Created:</strong>{" "}
              {new Date(event.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong className="text-electric-blue">🔄 Last Updated:</strong>{" "}
              {new Date(event.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
