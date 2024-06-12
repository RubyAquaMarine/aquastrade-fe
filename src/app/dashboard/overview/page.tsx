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

import { Overview, DataFeedV } from "@/app/Components/Overview";

import { useAquaFeed } from "@/app/Hooks/useAquaFeed";

import styles from "@/app/Styles/Overview.module.css";

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

  return (
    <main className={styles.container}>
      {tableData ? (
        <span>
          <span>
            {" "}
            <Overview {...tableData}></Overview>
          </span>
          <span className={styles.button_back}>
            {" "}
            <Link href="/dashboard/tokeninfo">
              {" "}
              <b>Tokens </b> (Europa Liquidity Hub)
            </Link>{" "}
          </span>
        </span>
      ) : (
        <span className={styles.button_back}>
          <span>Loading OverView </span>
        </span>
      )}
    </main>
  );
};

export default Home;
