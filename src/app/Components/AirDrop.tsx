// @ts-nocheck
"use client";
import React, { useEffect, useState, useRef } from "react";
import { useAccount, useWriteContract, useSwitchChain } from "wagmi";
import { formatUnits, parseUnits } from "viem";

import { CHAIN } from "@/app/Utils/config";

import { findContractInfo } from "@/app//Utils/findTokens";

import TokenBalance from "@/app/Components/TokenBalance";
import TokenApprove from "../Components/TokenApprove";

import { AIRDROP_ABI } from "@/app/Abi/airdropErc20";
import styles from "@/app/Styles/Airdrop.module.css";

export interface Wallet {
  wallet?: `0x${string}`;
}

export interface Amount {
  amount?: string;
}

const AirDrop = () => {
  // updates via function parseEthAmounts()
  const setTotalAmounts = useRef(BigInt(0));
  // todo decimals
  const tokenADecimal = useRef(BigInt(18));
  // const tokenBDecimal = useRef(BigInt(18));

  // Token Address that user inputs
  const [token, setAirdropToken] = useState("");

  // todo ppolist symbols list
  const [tokenSymbol, setAirdropTokenSymbol] = useState("");

  // Original Input from user as string format : will be parsed later
  const [tokenAddresses, setTokenAddresses] = useState<Wallet>();
  const [tokenAmount, setTokenAmount] = useState<Amount>();

  //wagmi
  const { address, isConnected, chain } = useAccount();
  const { writeContract } = useWriteContract();
  const contractAirdrop = findContractInfo("airdrop");

  if (setTotalAmounts.current > BigInt(0)) {
    console.error("Approve This amount ", setTotalAmounts.current);
  }

  // listens for messages in the room the user is in
  useEffect(() => {
    if (tokenAmount) {
      parseEthAmounts(tokenAmount as string);
    }
  }, [tokenAmount]);

  const doAirdrop = () => {
    const amounts = parseEthAmounts(tokenAmount as string);
    const addresses = parseEthAddresses(tokenAddresses as string);
    if (
      token &&
      addresses?.length !== 0 &&
      addresses?.length === amounts?.length
    ) {
      writeContract({
        abi: AIRDROP_ABI,
        address: contractAirdrop?.addr,
        functionName: "doAirdrop",
        args: [token as `0x${string}`, addresses as `0x${string}`[], amounts],
      });
    }
  };

  function parseEthAddresses(addressString: string): string[] {
    // Split the addressString by commas to get individual addresses
    const addresses: string[] = addressString.split(",");
    // Trim whitespace from each address and push it into a new array
    const formattedAddresses: string[] = [];
    addresses.forEach((address) => {
      const trimmedAddress = address.trim();
      if (trimmedAddress.length > 0) {
        formattedAddresses.push(trimmedAddress);
      }
    });

    return formattedAddresses;
  }

  // todo , make a sum = total amount to approve to pass down into props
  function parseEthAmounts(addressString: string): bigint[] {
    let sumOf: bigint = BigInt(0);
    // Split the addressString by commas to get individual addresses
    const addresses: string[] = addressString.split(",");
    // Trim whitespace from each address and push it into a new array
    const formattedAddresses: bigint[] = [];
    addresses.forEach((address) => {
      const trimmedAddress = address.trim();
      if (trimmedAddress.length > 0) {
        let valueIs = parseUnits(trimmedAddress, 18); // do to , pass in decimals
        sumOf = valueIs + sumOf;
        formattedAddresses.push(valueIs);
      }
    });

    setTotalAmounts.current = sumOf;

    return formattedAddresses;
  }

  return (
    <div>
      {address && chain && chain.id === CHAIN.id ? (
        <div>
          {" "}
          <input
            type="text"
            placeholder="Token Address to Airdrop"
            value={token}
            onChange={(e) => setAirdropToken(e.target.value)}
            className={styles.input_token_address}
          />
          <input
            type="text"
            placeholder="or Symbol"
            value={tokenSymbol}
            onChange={(e) => setAirdropTokenSymbol(e.target.value)}
            className={styles.input_token_address}
          />
          <div className={styles.container_margin}>
            {setTotalAmounts.current !== BigInt(0) && token ? (
              <TokenApprove
                props={[
                  "allowance",
                  token,
                  setTotalAmounts.current,
                  [address, contractAirdrop?.addr],
                  tokenADecimal.current,
                ]}
              />
            ) : (
              <span></span>
            )}
            {isConnected && token && address && (
              <TokenBalance props={[token, 18, address]} />
            )}
          </div>
          <input
            type="text"
            placeholder="Address List"
            value={tokenAddresses}
            onChange={(e) => setTokenAddresses(e.target.value)}
            className={styles.input_address}
          />
          <input
            type="text"
            placeholder="Amount List"
            value={tokenAmount}
            onChange={(e) => setTokenAmount(e.target.value)}
            className={styles.input_address}
          />
          {setTotalAmounts.current ? (
            <button className={styles.airdrop} onClick={doAirdrop}>
              {" "}
              Airdrop{" "}
              {formatUnits(
                setTotalAmounts.current,
                Number(tokenADecimal.current),
              )}{" "}
              to community{" "}
            </button>
          ) : (
            <span className={styles.airdrop}>Enter Amount List</span>
          )}
        </div>
      ) : (
        <div>
          <p>Please select ChainID: 2046399126</p>
          <button
            onClick={(event) => handleToEuropa(event, 2046399126)}
            className={styles.toggleButtonEuropa}
          >
            Switch Network
          </button>
        </div>
      )}
    </div>
  );
};

export default AirDrop;
