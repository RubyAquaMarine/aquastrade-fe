"use client";
import React, { useEffect, useRef, useState } from "react";

import styles from "@/app/Styles/Links.module.css";
import Link from "next/link";
const Home = ({ children, params }: any) => {
  return (
    <main className={styles.container_center}>
      <div>
        <p>Contact us today.</p>

        <p>
          {" "}
          <Link
            href="mailto:0xCDeb7F7974D89Fd71089487D65AA9731d7E846F5@dmail.ai?subject=Need Help at Aquas.Trade"
            target="_blank"
          >
            0xCDeb7F7974D89Fd71089487D65AA9731d7E846F5@dmail.ai
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Home;
