
import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/components/providers/NextAuthProvider";
import ClientLayout from "@/components/layout/ClientLayout";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GP Travels | Premium Travel Experiences",
  description: "Explore amazing destinations with GP Travels, your trusted partner for unforgettable journeys.",
  openGraph: {
    title: "GP Travels | Premium Travel Experiences",
    description: "Explore amazing destinations with GP Travels, your trusted partner for unforgettable journeys.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // THE SHELL IS NOW INSTANT
  // Navbar and Footer are passed as props to ClientLayout,
  // allowing them to stay as Server Components with their own Suspendable data fetching.
  
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f97316" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextAuthProvider>
          <ClientLayout 
            navbar={
              <Suspense fallback={<div className="h-20 bg-white/50 animate-pulse fixed top-0 w-full z-[100]" />}>
                <Navbar />
              </Suspense>
            }
            footer={
              <Suspense fallback={<div className="h-64 bg-slate-900 animate-pulse" />}>
                <Footer />
              </Suspense>
            }
          >
            {children}
          </ClientLayout>
        </NextAuthProvider>
      </body>
    </html>
  );
}
