import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { Vazirmatn } from "next/font/google";

import { Navbar } from "@/components/navbar";
import { Toaster } from "react-hot-toast";
import Reactquery from "./Reactquery";
import Contextprovider from "./context";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

const vazirmatn = Vazirmatn({})


export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="fa">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background antialiased",
          vazirmatn.className,
        )}
      > 
      <NextTopLoader />
      <Contextprovider>

          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <div className="relative flex flex-col h-screen">
              <Navbar />

              <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                <Reactquery>

                  {children}

                </Reactquery>
              </main>
            </div>
          </Providers>
          <Toaster
            reverseOrder
          />
        </Contextprovider>
      </body>
    </html>
  );
}
