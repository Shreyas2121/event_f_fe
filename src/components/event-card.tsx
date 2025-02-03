import { Event } from "@/lib/types";
import Link from "next/link";
import React from "react";

const EventCard = ({ event }: { event: Event }) => {
  console.log(event);
  return (
    <div className="card w-96 bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
      <div className="card-body relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-neon-green rounded-full opacity-20"></div>
        <h2 className="card-title text-2xl font-bold text-vibrant-pink z-10">
          {event.name}
        </h2>
        <p className="text-electric-blue">
          <strong>Date:</strong> {new Date(event.date).toDateString()}
        </p>
        <p className="text-sunny-yellow">
          <strong>Location:</strong> {event.location}
        </p>
        <p className="text-neon-green">
          <strong>Available Tickets:</strong> {event.availableTickets} /{" "}
          {event.totalTickets}
        </p>
        <div className="card-actions justify-end mt-4">
          <button
            className={`btn btn-primary text-white ${
              event.availableTickets === 0
                ? "btn-disabled"
                : "hover:btn-secondary"
            } transition-colors duration-300`}
            disabled={event.availableTickets === 0}
          >
            <Link href={`/events/${event.id}`}>View Details</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
