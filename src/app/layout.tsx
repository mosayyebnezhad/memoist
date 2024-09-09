import type { Metadata } from "next";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { Providers } from "../wrappers/provider";
import Context1 from "@/wrappers/contexts";


import { Vazirmatn } from "next/font/google"
import Navbar from "./components/navbar";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
const vazir = Vazirmatn({
  subsets: ["arabic"]
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={vazir.className}>
        <NextUIProvider>
          <Providers>
            <Context1>
            <Navbar />
              {children}
            </Context1>
          </Providers>
        </NextUIProvider>
      </body>
    </html>
  );
}
