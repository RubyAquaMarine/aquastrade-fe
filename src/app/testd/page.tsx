"use client";
//@ts-nocheck
import Image from "next/image";

import React, { useRef, useEffect, useState } from "react";
import { parseEther, parseUnits, formatUnits } from "viem";
import styled from "@/app/Styles/Pools.module.css";
import styles from "@/app/Styles/Container.module.css";

import { useAccount } from "wagmi";

// Custom stuff

import TokenInfoBox from "@/app/Components/TokenInfoBox";

import { useAquaFeed } from "@/app/Hooks/useAquaFeed";

import { findTokenFromAddress } from "@/app/Utils/findTokens";

interface WALLET {
  address: `0x${string}`;
}

const Home = () => {
  const [savedToken, setSavedToken] = useState<WALLET>();

  const [feeds, setFeeds] = useState<number>(0);

  const [addressList, setTokenAddressList] = useState<string[]>([""]);

  const [symbolList, setSymbolList] = useState<any[]>([]);

  const { address, isConnected, chain } = useAccount();

  const objectFeeds: any = useAquaFeed("consumeFeeds")?.data;

  // make this a component that makes div with image, symbol_name _ address
  // const data: any = useSkaleExplorerAddresses(
  //   savedToken ? savedToken : ("" as unknown as WALLET),
  // );

  useEffect(() => {
    if (savedToken) {
      console.log("debug token", savedToken);

      // setSymbolList(allTokens);
    }
  }, [savedToken]);

  // useEffect(() => {
  //   if (data?.address) {
  //     const newArray: any = symbolList;
  //     newArray.push(data);
  //     setSymbolList(newArray);
  //   }
  // }, [data]);

  useEffect(() => {
    if (objectFeeds && address && isConnected) {
      const Feeds = objectFeeds?.length;
      setFeeds(Feeds);

      // loop through and make a new array with all the base and quote  assets
      const base: any = [];
      const quote: any = [];
      objectFeeds.forEach((element: any) => {
        base.push(element.base);
      });
      objectFeeds.forEach((element: any) => {
        quote.push(element.quote);
      });

      // filter out duplicates
      const allDuplicated: any = [];
      base.forEach((element: any) => {
        allDuplicated.push(element);
      });
      quote.forEach((element: any) => {
        allDuplicated.push(element);
      });

      // for some reason there are now duplicates within the connectors , it will show two metamask icons
      const filteredConnectors = new Set();
      const uniqueList = allDuplicated.filter((element: any) => {
        const isDuplicate = filteredConnectors.has(element);
        filteredConnectors.add(element);
        return !isDuplicate;
      });
      // Working
      setTokenAddressList(uniqueList);

      // This is base and quote assets without duplicates. This is the useful data
      // use the Token Addresses to get all the TokenInformation from the hardcoded tokenList.ts
      const allTokens: any = [];
      uniqueList.forEach((element: any) => {
        const test = findTokenFromAddress(element);
        if (test !== "false") {
          allTokens.push(test);
        } else {
          console.log(
            "do special logic here , fetch the token infromation and map ",
          );

          setSavedToken(element);
        }
      });
      setSymbolList(allTokens);
    }
  }, [objectFeeds, address, isConnected]);

  console.log(" debug again ", symbolList);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className={styles.container}> TokenList </div>

      {addressList &&
        addressList.length >= 1 &&
        addressList.map((component, index) => (
          <span key={index} className={styled.container}>
            <span>
              {" "}
              {(symbolList &&
                symbolList.length >= 1 &&
                symbolList[index]?.logo && (
                  <Image
                    src={symbolList[index]?.logo}
                    alt="menu"
                    width={20}
                    height={20}
                    priority
                  />
                )) ||
                (symbolList &&
                  symbolList.length >= 1 &&
                  !symbolList[index]?.icon_url && (
                    <Image
                      src="/EUROPA.png"
                      alt="menu"
                      width={20}
                      height={20}
                      priority
                    />
                  ))}
            </span>

            <span>
              {" "}
              {symbolList &&
                symbolList.length >= 1 &&
                symbolList[index]?.symbol}
            </span>

            <span> {component}</span>
          </span>
        ))}

      <div className={styles.container}>
        {" "}
        Pools: {feeds && feeds.toString()}
      </div>
      <div className={styles.container}>
        {" "}
        Pool Addresses : Pool Price : DataFeed{" "}
      </div>

      <div className={styles.container}>
        {" "}
        <ul>
          {objectFeeds &&
            objectFeeds.length >= 1 &&
            objectFeeds.map((component: any) => (
              <li key={component.id}>
                {component.pool} :{" "}
                {formatUnits(
                  component.pricePool,
                  Number(findTokenFromAddress(component.base)?.decimals),
                )}{" "}
                : {formatUnits(component.priceFeed, 18)}
              </li>
            ))}
        </ul>
      </div>

      {savedToken ? (
        <span>
          {" "}
          <TokenInfoBox props={[savedToken, savedToken]}> </TokenInfoBox>{" "}
        </span>
      ) : (
        <span> </span>
      )}

      <div className={styles.container}></div>
    </main>
  );
};
export default Home;
