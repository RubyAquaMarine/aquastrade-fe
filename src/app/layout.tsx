import { type ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/app/Components/Navbar";
import NavbarBottom from "./Components/navbarBottom";

import HandleThemes from "./Components/HandleTheme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aquas.Trade",
  description:
    "Fastest growing defi hub on the l2 modular scaling network: SKALE $SKL",
};
// React Componenet
// add Nav - Footer - Header here - or any seo - build consistent layout for app
// nested layout.tsx within other folders to customize
export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <HandleThemes defaultTheme="dark">
          <Navbar />
          <Providers>
            <AppRouterCacheProvider>{props.children}</AppRouterCacheProvider>
          </Providers>
        </HandleThemes>
      </body>
    </html>
  );
}
