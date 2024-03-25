"use client";
import Link from "next/link";
import React, { useState } from "react";
import styles from "../Styles/Header.module.css"; // You can create a CSS module for styling

import Oracle from "@/app/Components/ReadRazorOracle";

// client components
const NavbarBottom = () => {
  return (
    <header className={styles.header}>
      <nav>
        <div className={styles.align_test}>
          <div className={styles.float_left}>
            <ul className={styles.navListTight}>
              <li>
                <Oracle name="ETHUSD" />
              </li>
            </ul>
          </div>

          <div className={styles.float_center}>
            <ul className={styles.navListWide}>
              <li className={styles.navItem}>
                <Link href="/perps">Perps</Link>
              </li>
            </ul>
          </div>

          <div className={styles.float_right}>
            <ul className={styles.navListTight}>
              <li>Aquas.Trade</li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavbarBottom;
