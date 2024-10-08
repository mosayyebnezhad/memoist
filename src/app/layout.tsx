import type { Metadata } from "next";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { Providers } from "../wrappers/provider";
import Context1 from "@/wrappers/contexts";


import { Vazirmatn } from "next/font/google"
import Navbar from "./components/navbar";
import { ReactQuery } from "@/wrappers/reactquery";
export const metadata: Metadata = {
  title: "memoist | وب سایت مموایست",
  description: "وب سایت مموایست",
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

        <ReactQuery>
          <NextUIProvider>
            <Providers>
              <Context1>
                <Navbar />
                {children}
              </Context1>
            </Providers>
          </NextUIProvider>
        </ReactQuery>
      </body>
    </html>
  );
}
