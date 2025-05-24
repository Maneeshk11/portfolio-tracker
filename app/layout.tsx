import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Poppins, Lora, Fira_Code } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/providers/provider";
import { getConfig } from "@/lib/configs/wagmi";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Portfolio Tracker",
  description: "Portfolio Tracker",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    getConfig(),
    (await headers()).get("cookie")
  );

  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${lora.variable} ${firaCode.variable} antialiased`}
      >
        <Providers initialState={initialState}>{children}</Providers>
      </body>
    </html>
  );
}
