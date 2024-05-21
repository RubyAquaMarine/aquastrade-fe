"use client";
import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

import { useAccount, useSwitchChain } from "wagmi";

import Overview from "@/app/Components/Overview";

export type DataFeed = {
  id: string;
  poolAddress: string;
  poolPrice: string;
  feedPrice: string;
  assets: string[];
};

const OverviewHome = ({ params }: any) => {
  const { address, isConnected, chain } = useAccount();

  return (
    <main className="p-24">
      {address && isConnected ? <Overview></Overview> : <span> </span>}
    </main>
  );
};

export default OverviewHome;
