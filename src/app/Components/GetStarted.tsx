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
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";

/*

*/

export function GetStarted() {
  const [open, setOpen] = useState(false);
  const [openAqua, setOpenAqua] = useState(false);
  const { address, isConnected, chain, isConnecting } = useAccount();

  return (
    <div>
      <span>
        {" "}
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
                <Link className={styles.title} href="/dashboard/metaport">
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
        </Popover>{" "}
      </span>

      <span>
        {" "}
        <Popover open={openAqua} onOpenChange={setOpenAqua}>
          <PopoverTrigger asChild>
            <span className={styles.container}>
              <span className={styles.badge}> Aqua </span>
            </span>
          </PopoverTrigger>

          <PopoverContent className={styles.popover_container}>
            <div className={styles.popover_padding}>
              <div className="flex h-full w-full select-none flex-col justify-end  p-2 focus:shadow-md">
                {/** rounded-md bg-gradient-to-b from-muted/50 to-muted no-underline outline-none */}
                <div className={styles.metaport}>$AQUA</div>

                <span> 200 Mil Max Token Supply</span>
                <p className="text-ssm leading-tight text-muted-foreground">
                  <Link href="https://elated-tan-skat.explorer.mainnet.skalenodes.com/address/0xf8817121565613e52319CC36f3ed281d58dD88f5?tab=write_contract">
                    <span className="flex_row">
                      <span className={styles.text_link}> with Burner </span>
                      <span>
                        {" "}
                        <Image
                          className={styles.image_color}
                          src="/outbound.svg"
                          alt="menu"
                          width={14}
                          height={14}
                          priority
                        />{" "}
                      </span>
                    </span>
                  </Link>
                </p>

                <p className="text-sm leading-tight text-muted-foreground p-4">
                  Utility driven:
                  <ul>
                    <li> - DCA Orders</li>
                    <li> - Token Launchpad Liquidity</li>
                  </ul>
                </p>

                <p className="text-sm leading-tight text-muted-foreground p-2">
                  <span className={styles.text_burn}>
                    All protocol fees are collected to buy and burn AQUA
                  </span>
                </p>

                <p className="text-xsm leading-tight text-muted-foreground p-2">
                  <ul>
                    <li> 1. AMM Fee: 0.05%</li>
                    <li> 2. IDO platform: 0.30%</li>
                    <li> 3. MarketPlace: 0.30% {"(coming soon)"}</li>
                    <li> 4. TelegramBot: 0.30% {"(coming soon)"}</li>
                  </ul>
                </p>
              </div>

              <p className="text-sm leading-tight text-muted-foreground p-2">
                <span className="flex_row">
                  <span>
                    {" "}
                    <Link
                      href="https://dappradar.com/dapp/aquas-trade"
                      target="_blank"
                    >
                      DappRadar
                      <span>
                        {" "}
                        <Image
                          className={styles.image_color}
                          src="/outbound.svg"
                          alt="menu"
                          width={14}
                          height={14}
                          priority
                        />{" "}
                      </span>
                    </Link>
                  </span>
                  <span>
                    {" "}
                    <Link
                      href="https://defillama.com/protocol/aquas-trade#information"
                      target="_blank"
                    >
                      DefiLlama
                      <span>
                        {" "}
                        <Image
                          className={styles.image_color}
                          src="/outbound.svg"
                          alt="menu"
                          width={14}
                          height={14}
                          priority
                        />{" "}
                      </span>
                    </Link>
                  </span>

                  <span>
                    {" "}
                    <Image
                      className={styles.icon_skl}
                      src="/AQUA.png"
                      alt="AquasTrade Menu"
                      width={30}
                      height={30}
                    />
                  </span>
                </span>
              </p>

              <p className="text-sm leading-tight text-muted-foreground p-2">
                <Link className={styles.title} href="/dashboard/presale">
                  <span className={styles.button_aqua}>Buy Aqua here </span>
                </Link>
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </span>
    </div>
  );
}
/*
 <span>
                      {" "}
                      <Link
                        href="https://coingecko.com"
                        target="_blank"
                      >
                       CG
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
                    </span>
                    <span>
                      {" "}
                      <Link
                        href="https://coinmarketcap.com"
                        target="_blank"
                      >
                       CMC
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
                    </span>
*/
