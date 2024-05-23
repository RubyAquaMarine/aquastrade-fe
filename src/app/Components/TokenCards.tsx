// @ts-nocheck
"use client";

import Link from "next/link";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import React, { useState, useEffect, memo, useRef } from "react";
import { formatUnits } from "viem";
// Custom stuff
// fetch from the AquasFeed SC
import { useAquaFeed } from "@/app/Hooks/useAquaFeed";
// then create an array with only the unique Asset addresses
// fetch TokenInfo from explorer
import TokenInfoBox from "@/app/Components/TokenInfoBox";

import styles from "@/app/Styles/TokenApprove.module.css";

const TokenCard = () => {
  const feeds = useRef(0);

  const [addressList, setTokenAddressList] = useState<string[]>();

  const [feed, setFeed] = useState<any[]>();

  const objectFeeds: any = useAquaFeed("consumeFeeds")?.data;

  // update feeds, addressList
  useEffect(() => {
    if (objectFeeds) {
      console.log("Render: objectFeeds", objectFeeds);
      setFeed(objectFeeds);
    }
  }, [objectFeeds]);

  // update feeds, addressList
  useEffect(() => {
    if (feed) {
      console.log("Render: Feed", feed);
      if (feed.length >= 1) {
        feeds.current = feed.length;
      }

      // loop through and make a new array with all the base and quote  assets
      const base: any = [];
      const quote: any = [];
      feed.forEach((element: any) => {
        base.push(element.base);
      });
      feed.forEach((element: any) => {
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
      console.log("Render: TokenAddressList", uniqueList);
      setTokenAddressList(uniqueList);
    }
  }, [feed]);

  console.log("Render AddressList: ", addressList);

  return (
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
  );
};

export default TokenCard;
