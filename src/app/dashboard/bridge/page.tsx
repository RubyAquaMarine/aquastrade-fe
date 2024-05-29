"use client";
import React, { useEffect } from "react";
import SwapMeson from "@/app/Components/Meson";
import styles from "@/app/Styles/Home.module.css";
const Home = () => {
  return (
    <main className={styles.container}>
      <div>
        <SwapMeson />
      </div>
    </main>
  );
};

export default Home;
