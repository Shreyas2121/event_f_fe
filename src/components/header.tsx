"use client";

import { useUser } from "@/store/user";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-vibrant-pink to-electric-blue text-white">
      <div className="navbar container mx-auto">
        <div className="flex-1">
          <Link
            href={"/"}
            className="text-3xl font-bold text-white drop-shadow-lg"
          >
            🎉 Event Fiesta 🎉
          </Link>
        </div>
        <Link className="text-white font-bold mr-10" href={"/tickets"}>
          View Tickets
        </Link>
      </div>
    </header>
  );
};

export default Header;
