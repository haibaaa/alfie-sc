import "~/styles/globals.css";
import TopNav from "./_components/topNav"

import {
  ClerkProvider,
} from '@clerk/nextjs'

import { type Metadata } from "next";
import { Geist } from "next/font/google";

export const metadata: Metadata = {
  title: "alfie",
  description: "your one stop solution to freelancing",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <TopNav />
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
