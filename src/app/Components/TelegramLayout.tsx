// @ts-nocheck
"use client";
import React, { ReactNode } from "react";

import Navbar from "./NavbarHover";

import styles from "@/app/Styles/Telegram.module.css";

type MobileLayoutProps = {
  children: ReactNode;
};

// Single Column , equal padding, Hover nav.

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.content}>{children}</main>
    </div>
  );
};

export default MobileLayout;
