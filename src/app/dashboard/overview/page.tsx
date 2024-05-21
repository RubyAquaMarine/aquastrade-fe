"use client";
//@ts-nocheck
import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

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
      {address && isConnected && tableData ? (
        // @ts-ignore: Unreachable code error
        <Overview {...tableData}></Overview>
      ) : (
        <span> </span>
      )}
    </main>
  );
};

export default Home;
//    {address && isConnected && tableData ? <Overview {...tableData}></Overview> : <span> </span>}
//   <Overview {...{ params: tableData }}></Overview>
