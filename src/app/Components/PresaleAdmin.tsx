// @ts-nocheck
"use client";
import Slider from "@mui/material/Slider";
import Link from "next/link";
import Image from "next/image";
import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useAccount,
  useWriteContract,
  useBlock,
  useWaitForTransactionReceipt,
  useSwitchChain,
} from "wagmi";
import { parseUnits } from "viem";
/*
  AquasTrade components
*/
import { CHAIN } from "@/app/Utils/config";
import { PRESALE_ABI } from "@/app/Abi/presale";
import {
  findContractInfo,
  findTokenFromAddress,
} from "@/app//Utils/findTokens";
import { findTokenAddressFromSymbol } from "@/app/Utils/findTokens";
import { useERC20Token } from "@/app/Hooks/useAMM";
import { usePresale } from "@/app/Hooks/usePresale";
import styles from "@/app/Styles/Presale.module.css";

const PresaleAdmin: React.FC = () => {
  const [inputUSDAddress, setUSDAddress] = useState<string>(
    "Select USDC, USDT, USDP, DAI",
  );
  const [inputTokenAmount, setTokenAmount] = useState<string>("");

  //wagmi
  const { address, isConnected, chain } = useAccount();
  const { chains, switchChain } = useSwitchChain();
  const { data: hash, writeContract } = useWriteContract();
  const { data: contractCallDataConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Presale Contract
  const contractIDO = findContractInfo("presale");
  const [presaleTokenSymbol, setPresaleTokenSymbol] = useState("AQUA");

  // fix this ,  not hardcode
  const aqua_addr = findTokenAddressFromSymbol(
    presaleTokenSymbol ? presaleTokenSymbol : "AQUA",
  );
  const { data: tokenSupply } = useERC20Token(aqua_addr, "totalSupply", []); // $AQUA

  const loadTokenPresaleInfo = findTokenFromAddress(aqua_addr);

  const loadTokenUSDInfo = findTokenFromAddress(inputUSDAddress);

  const notify = () =>
    toast.success(`Token Created ${presaleTokenSymbol} from 🌊 AquasTrade!`, {
      position: "bottom-left",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });

  useEffect(() => {
    if (contractCallDataConfirmed) {
      notify();
    }
  }, [contractCallDataConfirmed]);

  const doTokenLaunch = () => {
    console.log(" Deploy Token with CA: ", contractIDO?.address);

    writeContract({
      abi: PRESALE_ABI,
      address: contractIDO?.address,
      functionName: "buy",
      args: [
        loadTokenUSDInfo?.address,
        parseUnits(inputTokenAmount, loadTokenUSDInfo?.decimals),
      ],
    });
  };

  return (
    <div>
      <span> List your token by entering the following information </span>
      <ul>
        <li> setToken : add address </li>

        <li>setTokenPrice in wei </li>

        <li>setMaxAllocation in wei </li>

        <li>pauseSale at any time </li>

        <li>restartSale (onlyOwner) </li>
      </ul>

      <span>
        <ToastContainer />
      </span>
    </div>
  );
};

export default PresaleAdmin;
