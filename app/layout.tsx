import type { Metadata } from "next";
import localFont from "next/font/local";
import { Roboto_Mono } from "next/font/google";

import { Header } from "@/components/header";
import { site } from "@/content/site";

import "./globals.css";

const satoshi = localFont({
  src: [
    {
      path: "./fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  fallback: ["sans-serif", "Helvetica", "Arial"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: site.name,
  description: "Personal website",
  icons: {
    icon: "/images/website-icon/akkub0y.jpeg",
    apple: "/images/website-icon/akkub0y.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${satoshi.variable} ${robotoMono.variable}`}>
      <body className="min-h-screen bg-bg">
        <Header />
        {children}
      </body>
    </html>
  );
}
