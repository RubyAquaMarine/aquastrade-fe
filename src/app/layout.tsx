import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { type ReactNode } from "react";
import Navbar from "@/app/Components/Navbar";
import NavbarBottom from "./Components/navbarBottom";

import { Providers } from "./providers";

import styles_tv from "./Styles/MainBody.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
// React Componenet
// add Nav - Footer - Header here - or any seo - build consistent layout for app
// nested layout.tsx within other folders to customize
export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={styles_tv.p_body}>
          <Navbar />
          <Providers>{props.children}</Providers>
        </div>
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
