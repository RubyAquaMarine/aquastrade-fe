"use client";
import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

//import TokenInfoBox from "@/app/Components/TokenInfoBox";

import TokenInfoBox from "@/app/Components/TokenInfoBoxClean";

import Test from "@/app/Components/X";

import IDOBox from "@/app/Components/IDOBox2";

import BasicTable from "@/app/Components/table/BasicTable";

import styles from "@/app/Styles/Flex.module.css";

const TokenList = ({ params }: any) => {
  return (
    <main>
      <div className={styles.page__container}>
        <div className={styles.header}>
          <h1 id={styles.header__title}>CSS Grid Card Skeleton Screen</h1>
          <h2 id={styles.header__description}>
            Example of a skeleton screen for a card loader using CSS Grid and
            Custom Properties.
          </h2>
          <div className={styles.divider}></div>
        </div>

        <div className={styles.grid}>
          <div className={styles.skeleton}>
            <div className={styles.card}>
              {" "}
              <TokenInfoBox
                {...{ address: "0x5F795bb52dAC3085f578f4877D450e2929D2F13d" }}
              >
                {" "}
              </TokenInfoBox>{" "}
            </div>

            <div className={styles.card}> </div>
            <div className={styles.card}> </div>

            <div className={styles.card}> Test </div>

            <div className={styles.card}> Test </div>
          </div>

          <div className={styles.skeleton}>
            <div className={styles.card}> Test </div>

            <div className={styles.card}> Test </div>

            <div className={styles.card}> Test </div>

            <div className={styles.card}> Test </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TokenList;
