"use client";
import { BigNumber, ethers } from "ethers";
import { useAccount } from "wagmi";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import styles_grid from "../../Styles/GridAssets.module.css";

import styles from "../../Styles/Links.module.css";
/*
 - if wallet is connected, change the explorer url
 - if not connected, show assets from europaHub
*/

type Repository = {
  balance: string;
  symbol: string;
  name: string;
  decimals: string;
};

// todo create a function that returns the skale chain name (input: chainID)
/*
      "nebula": "green-giddy-denebola",
      "cryptoC": "haunting-devoted-deneb"
*/
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

//  {params} : {params: {id : string}}
const TokenList = ({ params }: any) => {
  const addressWallet = params.wallet;
  const { chain } = useAccount();
  const [assetArray, setAsset] = useState<any>(null);
  const [chainName, setChainName] = useState<any>(null);

  useEffect(() => {
    const getSigner = async () => {
      if (chain) {
        const chainName = getChainName(Number(chain.id));
        const apiString = `https://${chainName}.explorer.mainnet.skalenodes.com/api?module=account&action=tokenlist&address=${addressWallet}`;
        console.error("api string ", apiString);
        const response = await fetch(apiString);
        const jsonData = await response.json();
        const assetList = jsonData?.result;
        setAsset(assetList);
        setChainName(chain.name);
      }
    };

    if (addressWallet) {
      getSigner();
    }
  }, [addressWallet, chain]);
  // todo : this surely has hydration errors, redo the logic
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div>
          {!addressWallet ? (
            <div className={styles.p_styled}>
              <ul>
                {" "}
                <li>
                  <Link href="/dashboard"> Back </Link>
                </li>
                <li>List assets for address: {addressWallet} </li>
              </ul>
            </div>
          ) : (
            <div>
              <ul>
               
                <li>Address : {addressWallet} </li>
                <li>ChainID : {chain?.id}</li>
              
                <li>
                  <Link
                    href={
                      chain?.blockExplorers?.default.url +
                      "/address/" +
                      addressWallet
                    }
                    target="_blank"
                  >
                    Explorer : {chainName}
                  </Link>
                </li>
              </ul>
              <br></br>
              <div className={styles_grid["grid-container"]}>
                {/* @ts-ignore: Unreachable code error*/}
                {assetArray &&
                  assetArray.map((item, index) => (
                    <div key={index} className={styles_grid["grid-item"]}>
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
      </div>
    </main>
  );
};

export default TokenList;
