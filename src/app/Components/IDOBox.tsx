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

  symbol: string; // logo and symbol should allows be the same. aka SKL,
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
  symbol: string; // logo and symbol should allows be the same. aka SKL,
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
      <span className={styles.container}>
        <span className={styles.container_item}>
          <Image
            className={styles.image_top}
            src={`/IDO.png`}
            alt="AquasTrade Logo outbound external links"
            width={307}
            height={168}
          />
        </span>

        <span className={styles.container_item}>
          <span className={styles.text_logo}> Grey text </span> -{" "}
          <span>
            {" "}
            <Image
              className={styles.image_right}
              src={`/EUROPA.png`}
              alt="AquasTrade Logo outbound external links"
              width={24}
              height={24}
            />{" "}
          </span>
        </span>

        <span className={styles.container}>
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

            <button className={styles.container_item}> TBA </button>
          </ul>
        </span>
      </span>
    </div>
  );
};

export default memo(IDOBox);
