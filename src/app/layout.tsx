import type { Metadata } from "next";
import "./globals.css";

import MainLayout from "@/layout/main-layout";

export const metadata: Metadata = {
  title: "Event Fiesta",
  description: "Events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="cupcake" lang="en">
      <MainLayout>{children}</MainLayout>
    </html>
  );
}
