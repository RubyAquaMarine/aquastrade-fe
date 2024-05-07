"use client";
import React from "react";

import styles from "@/app/Styles/Support.module.css";
import Link from "next/link";
const Home = ({ children, params }: any) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className={styles.container_center}>
        <span className={styles.text_style_border}> Contact us today: </span>

        <span className={styles.text_style_border}>
          {" "}
          <Link
            href="mailto:0xCDeb7F7974D89Fd71089487D65AA9731d7E846F5@dmail.ai?subject=Need Help at Aquas.Trade"
            target="_blank"
          >
            0xCDeb7F7974D89Fd71089487D65AA9731d7E846F5@dmail.ai
          </Link>
        </span>
      </div>
    </main>
  );
};

export default Home;
