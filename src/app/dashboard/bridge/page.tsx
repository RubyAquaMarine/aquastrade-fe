"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useAccount, useSwitchChain } from "wagmi";
import styles from "@/app/Styles/Links.module.css";
import SwapMeson from "@/app/Components/Meson";

const Home = () => {
  const { address, isConnected, chain } = useAccount();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-14">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div>
          <SwapMeson />
        </div>
      </div>
    </main>
  );
};

export default Home;
