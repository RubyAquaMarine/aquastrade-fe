"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

import Erc20 from "@/app/Components/ReadToken";

import { parseEther, parseUnits } from "viem";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useSwitchChain,
} from "wagmi";

import styles_button from "@/app/Styles/Toggle.module.css";
import styles from "@/app/Styles/Links.module.css";

import { marketplaceABI } from "@/app/Abi/europaMarketPlace";

import {
  MARKETPLACE_AQUADEX,
  EUROPA_ETH,
  MARKETPLACE_BRONZE_NFT,
  MARKETPLACE_SILVER_NFT,
  MARKETPLACE_GOLD_NFT,
  CHAIN,
} from "@/app/Utils/config";
import { ERC20_ABI } from "@/app/Abi/erc20";

const Home = () => {
  const allowancesTest = useRef(BigInt(1));
  const { writeContract } = useWriteContract();
  const { address, isConnected, chain } = useAccount();

  const array: (string | undefined)[] = [];

  array.push(address);
  array.push(MARKETPLACE_AQUADEX);

  const inputs = ["0.3 ETH", "1.5 ETH", "0.03 ETH"];
  // input the Text to display on the button
  const buttonLogicTexts = ["Silver NFT", "Gold NFT", "Bronze NFT"];
  const supplyDescriptions = ["500", "50", "5000"];
  const feeDescriptions = ["66%", "100%", "33.3%"];
  const urlDescriptions = [
    "https://elated-tan-skat.explorer.mainnet.skalenodes.com/token/0xE4702E2Bab8702A1aA40C7757e15A9e2bc8C15D1/token-transfers",
    "https://elated-tan-skat.explorer.mainnet.skalenodes.com/token/0xcEcd42ff7eCC7b0BfF7a9CF95C6e7ce9aA052d8C/token-transfers",
    "https://elated-tan-skat.explorer.mainnet.skalenodes.com/token/0x87f23b254d59f97e7c4ceC7C14AbC7D6a1a4A0E3/token-transfers",
  ];

  //== ETH APPRVE
  const allowanceOnETH = useReadContract({
    abi: ERC20_ABI,
    address: EUROPA_ETH,
    functionName: "allowance",
    args: [address as `0x${string}`, MARKETPLACE_AQUADEX],
  });

  if (allowanceOnETH?.data) {
    console.error("READ CONTRACT eth allowance '", allowanceOnETH?.data);
    allowancesTest.current = allowanceOnETH.data;
    console.error(
      " allowancesTest.current '",
      allowancesTest.current,
      typeof allowancesTest.current,
    );
  }

  //== getListedItems
  const dataNftItemsAll = useReadContract({
    abi: marketplaceABI,
    address: MARKETPLACE_AQUADEX,
    functionName: "getListedItems",
  });
  //console.error("READ CONTRACT getListedItems'", dataNftItemsAll?.data);

  // todo
  // filter by is for sale or not?
  let gold = -1,
    bronze = -1,
    silver = -1;
  let counter = 0;
  if (dataNftItemsAll?.data) {
    // find and save next nft within collection
    dataNftItemsAll?.data.forEach((element) => {
      if (element.nft === MARKETPLACE_GOLD_NFT && gold === -1) {
        // is gold gold, bronze, silver
        gold = counter;
      }
      if (element.nft == MARKETPLACE_SILVER_NFT && silver === -1) {
        // is gold gold, bronze, silver
        silver = counter;
      }
      if (element.nft == MARKETPLACE_BRONZE_NFT && bronze === -1) {
        // is gold gold, bronze, silver
        bronze = counter;
      }
      counter++; // testing
    });

    console.error(" FOUND Next Gold NFT INDEX: ", gold);
    console.error(" FOUND Next Silver NFT INDEX: ", silver);
    console.error(" FOUND Next Bronze NFT INDEX: ", bronze);
  }

  function getInputValue(index: number) {
    if (index === 0) {
      return inputs[0]; //  ETHER AMOUNT
    }
    if (index === 1) {
      return inputs[1]; //  ETHER AMOUNT
    }

    if (index === 2) {
      return inputs[2]; //  ETHER AMOUNT
    }
    // Add more conditions as needed
  }

  function handleChangeETH() {
    console.error("handleChangeETH "); // https://stackoverflow.com/questions/73172456/react-warning-you-provided-a-value-prop-to-a-form-field-without-an-onchange
  }

  const handleButtonClick = (index: number) => {
    const allow = allowancesTest.current;

    switch (index) {
      case 0:
        console.error("APPROVE 0 ");
        const minSilver = parseEther("0.5", "wei");

        if (allow) {
          if (minSilver > allow) {
            // write to approve
            writeContract({
              abi: ERC20_ABI,
              address: EUROPA_ETH,
              functionName: "approve",
              args: [MARKETPLACE_AQUADEX, minSilver],
            });
            // wait for transaction
          } else {
            const str = String(silver);
            writeContract({
              abi: marketplaceABI,
              address: MARKETPLACE_AQUADEX,
              functionName: "buy",
              args: [parseUnits(str, 0), minSilver],
            });
          }
        }

        break;
      case 1:
        console.error("APPROVE 1 ");

        const minGold = parseEther("1.5", "wei");
        if (allow) {
          if (minGold > allow) {
            // write to approve
            writeContract({
              abi: ERC20_ABI,
              address: EUROPA_ETH,
              functionName: "approve",
              args: [MARKETPLACE_AQUADEX, minGold],
            });
            // wait for transaction
          } else {
            const str1 = String(gold);
            writeContract({
              abi: marketplaceABI,
              address: MARKETPLACE_AQUADEX,
              functionName: "buy",
              args: [parseUnits(str1, 0), minGold],
            });
          }
        }

        break;
      case 2:
        console.error("APPROVE 2 Bronze NFT", bronze);

        const min = parseEther("0.03", "wei");
        if (allow) {
          if (min > allow) {
            // write to approve
            writeContract({
              abi: ERC20_ABI,
              address: EUROPA_ETH,
              functionName: "approve",
              args: [MARKETPLACE_AQUADEX, min],
            });
            // wait for transaction
          } else {
            const str2 = String(bronze);
            writeContract({
              abi: marketplaceABI,
              address: MARKETPLACE_AQUADEX,
              functionName: "buy",
              args: [parseUnits(str2, 0), parseEther("0.03", "wei")],
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
      <div>
        {!address || (chain && chain.id !== CHAIN.id) ? (
          <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
            <div className={styles.p_styled}>
              <ul>
                <li>
                  <Link href="/dashboard">
                    {" "}
                    <b>Back </b>(Connect to SKALE: Europa Liquidity Hub to
                    unlock features)
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className={styles.container}>
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

                {BigInt(allowancesTest.current) <
                BigInt("1500000000000000000") ? (
                  <div>
                    <Erc20
                      name={"allowance"}
                      approve={BigInt("1500000000000000000")}
                      args={[array]}
                    ></Erc20>
                  </div>
                ) : (
                  <div>
                    {" "}
                    <button
                      className={styles_button.toggleButton}
                      onClick={() => handleButtonClick(index)}
                    >
                      {buttonLogicTexts[index]}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};
export default Home;
