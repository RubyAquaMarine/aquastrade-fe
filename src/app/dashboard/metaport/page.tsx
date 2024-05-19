// @ts-nocheck
"use client";
import { formatUnits } from "viem";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAccount, useSwitchChain } from "wagmi";
import styles from "@/app/Styles/Metaport.module.css";
import MetaportWidgetV2 from "@/app/Components/MetaportWidgetV2.0";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/Components/ui/DropdownMenu";

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

const Home = () => {
  const { address, isConnected, chain, addresses } = useAccount();

  const { chains, switchChain } = useSwitchChain();
  const [assetArray, setAsset] = useState<any>(null);
  const [chainName, setChainName] = useState<any>(null);

  function getChainName(chainId: number): string {
    console.log("chainId ", chainId);
    return chainNames[chainId] || "elated-tan-skat";
  }

  useEffect(() => {
    const getSigner = async () => {
      if (chain) {
        const chainName = getChainName(Number(chain.id));
        const apiString = `https://${chainName}.explorer.mainnet.skalenodes.com/api?module=account&action=tokenlist&address=${address}`;
        console.log("api string ", apiString);
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

  return (
    <main className="flex flex-col items-center justify-between p-6">
      <div className="max-w-5xl  items-center justify-between font-mono text-sm lg:flex">
        <span> L1 Gas wallet: 0.0005 :</span>
        <span className={styles.text_style_bottom}>Top Up </span>
        <p> Bridge Cost: </p>
        <span> L1 Gas gwei: </span>

        <div className={styles.text_style_bottom}>
          {addresses &&
            addresses.map((wallet_address, index) => (
              <button
                key={index}
                className={styles.text_link}
                // @ts-ignore: Unreachable code error
                onClick={() => switchChain({ chainId: chain.id })}
              >
                {wallet_address}
              </button>
            ))}
        </div>

        <div>
          <MetaportWidgetV2 />
        </div>
      </div>

      <div className={styles.container}>
        <p className={styles.dropdown}>
          {" "}
          <span>
            {" "}
            <Link
              href={chain?.blockExplorers?.default.url + "/address/" + address}
              target="_blank"
            >
              Connected to {chainName}
            </Link>{" "}
          </span>
        </p>

        <p className={styles.dropdown}>
          {" "}
          <span>
            {" "}
            <DropdownMenu>
              <DropdownMenuTrigger className={styles.text_style}>
                Switch between skale chains
              </DropdownMenuTrigger>

              <DropdownMenuContent className={styles.dropdown_bd}>
                <DropdownMenuLabel>Select Network</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {chains.map((chain, index) => (
                  <DropdownMenuItem   key={index}> 
                    {" "}
                    <button
                    
                      className={styles.text_style_bottom_sm}
                      // @ts-ignore: Unreachable code error
                      onClick={() => switchChain({ chainId: chain.id })}
                    >
                      {chain.name}
                    </button>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </span>
        </p>
      </div>

      <div>
        {/* @ts-ignore: Unreachable code error*/}
        {assetArray &&
          assetArray.map((item, index) => (
            <div key={index} className={styles.grid_item}>
              <div>Name: {item.name}</div>
              <div>
                Balance: {formatUnits(item.balance, Number(item.decimals))}
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
              {item.type == "ERC-721" ? <div>Type: {item.type}</div> : null}
            </div>
          ))}
      </div>
    </main>
  );
};

export default Home;
