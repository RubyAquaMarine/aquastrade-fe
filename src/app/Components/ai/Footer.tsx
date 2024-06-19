// components/Footer.js
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
// style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#333', color: '#fff', textAlign: 'center', padding: '10px 0' }

export default Footer;

/*
 <footer className={styles.footer}>

<ul>
<li> </li>

</ul>
      <span>  <StockTicker /> </span>
      <span><GetStarted></GetStarted></span>
    
    </footer>
*/
