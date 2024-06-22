// @ts-nocheck

"use client";

import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useAccount,
  useWriteContract,
  useBlock,
  useWaitForTransactionReceipt,
  useSwitchChain,
} from "wagmi";
import { formatUnits, parseUnits } from "viem";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/app/Utils/utils";
import { Button } from "@/app/Components/ui/Button";

import styles from "@/app/Styles/GetStarted.module.css";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/Components/ui/Popover";
import {
  TelegramCard,
  CardItemsProps,
  CardTitleProps,
} from "@/app/Components/TelegramCard";
import { findContractInfo, findTokenFromSymbol } from "@/app/Utils/findTokens";

import { AQUAFEED_ABI } from "@/app/Abi/europaAquaFeed";

/*

*/

export function GetStarted() {
  const [open, setOpen] = useState(false);
  const [inputTokenA, setTokenA] = useState("");
  const [inputTokenB, setTokenB] = useState("");

  const tokenA = useRef();
  const tokenB = useRef();

  //wagmi
  const { address, isConnected, chain } = useAccount();
  const { chains, switchChain } = useSwitchChain();
  const { data: hash, writeContract } = useWriteContract();
  const { data: contractCallDataConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const AQUAFEED = findContractInfo("aquafeed")?.address;
  const ROUTER = findContractInfo("router")?.address;
  const FACTORY = findContractInfo("factory")?.address;

  useEffect(() => {
    if (inputTokenA && inputTokenB) {
      tokenA.current = findTokenFromSymbol(inputTokenA);
      tokenB.current = findTokenFromSymbol(inputTokenB);
    }
  }, [inputTokenA, inputTokenB]);

  useEffect(() => {
    if (contractCallDataConfirmed) {
      const isLink = `https://elated-tan-skat.explorer.mainnet.skalenodes.com/tx/${hash}`;
      notify(isLink);
    }
  }, [contractCallDataConfirmed, hash]);

  const CustomToastWithLink = (_url: string) => (
    <div>
      <Link href={_url} target="_blank">
        DataFeed Created: Tx Hash on 🌊 AquasTrade
      </Link>
    </div>
  );
  // `${_message} on 🌊 AquasTrade! [tx] Hash: ${_link}`
  const notify = (_link: string) =>
    toast.info(CustomToastWithLink(_link), {
      position: "bottom-left",
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });

  const txCreateDataFeed = () => {
    console.log(" debug button click ");

    if (tokenA.current && tokenB.current) {
      // console.log(" debug button click  tokenA", tokenA.current)
      // console.log(" debug button click  AQUAFEED", AQUAFEED)
      // console.log(" debug button click  ROUTER", ROUTER)
      // console.log(" debug button click   FACTORY",  FACTORY)
      writeContract({
        abi: AQUAFEED_ABI,
        address: AQUAFEED,
        functionName: "addDataFeed",
        args: [
          ROUTER,
          FACTORY,
          "0xc318a82CB7c2B0faf7e355BB8F285016956aBF55",
          tokenA.current?.address
            ? (tokenA.current.address as unknown as `0x${string} `)
            : "0x0000000000000000000000000000000000000000",
          tokenB.current?.address
            ? (tokenB.current.address as unknown as `0x${string} `)
            : "0x0000000000000000000000000000000000000000",
        ],
      });
    }
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <span className={styles.container}>
            <span className={styles.badge_connected}>
              {isConnected ? "Connected" : "Disconnected"}
            </span>
            <span className={styles.badge}> Get started </span>
          </span>
        </PopoverTrigger>

        <PopoverContent className={styles.popover_container}>
          <div className={styles.popover_padding}>
            <p className="text-sm leading-tight text-muted-foreground p-2">
              <Link
                className={styles.title}
                href="https://aquas.trade/dashboard/metaport"
              >
                <span className={styles.column}>Bridge from Ethereum </span>
              </Link>
            </p>

            <p className="text-sm leading-tight text-muted-foreground p-2">
              <Link
                className={styles.title}
                href="https://portal.skale.space/onramp"
                target="_blank"
              >
                <span className={styles.column}>Fiat On-ramp to Skale </span>
                <span>
                  {" "}
                  <Image
                    className={styles.image_color}
                    src="/outbound.svg"
                    alt="menu"
                    width={18}
                    height={18}
                    priority
                  />{" "}
                </span>
              </Link>
            </p>

            <p className="text-sm leading-tight text-muted-foreground p-2">
              <Link
                className={styles.title}
                href="https://meson.fi/skale-europa"
                target="_blank"
              >
                <span className={styles.column}>
                  Bridge from other networks{" "}
                </span>
                <span>
                  {" "}
                  <Image
                    className={styles.image_color}
                    src="/outbound.svg"
                    alt="menu"
                    width={18}
                    height={18}
                    priority
                  />{" "}
                </span>
              </Link>
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
