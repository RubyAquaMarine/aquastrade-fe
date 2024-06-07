"use client";
import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

import IDOBox from "@/app/Components/IDOBox";
import styles from "@/app/Styles/Flex.module.css";

// 5 Columns

const TokenList = ({ params }: any) => {
  return (
    <main>
      <div className={styles.page__container}>
        <div className={styles.grid}>
          <div className={styles.skeleton}>
            <div className={styles.card}> </div>
            <div className={styles.card}> </div>
            <div className={styles.card}> </div>
          </div>

          <div className={styles.skeleton}>
            <div className={styles.card}> </div>
            <div className={styles.card}> </div>
            <div className={styles.card}></div>
          </div>

          <div className={styles.skeleton}>
            <div className={styles.card}> </div>
            <div className={styles.card}> </div>
            <div className={styles.card}> </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TokenList;
