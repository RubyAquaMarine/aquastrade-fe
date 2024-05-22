"use client";
//@ts-nocheck
import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

import Link from "next/link";

import { CHAIN } from "@/app/Utils/config";

import { useAccount, useSwitchChain } from "wagmi";

import Overview from "@/app/Components/Overview";

import { useAquaFeed } from "@/app/Hooks/useAquaFeed";

import styles from "@/app/Styles/Overview.module.css";

type DataFeedV = {
  id: string;
  pool: string;
  pricePool: string;
  priceFeed: string;
  assets: string[];
  quote: string;
  base: string;
};

const Home = ({ params }: any) => {
  const [inputWallet, setWallet] = useState<`0x${string}`>();

  const { address, isConnected, chain } = useAccount();
  const [tableData, setTableData] = useState<DataFeedV[]>();

  const objectFeeds: any = useAquaFeed("consumeFeeds")?.data;

  useEffect(() => {
    if (objectFeeds && objectFeeds?.length > 1) {
      setTableData(objectFeeds);
      console.log(" Render | OverView", objectFeeds);
    }
  }, [objectFeeds]);

  useEffect(() => {
    if (address) {
      setWallet(address);
      console.log(" Render | OverView", address);
    }
  }, [address]);

  console.log(" Render | objectFeeds", objectFeeds);

  return (
    <main className={styles.container}>
      {address && isConnected && tableData && chain && chain.id === CHAIN.id ? (
        // @ts-ignore: Unreachable code error
        <Overview {...tableData}></Overview>
      ) : (
        <span className={styles.button_back}>  <Link href="/">
        {" "}
        <b>Back </b>(Connect to SKALE: Europa Liquidity Hub to unlock
        features)
      </Link></span>
      )}
    </main>
  );
};

export default Home;
//    {address && isConnected && tableData ? <Overview {...tableData}></Overview> : <span> </span>}
//   <Overview {...{ params: tableData }}></Overview>
