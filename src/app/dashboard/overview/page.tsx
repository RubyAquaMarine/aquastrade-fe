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

import { Overview } from "@/app/Components/Overview";
import {DataFeed} from "@/app/Components/table/TableDataFeed";


import { useAquaFeed } from "@/app/Hooks/useAquaFeed";

import styles from "@/app/Styles/Overview.module.css";

const Home = ({ params }: any) => {
  const [inputWallet, setWallet] = useState<`0x${string}`>();

  const { address, isConnected, chain } = useAccount();
  const [tableData, setTableData] = useState<DataFeed[]>();

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
      console.log(" Render | OverView: Address : Why is this here again?", address);
    }
  }, [address]);

  return (
    <main className={styles.container}>
      {tableData && inputWallet ? (
        <span>
          <Overview {...tableData}></Overview>
        </span>
      ) : (
        <span className="button_back">
          <span>Loading OverView </span>
        </span>
      )}
    </main>
  );
};

export default Home;
