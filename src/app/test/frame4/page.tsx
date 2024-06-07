"use client";
import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

import IDOBox from "@/app/Components/IDOBox2";
import styles from "@/app/Styles/Flex4.module.css";

// 5 Columns

const TokenList = ({ params }: any) => {
  return (
    <main>
      <div className={styles.page__container}>
        {/**    Grid   Flex  */}

        <div className={styles.grid}>
          {/**    Only One column designed for Telegram only   */}{" "}
        </div>
      </div>
    </main>
  );
};

export default TokenList;
