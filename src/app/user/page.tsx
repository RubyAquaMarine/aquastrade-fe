// @ts-nocheck
"use client";
import { BigNumber, ethers } from "ethers";
import { useAccount, useSwitchChain } from "wagmi";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/app/Styles/TokenList.module.css";
/* http://localhost:3000/user 
 - if wallet is connected, change the explorer url
 - if not connected, show assets from europaHub
*/

type Repository = {
  balance: string;
  symbol: string;
  name: string;
  decimals: string;
};

// chainID
const chainNames: Record<number, string> = {
  1: "elated-tan-skat",
  278611351: "turbulent-unique-scheat", //razor
  391845894: "frayed-decent-antares", //brawl
  1026062157: "affectionate-immediate-pollux", //SKILL
  1564830818: "honorable-steel-rasalhague", //CalypsoHub 344106930
  2046399126: "elated-tan-skat", // EuropaHub
  1350216234: "parallel-stormy-spica", // titan
  2139927552: "light-vast-diphda", // exorde
  535219706: "curly-red-alterf", // fireside
  1909534317: "adorable-quaint-bellatrix", // streammyscrean
  1273227453: "wan-red-ain", // human protocol
  393362594: "portly-passionate-sirius", // solydaria
  32429474: "round-hasty-alsafi", // DEXGAMES
  1032942172: " haunting-devoted-deneb", // Crypto Colosseum
  1482601649: "green-giddy-denebola", // nebula gaming hub
  644937893: "fussy-smoggy-megrez", // 0xbattlegrounds
  1931951519: "gargantuan-wealthy-zosma",
  1494040293: "wary-teeming-mizar",
  // Add more entries as needed
};

function getChainName(chainId: number): string {
  console.error("chainId ", chainId);
  return chainNames[chainId] || "elated-tan-skat";
}

const TokenList = ({ params }: any) => {
  const { chain, address, addresses } = useAccount();
  const { chains, switchChain } = useSwitchChain();
  const [assetArray, setAsset] = useState<any>(null);
  const [chainName, setChainName] = useState<any>(null);

  useEffect(() => {
    const getSigner = async () => {
      if (chain) {
        const chainName = getChainName(Number(chain.id));
        const apiString = `https://${chainName}.explorer.mainnet.skalenodes.com/api?module=account&action=tokenlist&address=${address}`;
        console.error("api string ", apiString);
        const response = await fetch(apiString);
        const jsonData = await response.json();
        const assetList = jsonData?.result;
        setAsset(assetList);
        setChainName(chain.name);
      }
    };

    if (address) {
      getSigner();
    }
  }, [address, chain]);
  // todo : this surely has hydration errors, redo the logic
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {!address ? (
          <div className={styles.p_styled}>
            <ul>
              {" "}
              <li>
                <Link href="/">
                  {" "}
                  <b>Back </b>(Connect to SKALE: Europa Liquidity Hub to unlock
                  features)
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <p>Switch between connected wallet addresses</p>
            <div className={styles.p_styled}>
              <ul>
                {addresses.map((wallet_address, index) => (
                  <li key={index} className={styles.text_link}>
                    <button
                      // @ts-ignore: Unreachable code error
                      onClick={() => switchChain({ chainId: chain.id })}
                    >
                      {wallet_address}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <span>Switch between skale chains</span>

            <div className={styles.p_styled}>
              <ul>
                {chains.map((chain, index) => (
                  <li key={index} className={styles.text_link}>
                    <button
                      // @ts-ignore: Unreachable code error
                      onClick={() => switchChain({ chainId: chain.id })}
                    >
                      {chain.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <ul>
              <li className={styles.text_padding}>Address : {address} </li>
              <li className={styles.text_padding}>ChainID : {chain?.id}</li>
              <li className={styles.text_border}>
                <Link
                  href={
                    chain?.blockExplorers?.default.url + "/address/" + address
                  }
                  target="_blank"
                >
                  Explorer : {chainName}
                </Link>
              </li>
            </ul>
            <br></br>
            <div className={styles.grid_container}>
              {/* @ts-ignore: Unreachable code error*/}
              {assetArray &&
                assetArray.map((item, index) => (
                  <div key={index} className={styles.grid_item}>
                    <div>Name: {item.name}</div>
                    <div>
                      Balance:{" "}
                      {ethers.utils.formatUnits(
                        item.balance,
                        Number(item.decimals),
                      )}
                    </div>
                    <div>Symbol: {item.symbol}</div>
                    <div>Decimal: {item.decimals}</div>
                    <div>
                      Address:
                      <Link
                        href={
                          chain?.blockExplorers?.default.url +
                          "/address/" +
                          item.contractAddress
                        }
                        target="_blank"
                      >
                        {item.contractAddress}
                      </Link>
                    </div>
                    {/* Crusty logic*/}
                    {item.type == "ERC-721" ? (
                      <div>Type: {item.type}</div>
                    ) : null}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default TokenList;
