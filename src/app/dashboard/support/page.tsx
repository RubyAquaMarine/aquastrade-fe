"use client";
import React from "react";

import styles from "@/app/Styles/Support.module.css";
import Link from "next/link";
const Home = ({ children, params }: any) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className={styles.midText}>Email </h1>
      <div>
        <p className={styles.container_center}>Contact us today.</p>

        <p className={styles.container_center}>
          {" "}
          <Link
            href="mailto:0xCDeb7F7974D89Fd71089487D65AA9731d7E846F5@dmail.ai?subject=Need Help at Aquas.Trade"
            target="_blank"
            className={styles.text_style_border}
          >
            0xCDeb7F7974D89Fd71089487D65AA9731d7E846F5@dmail.ai
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Home;
