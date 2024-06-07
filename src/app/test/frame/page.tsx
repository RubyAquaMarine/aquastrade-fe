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

import IDOBox from "@/app/Components/IDOBox";

import BasicTable from "@/app/Components/table/BasicTable";

import styles from "@/app/Styles/Flex.module.css";

// 5 Columns

const TokenList = ({ params }: any) => {
  return (
    <main>
      <div className={styles.page__container}>
        <div className={styles.grid}>
          <div className={styles.skeleton}>
            <div className={styles.card}>
              {" "}
              1{" "}
              <TokenInfoBox
                {...{ address: "0x5F795bb52dAC3085f578f4877D450e2929D2F13d" }}
              >
                {" "}
              </TokenInfoBox>{" "}
            </div>
          </div>
          <div className={styles.skeleton}>
            <div className={styles.card}>
              {" "}
              3{" "}
              <TokenInfoBox
                {...{ address: "0x5F795bb52dAC3085f578f4877D450e2929D2F13d" }}
              >
                {" "}
              </TokenInfoBox>{" "}
            </div>

            <div className={styles.card}> 3IDOBox </div>

            <div className={styles.card}> 3IDOBox </div>
          </div>

          <div className={styles.skeleton}>
            <div className={styles.card}> 4IDOBox </div>

            <div className={styles.card}> 4IDOBox </div>

            <div className={styles.card}> 4IDOBox </div>

            <div className={styles.card}> 4IDOBox </div>
          </div>

          <div className={styles.skeleton}>
            <div className={styles.card}> 5IDOBox </div>

            <div className={styles.card}> 5IDOBox </div>

            <div className={styles.card}> 5IDOBox </div>

            <div className={styles.card}> 5IDOBox </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TokenList;
