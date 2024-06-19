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

import styles from "@/app/Styles/Table.module.css";

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

export function AddDataFeed() {
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
    <div className={styles.popover}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className={styles.input_button} variant="outline" size="sm">
            <Image
              className="image_invert"
              src="/info.svg"
              alt="info"
              width={24}
              height={24}
              priority
            />{" "}
            New DataFeed
          </Button>
        </PopoverTrigger>
        <PopoverContent className={styles.popover_container}>
          <div className={styles.popover_padding}>
            <p className="text-sm leading-tight text-muted-foreground">
              Enter token symbols to create a new datafeed. You must be a NFT
              holder to activate new datafeeds.
            </p>

            <h1>--</h1>
            <input
              type="text"
              placeholder="Token Symbol Quote"
              value={inputTokenA}
              onChange={(e) => setTokenA(e.target.value)}
              className={styles.popover_input}
            />

            <input
              type="text"
              placeholder="Token Symbol Base"
              value={inputTokenB}
              onChange={(e) => setTokenB(e.target.value)}
              className={styles.popover_input}
            />

            <button
              className={styles.input_button}
              onClick={() => txCreateDataFeed()}
            >
              {" "}
              Create NewFeed
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

//   <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
