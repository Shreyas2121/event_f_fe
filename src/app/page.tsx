"use client";

import EventCard from "@/components/event/event-card";
import Loader from "@/components/loader";
import { useGetEvents } from "@/hooks/event";
import { useStep } from "@/store/step";
import { useEffect } from "react";

export default function Home() {
  const { data, isLoading } = useGetEvents();
  const { clear } = useStep();

  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <main className="container mx-auto py-12 px-4">
      <h2 className="text-4xl font-bold mb-8 text-center text-vibrant-pink drop-shadow-lg">
        🌟 Upcoming Spectacular Events 🌟
      </h2>
      {isLoading && data === undefined ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {data && (
            <>
              {data.map((event) => (
                <EventCard event={event} key={event.id} />
              ))}
            </>
          )}
        </div>
      )}
    </main>
  );
}
