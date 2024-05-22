"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, memo, useRef } from "react";
import { parseEther, parseUnits, formatUnits } from "viem";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/Components/ui/Card";

import styles from "@/app/Styles/TokenInfoBox.module.css";

// Custom stuff

import {
  useSkaleExplorerAddresses,
  WALLET,
} from "@/app/Hooks/useSkaleExplorer";
import { findTokenFromAddress } from "../Utils/findTokens";

type ADDRESS = {
  address: `0x${string}`;
};

const TokenInfoBox = (props: ADDRESS) => {
  const logo_url = useRef();

  const [savedData, setData] = useState<any>();

  const data: any = useSkaleExplorerAddresses(props.address as WALLET);

  useEffect(() => {
    if (data) {
      setData(data);
      if (data?.address) {
        logo_url.current = findTokenFromAddress(data?.address)?.logo;
      }
    }
  }, [data]);

  console.log("TokenInfoBox: ", props, data, savedData);

  return (
    <div>
      {savedData && savedData.total_supply ? (
        <span>
          <Card className={styles.card}>
            <CardHeader>
              <CardTitle className={styles.card_title}>
                <span> {savedData?.symbol} </span>
                <span>
                  {" "}
                  {logo_url.current && (
                    <Image
                      src={`${logo_url.current}`}
                      alt="Spinning Image"
                      width={20}
                      height={20}
                      priority
                    />
                  )}{" "}
                </span>
              </CardTitle>
              <CardDescription>{savedData?.name}</CardDescription>
              <CardDescription>{savedData?.address}</CardDescription>
            </CardHeader>
            <CardContent>
              <span>Holders: {savedData?.holders}</span>
            </CardContent>
            <CardContent>
              <span>
                Max Supply:{" "}
                {formatUnits(
                  BigInt(savedData.total_supply),
                  Number(savedData.decimals),
                )}{" "}
              </span>
            </CardContent>

            <CardContent>
              <span>Decimals: {savedData?.decimals}</span>
            </CardContent>
            <CardFooter>
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
        </span>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default memo(TokenInfoBox);
