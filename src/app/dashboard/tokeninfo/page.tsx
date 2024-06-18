"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import styles from "@/app/Styles/Container.module.css";

import { useAccount } from "wagmi";

import TokenCards from "@/app/Components/TokenCards";
import { CHAIN } from "@/app/Utils/config";

const Home = () => {
  const { address, isConnected, chain } = useAccount();
  return (
    <main className={styles.container}>
      <span>
        <Link className="button_back" href="/dashboard/overview">
          {" "}
          <b>Back</b>
        </Link>{" "}
      </span>
      <TokenCards></TokenCards>
    </main>
  );
};
export default Home;
