"use client";
import React from "react";
import StockTicker from "./StockTickerV";

import { GetStarted } from "@/app/Components/GetStarted";
import styles from "@/app/Styles/StockTicker.module.css";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span className={styles.flex_more}>
        <span className={styles.dashboard}>
          <GetStarted></GetStarted>
        </span>
        <span className={styles.datafeed}>
          {" "}
          <StockTicker />{" "}
        </span>
      </span>
    </footer>
  );
};
export default Footer;
