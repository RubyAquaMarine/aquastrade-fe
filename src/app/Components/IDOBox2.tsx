/*


 WIP:  scroll bar if content is more than 300 px in height for IDO 

 Needs a Min Width to prvent Text from collapsing 

 There are  15 lines of info wow 

*/

// @ts-nocheck
"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, memo, useRef } from "react";
import { formatUnits } from "viem";
import { useERC20Token } from "@/app/Hooks/useAMM";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/Components/ui/Card";

import styles from "@/app/Styles/CardIDO.module.css";

export type IDOBoxProps = {
  logo: string;
  banner: string;
  project_name: string;

  symbol: string; // logo and symbol should allows be the same. aka SKL, BTC etc
  token_address: string;
  decimals: number;
  price: string;

  max_allocation: string;
  max_usd: string;

  max_supply: string;

  imc: string; // Initial Market Cap  ( # of tokens being sold times the USD value per token )
  fdv: string;

  start_date: string;
  end_date: string;
};

export type IDOBoxSC = {
  // TOKEN : 5
  name: string; // bann er will the project name  banner: string;  aka AquasTrade, AQUASTRADE  .toUPPERCASE
  symbol: string; // logo and symbol should allows be the same. aka SKL, BTC etc
  token_address: string;
  decimals: number;
  max_supply: string;
  // IDO : 4
  price: string;
  max_allocation: string;
  start_date: string;
  end_date: string;
};

const IDOBox = (params: IDOBoxProps) => {
  const divRef = useRef<HTMLDivElement>(null);

  const [amount, setBalance] = useState(BigInt(0));

  // useEffect(() => {
  //   if (token_balance) {
  //     setBalance(token_balance);
  //   }
  // }, [token_balance]);

  return (
    <div id="token_supply" ref={divRef}>
      <Card className={styles.card}>
        <CardHeader>
          <CardTitle className={styles.card_title}>
            <Image
              className={styles.image_top}
              src={`/IDO.png`}
              alt="AquasTrade Logo outbound external links"
              width={307}
              height={168}
            />
          </CardTitle>
        </CardHeader>

        <CardContent className={styles.card_address}>
          <ul>
            <li>
              {" "}
              <span className={styles.text_grey}> Grey text </span> -{" "}
              <span className={styles.text_wht}> White text </span>{" "}
            </li>
            <li>
              {" "}
              <span className={styles.text_grey}> Grey text </span> -{" "}
              <span className={styles.text_wht}> White text </span>{" "}
            </li>
            <li>
              {" "}
              <span className={styles.text_grey}> Grey text </span> -{" "}
              <span className={styles.text_wht}> White text </span>{" "}
            </li>

            <li>
              {" "}
              <span className={styles.text_grey}> Grey text </span> -{" "}
              <span className={styles.text_wht}> White text </span>{" "}
            </li>
            <li>
              {" "}
              <span className={styles.text_grey}> Grey text </span> -{" "}
              <span className={styles.text_wht}> White text </span>{" "}
            </li>
            <li>
              {" "}
              <span className={styles.text_grey}> Grey text </span> -{" "}
              <span className={styles.text_wht}> White text </span>{" "}
            </li>

            <li>
              {" "}
              <span className={styles.text_grey}> Grey text </span> -{" "}
              <span className={styles.text_wht}> White text </span>{" "}
            </li>
            <li>
              {" "}
              <span className={styles.text_grey}> Grey text </span> -{" "}
              <span className={styles.text_wht}> White text </span>{" "}
            </li>
            <li>
              {" "}
              <span className={styles.text_grey}> Grey text </span> -{" "}
              <span className={styles.text_wht}> White text </span>{" "}
            </li>

            <button className={styles.container_item}> TBA </button>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default memo(IDOBox);
