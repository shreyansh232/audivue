import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Audivue AI",
  description: "Real Time AI Voice Agent Interview Platform",
  openGraph: {
    title: "Audivue AI",
    description: "Real Time AI Voice Agent Interview Platform",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Site preview",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${urbanist.variable} antialiased pattern bg-black`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
