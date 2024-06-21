import type { Metadata } from "next";
import localFont from "next/font/local";

import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import { ThemeProvider } from "@/Theme/Theme-provider";

const Fragment = localFont({
  src: [
    {
      path: "../fonts/PPFragment-GlareRegular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-fragment",
});

const Instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});

export const metadata: Metadata = {
  title: "Blog | Shiva Yadav",
  description: "Blog by Shiva Yadav",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "flex min-h-[100dvh] flex-col font-instrument antialiased",
          Fragment.variable,
          Instrument.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
