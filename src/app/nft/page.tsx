"use client";
// @ts-nocheck
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useEffect } from "react";
import { parseEther, parseUnits, formatUnits } from "viem";

import { findTokenAddressFromSymbol } from "@/app/Utils/findTokens";

import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";

import { useMarketPlace } from "@/app/Hooks/useMarketPlace";
import { useERC20Token } from "@/app/Hooks/useAMM";
import styles_button from "@/app/Styles/Toggle.module.css";
import styles from "@/app/Styles/Links.module.css";

import { MARKETPACE_ABI } from "@/app/Abi/europaMarketPlace";

import {
  MARKETPLACE_AQUADEX,
  MARKETPLACE_BRONZE_NFT,
  MARKETPLACE_SILVER_NFT,
  MARKETPLACE_GOLD_NFT,
  CHAIN,
} from "@/app/Utils/config";
import { ERC20_ABI } from "@/app/Abi/erc20";

const Home = () => {
  const allowancesTest = useRef(BigInt(1));

  const { data: hash, writeContract } = useWriteContract();
  const { data: contractCallDataConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const { address, isConnected, chain } = useAccount();
  const eth_address = findTokenAddressFromSymbol(
    "ETH",
  ) as unknown as `0x${string}`;
  const array: any[any] = [address, MARKETPLACE_AQUADEX];
  const { data: tokenAllowance } = useERC20Token(
    eth_address,
    "allowance",
    array,
  );

  const { data: token_balance } = useERC20Token(eth_address, "balanceOf", [
    address,
  ]);

  // Save the state and update when useBuy is called
  const gold = useRef(-1);
  const silver = useRef(-1);
  const bronze = useRef(-1);

  // refactor or just make useMarketPlaceRead
  const {
    data: MarketPlace,
    isLoading,
    isError,
  } = useMarketPlace("getListedItems");

  console.log(" User Allowance ", tokenAllowance, allowancesTest.current);

  const inputs = ["0.3 ETH", "1.5 ETH", "0.03 ETH"];
  // input the Text to display on the button
  const buttonLogicTexts = ["Silver NFT", "Gold NFT", "Bronze NFT"];
  const supplyDescriptions = ["500", "50", "5000"];
  const feeDescriptions = ["66%", "100%", "33.3%"];
  const allowance = [
    "300000000000000000",
    "1500000000000000000",
    "30000000000000000",
  ];
  const urlDescriptions = [
    "https://elated-tan-skat.explorer.mainnet.skalenodes.com/token/0xE4702E2Bab8702A1aA40C7757e15A9e2bc8C15D1/token-transfers",
    "https://elated-tan-skat.explorer.mainnet.skalenodes.com/token/0xcEcd42ff7eCC7b0BfF7a9CF95C6e7ce9aA052d8C/token-transfers",
    "https://elated-tan-skat.explorer.mainnet.skalenodes.com/token/0x87f23b254d59f97e7c4ceC7C14AbC7D6a1a4A0E3/token-transfers",
  ];

  useEffect(() => {
    if (contractCallDataConfirmed) {
      console.log("POP UP HERE");
    }
  }, [contractCallDataConfirmed]);

  // Once the Marketplace data exists , filter through and find , store the nfts that will be for sale. 1 of 50000
  useEffect(() => {
    let counter = 0;
    if (MarketPlace && typeof MarketPlace === "object") {
      // find and save next nft within collection
      MarketPlace.forEach((element) => {
        if (element.nft === MARKETPLACE_GOLD_NFT && gold.current === -1) {
          gold.current = counter;
        }
        if (element.nft == MARKETPLACE_SILVER_NFT && silver.current === -1) {
          silver.current = counter;
        }
        if (element.nft == MARKETPLACE_BRONZE_NFT && bronze.current === -1) {
          bronze.current = counter;
        }
        counter++; // testing
      });

      console.log("  NFTS ", gold, silver, bronze);
    }
    if (typeof tokenAllowance === "bigint") {
      allowancesTest.current = tokenAllowance;
    }
  }, [MarketPlace, tokenAllowance]);

  function getInputValue(index: number) {
    return inputs[index];
  }

  function handleChangeETH() {
    console.error("handleChangeETH "); // https://stackoverflow.com/questions/73172456/react-warning-you-provided-a-value-prop-to-a-form-field-without-an-onchange
  }

  const handleButtonClick = (index: number) => {
    const allow = BigInt(allowancesTest.current);

    console.error("APPROVE|BUY with Amount:  ", allow);

    switch (index) {
      case 0:
        console.error("APPROVE 0 Silver NFT", silver);
        const minSilver = parseEther("0.3", "wei");

        if (minSilver > allow) {
          console.error("APPROVE 0 ", minSilver);
          // write to approve
          writeContract({
            abi: ERC20_ABI,
            address: eth_address,
            functionName: "approve",
            args: [MARKETPLACE_AQUADEX, minSilver],
          });
          // wait for transaction
        } else {
          const str = String(silver.current);
          console.error("BUY SILVER ", str);

          writeContract({
            abi: MARKETPACE_ABI,
            address: MARKETPLACE_AQUADEX,
            functionName: "buy",
            args: [parseUnits(str, 0), minSilver],
          });
        }

        break;
      case 1:
        console.error("APPROVE 1 Gold NFT", gold);

        const minGold = parseEther("1.5", "wei");

        if (minGold > allow) {
          // write to approve
          writeContract({
            abi: ERC20_ABI,
            address: eth_address,
            functionName: "approve",
            args: [MARKETPLACE_AQUADEX, minGold],
          });
          // wait for transaction
        } else {
          const str1 = String(gold.current);
          console.error("BUY GOLD ", str1);
          writeContract({
            abi: MARKETPACE_ABI,
            address: MARKETPLACE_AQUADEX,
            functionName: "buy",
            args: [parseUnits(str1, 0), minGold],
          });
        }

        break;
      case 2:
        console.error("APPROVE 2 Bronze NFT Step 1", bronze);
        const min = parseEther("0.03", "wei");

        if (min && allow) {
          console.error("APPROVE 2 Bronze NFT Step 2", min, allow);

          if (min > allow) {
            console.error("APPROVE 2 Bronze NFT Step 3 Approve ", min);
            // write to approve
            writeContract({
              abi: ERC20_ABI,
              address: eth_address,
              functionName: "approve",
              args: [MARKETPLACE_AQUADEX, min],
            });
            // wait for transaction
          } else {
            console.error("APPROVE 2 Bronze NFT Step 3 Write ", min);

            const str2 = String(bronze.current);
            console.error("BUY BRONZE ", str2);

            writeContract({
              abi: MARKETPACE_ABI,
              address: MARKETPLACE_AQUADEX,
              functionName: "buy",
              args: [parseUnits(str2, 0), parseEther("0.03")],
            });
          }
        }

        break;
      default:
        break;
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h4 className={styles.topText}>
        Limited Collection - 0% Fee Marketplace - Utility driven{" "}
      </h4>
      <h1 className={styles.midText}>Swap Fee Discounts for Life</h1>
      <p>
        Say goodbye to tx gas fees, swap fees and hello to a new era in defi
      </p>
      <br></br>

      {address && isConnected && chain && chain.id === CHAIN.id ? (
        <div className={styles.container}>
          <p className={styles.container}>
            {inputs.map((value, index) => (
              <div key={index} className={styles.column}>
                <div className={styles.imageCenter}>
                  <Link href={urlDescriptions[index]} target="_blank">
                    <Image
                      src={`/NFT${index}.png`}
                      alt="AquasTrade Logo"
                      width={200}
                      height={200}
                      className={styles.imageAlign}
                      priority
                    />
                  </Link>

                  <div>
                    <ul className={styles.textDesc}>
                      <li> Collection: {supplyDescriptions[index]}</li>
                      <li> Fee discount: {feeDescriptions[index]}</li>
                    </ul>
                  </div>
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    value={getInputValue(index)} // Call a function to get the appropriate value
                    className={styles.textInputs}
                    onChange={handleChangeETH}
                  />
                </div>
                {/** User has to click on button again to compare logic: then aka Needs to render again to show the approval is complete and buy button appears */}
                {allowancesTest.current &&
                BigInt(allowancesTest.current) >= BigInt(allowance[index]) ? (
                  <div>
                    <button
                      className={styles_button.toggleButton}
                      onClick={() => handleButtonClick(index)}
                    >
                      {buttonLogicTexts[index]}
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      className={styles_button.toggleButton}
                      onClick={() => handleButtonClick(index)}
                    >
                      Approve
                    </button>
                  </div>
                )}
              </div>
            ))}
          </p>
          <p className={styles.bottomText}>
            {!token_balance
              ? "0.0"
              : typeof token_balance === "bigint" &&
                formatUnits(token_balance, 18)}{" "}
            <span> ETH Balance</span>
          </p>
        </div>
      ) : (
        <div className={styles.p_styled_button}>
          <ul>
            <li>
              <Link href="/dashboard">
                {" "}
                <b>Back </b>(Connect to SKALE: Europa Liquidity Hub to unlock
                features)
              </Link>
            </li>
          </ul>
        </div>
      )}
    </main>
  );
};
export default Home;
/*


*/
