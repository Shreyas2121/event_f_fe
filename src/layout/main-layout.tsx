"use client";
import Header from "@/components/header";
import { client as QClient } from "@/lib/query";
import { QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  console.log(client);

  return (
    <QueryClientProvider client={QClient}>
      <body
        className={`bg-gradient-to-br from-base-100 to-base-200 min-h-screen`}
      >
        <Toaster />
        <Header />
        {children}
      </body>
    </QueryClientProvider>
  );
};

export default MainLayout;
