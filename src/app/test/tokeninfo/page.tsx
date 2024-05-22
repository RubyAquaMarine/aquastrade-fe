"use client";
import Image from "next/image";

import React, { useEffect, useState, useRef } from "react";

import styles from "@/app/Styles/Container.module.css";

import { useAccount } from "wagmi";

// Custom stuff
// fetch from the AquasFeed SC
import { useAquaFeed } from "@/app/Hooks/useAquaFeed";
// then create an array with only the unique Asset addresses
// fetch TokenInfo from explorer
import TokenInfoBox from "@/app/Components/TokenInfoBox";

const Home = () => {
  const feeds = useRef();

  const [addressList, setTokenAddressList] = useState<string[]>([""]);

  const { address, isConnected, chain } = useAccount();

  const objectFeeds: any = useAquaFeed("consumeFeeds")?.data;

  // update feeds, addressList
  useEffect(() => {
    if (objectFeeds && address && isConnected) {
      if (objectFeeds?.length >= 1) {
        feeds.current = objectFeeds.length;
      }

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
    }
  }, [objectFeeds, address, isConnected]);

  console.log(addressList);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className={styles.container}>
        {" "}
        Datafeeds : {feeds.current && feeds.current}
      </div>
      <div className={styles.container}> TokenList </div>
      <div className={styles.container}>
        {" "}
        {addressList &&
          addressList.length >= 1 &&
          addressList.map((component: any, index) => (
            <span key={index}>
              <TokenInfoBox {...{ address: component }}> </TokenInfoBox>{" "}
            </span>
          ))}
      </div>
    </main>
  );
};
export default Home;
//    <TokenInfoBox props={[savedToken, savedToken]}> </TokenInfoBox>{" "}

// {component.pool} :{" "}
// {formatUnits(
//   component.pricePool,
//   Number(findTokenFromAddress(component.base)?.decimals), // use the decimals from the Base asset such as USDT = 6.
// )}{" "}
// : {formatUnits(component.priceFeed, 18)}

//<TokenInfoBox {...{address: savedToken}}> </TokenInfoBox>{" "}

/* <span>
{" "}
{(tokenInfoList &&
  tokenInfoList.length >= 1 &&
  tokenInfoList[index]?.logo && (
    <Image
      src={tokenInfoList[index]?.logo}
      alt="menu"
      width={20}
      height={20}
      priority
    />
  )) ||
  (tokenInfoList &&
    tokenInfoList.length >= 1 &&
    !tokenInfoList[index]?.icon_url && (
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
{tokenInfoList &&
  tokenInfoList.length >= 1 &&
  tokenInfoList[index]?.symbol}
</span> 
*/
