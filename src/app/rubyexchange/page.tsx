"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useAccount, useBalance, useSwitchChain } from "wagmi";
import styles from "@/app/Styles/Dashboard.module.css";
import { CHAIN } from "@/app/Utils/config";
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MASTERCHEF = `0x2BB702e94e094b8Caf7b758960621AE2d296676D`;
const ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_pid",
        type: "uint256",
      },
    ],
    name: "emergencyWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const RubyExchange = ({ children, params }: any) => {
  const { chains, switchChain } = useSwitchChain();
  const { address, isConnected, chain } = useAccount();
  const [pool, setPool] = useState(0);
  const { data: hash, writeContract } = useWriteContract();
  const { data: contractCallDataConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {}, [address]);

  useEffect(() => {
    if (contractCallDataConfirmed) {
      const isLink = `https://elated-tan-skat.explorer.mainnet.skalenodes.com/tx/${hash}`;
      notify(isLink);
    }
  }, [contractCallDataConfirmed, hash]);

  const CustomToastWithLink = (_url: string) => (
    <div>
      <Link href={_url} target="_blank">
        Remove Farm LP tokens Tx Hash on 🌊 AquasTrade
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

  const handleApprove = () => {
    writeContract({
      abi: ABI,
      address: MASTERCHEF,
      functionName: "emergencyWithdraw",
      args: [BigInt(pool)],
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {!address || (chain && chain.id !== CHAIN.id) ? (
        <div className={styles.container}>
          <div className={styles.p_styled_button}>
            <ul>
              <li>
                <Link href="/">
                  {" "}
                  <b>Back</b> (use web3 login to unlock features)
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <span className={styles.text_centered}>
            Remove LP Tokens from Ruby.Exchange Farm{" "}
          </span>

          <span className={styles.text_centered}>on wallet address </span>

          <span className={styles.text_padding}> {address} </span>
          <span className={styles.text_padding}> Enter Pool ID (0-5) </span>
          <span className={styles.text_padding}>
            {" "}
            <input
              className={styles.input_amount}
              type="number"
              min={0}
              max={5}
              value={pool}
              onChange={(e) => setPool(Number(e.target.value))}
            />
          </span>

          <span className={styles.text_padding}>
            {" "}
            <button className={styles.p_styled_button} onClick={handleApprove}>
              {" "}
              Click Here
            </button>
          </span>
        </div>
      )}

      <span>
        <ToastContainer />
      </span>
    </main>
  );
};

export default RubyExchange;
