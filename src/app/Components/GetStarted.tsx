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
              <p className="text-sm leading-tight text-muted-foreground p-2">
                <Link className={styles.title} href="/dashboard/presale">
                  <span className={styles.column}>Buy Aqua </span>
                </Link>
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </span>
    </div>
  );
}
