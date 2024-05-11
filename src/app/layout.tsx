import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// import "@fontsource/roboto/300.css";
// import "@fontsource/roboto/400.css";
// import "@fontsource/roboto/500.css";
// import "@fontsource/roboto/700.css";

import { type ReactNode } from "react";
import Navbar from "@/app/Components/Navbar";
import NavbarBottom from "./Components/navbarBottom";

import { Providers } from "./providers";
import styles from "./Styles/MainBody.module.css";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aquas.Trade",
  description: "SKALE network Defi Hub",
};
// React Componenet
// add Nav - Footer - Header here - or any seo - build consistent layout for app
// nested layout.tsx within other folders to customize
export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Providers>
          <AppRouterCacheProvider>{props.children}</AppRouterCacheProvider>
        </Providers>
      </body>
    </html>
  );
}

/*

 <body className={inter.className}>
        <Navbar />
        <Providers>{props.children}
          <NavbarBottom />
        </Providers>
      </body>
      */
