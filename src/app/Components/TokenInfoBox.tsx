"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, memo, useRef } from "react";
import { formatUnits } from "viem";
import { useAccount, useSwitchChain } from "wagmi";
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
  const { address, isConnected, chain, addresses } = useAccount();
  const logo_url = useRef<string>();

  const [savedData, setData] = useState<any>();

  const token = findTokenFromAddress(props.address);
  const data: any = useSkaleExplorerAddresses(props.address as WALLET);

  useEffect(() => {
    if (token) {
      console.log(
        "Render: TokenInfoBox: preConfig: ",
        token,
        " Fetched Data",
        data,
      );
      setData(token); // set token info from the preConfigs , otherwise use the feteched data
      logo_url.current = token.logo;
    } else {
      // No logo exists for this token
      logo_url.current = '/EUROPA.png' as string;
      setData(data);
    }
  }, [token]);

  // console.log("TokenInfoBox  Saved Token ", savedData)

  return (
    <div>
      {savedData && savedData.total_supply ? (
        <span>
          <Card className={styles.card}>
            <CardHeader>
              <CardTitle className={styles.card_title}>
                <span>
                  {" "}
                  {logo_url.current && (
                    <Image
                      src={`${logo_url.current}`}
                      alt="Spinning Image"
                      width={50}
                      height={50}
                      priority
                    />
                  )}{" "}
                </span>
                <span>
                  {" "}
                  {savedData?.symbol}
                  <CardDescription className={styles.card_desc}>
                    {savedData?.name}
                  </CardDescription>
                </span>
              </CardTitle>

              <CardDescription>
                {" "}
                <Link
                  href={
                    chain?.blockExplorers?.default.url +
                    "/address/" +
                    savedData?.address
                  }
                  target="_blank"
                >
                  <Image
                    className={styles.image_invert_center}
                    src={`/outbound.svg`}
                    alt="AquasTrade Logo outbound external links"
                    width={14}
                    height={14}
                    priority
                  />
                </Link>
              </CardDescription>
            </CardHeader>

            <CardDescription>Holders: {savedData?.holders}</CardDescription>

            <CardContent>
              <span>{savedData?.address}</span>
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
        </span>
      ) : (
        <span>
          <Card className={styles.card}>
            <CardHeader>
              <CardTitle className={styles.card_title}>
                <span>
                  {" "}
                  {logo_url.current && (
                    <Image
                      src={`${logo_url.current}`}
                      alt="Spinning Image"
                      width={50}
                      height={50}
                      priority
                    />
                  )}{" "}
                </span>
                <span>
                  {" "}
                  {savedData?.symbol}
                  <CardDescription className={styles.card_desc}>
                    {savedData?.name}
                  </CardDescription>
                </span>
              </CardTitle>

              <CardDescription>
                {" "}
                <Link
                  href={
                    chain?.blockExplorers?.default.url +
                    "/address/" +
                    savedData?.address
                  }
                  target="_blank"
                >
                  <Image
                    className={styles.image_invert_center}
                    src={`/outbound.svg`}
                    alt="AquasTrade Logo outbound external links"
                    width={14}
                    height={14}
                    priority
                  />
                </Link>
              </CardDescription>
            </CardHeader>

            <CardContent>
              <span>{savedData?.address}</span>
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
        </span>
      )}
    </div>
  );
};

export default TokenInfoBox;
