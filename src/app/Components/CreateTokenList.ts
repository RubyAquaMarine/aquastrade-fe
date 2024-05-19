"use client";
// @ts-nocheck
// Custom stuff

import { useAquaFeed } from "@/app/Hooks/useAquaFeed";

import {
  findTokenAddressFromSymbol,
  findTokenFromAddress,
} from "@/app/Utils/findTokens";

export const CreateTokenList = () => {
  const allTokens: any = [];

  const objectFeeds: any = useAquaFeed("consumeFeeds")?.data;
  if (objectFeeds) {
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

    // This is base and quote assets without duplicates. This is the useful data
    // use the Token Addresses to get all the TokenInformation from the hardcoded tokenList.ts

    uniqueList.forEach((element: any) => {
      allTokens.push(findTokenFromAddress(element));
    });
  }

  console.log(" Can I do this ", allTokens);

  return allTokens;
};
