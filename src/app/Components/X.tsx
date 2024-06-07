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

import styles from "@/app/Styles/Links.module.css";

interface Props {
  tokenAddress: string;
  decimals: number;
  checkAddress: string;
}

const Test = (params: Props) => {
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
            <span>
              {" "}
              <Image
                src="SKL.svg"
                alt="Spinning Image"
                width={50}
                height={50}
              />
            </span>
            <span>
              {" "}
              Symbol
              <CardDescription className={styles.card_desc}>
                Name
              </CardDescription>
            </span>
          </CardTitle>

          <CardDescription>
            {" "}
            <Image
              className={styles.image_invert_center}
              src="SKL.svg"
              alt="AquasTrade Logo outbound external links"
              width={14}
              height={14}
            />
          </CardDescription>
        </CardHeader>

        <CardContent className={styles.card_address}>
          <span> Holders:</span>

          <span>Link</span>
        </CardContent>

        <CardContent>
          <span>Max Supply: </span>
        </CardContent>

        <CardFooter className={styles.card_footer}>
          <span>
            <Link href="/swap/amm">Trade</Link>{" "}
          </span>{" "}
          |{" "}
          <span>
            <Link href="/dashboard/airdrop">Airdrop</Link>{" "}
          </span>
          |{" "}
          <span>
            <Link href="/dashboard/metaport">Bridge</Link>{" "}
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default memo(Test);
