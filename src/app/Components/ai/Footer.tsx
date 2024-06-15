// components/Footer.js
"use client";
import React from "react";
import StockTicker from "./StockTicker";
import styles from "@/app/Styles/Landing.module.css";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <StockTicker />
    </footer>
  );
};
// style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#333', color: '#fff', textAlign: 'center', padding: '10px 0' }

export default Footer;
