"use client";
// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";

import A from "@/app/Components/A";

import { useContract } from "@/app/Hooks/useContract";

import {
  MARKETPLACE_AQUADEX,
  EUROPA_ETH,
  MARKETPLACE_BRONZE_NFT,
  MARKETPLACE_SILVER_NFT,
  MARKETPLACE_GOLD_NFT,
  CHAIN,
} from "@/app/Utils/config";

const IndexPage = () => {
  const [data, setData] = useState(null);
  const [buttonText, setButtonText] = useState("");

  // Save the state and update when useBuy is called
  const gold = useRef(-1);
  const silver = useRef(-1);
  const bronze = useRef(-1);

  // const { data: MarketPlace, isLoading, isSuccess, write } = useContract();

  // refactor or just make useMarketPlaceRead
  const {
    data: MarketPlace,
    isLoading,
    isError,
  } = useContract("getListedItems");

  // Once the Marketplace data exists , filter through and find , store the nfts that will be for sale. 1 of 50000
  useEffect(() => {
    let counter = 0;
    if (MarketPlace) {
      console.log(" useEffect NFTS ", gold, silver, bronze, MarketPlace);

      if (MarketPlace) {
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
    }
  }, [MarketPlace]);

  // this logic is a process of storing a text value within a button and when the user clicks on the buttun, then value is used in the Oncluck() function(text.value) : can be useful for later use
  useEffect(() => {
    if (buttonText) {
      fetchData(buttonText);
    }
  }, [buttonText]);

  // this logic is a process of storing a text value within a button
  const fetchData = (value) => {
    console.error("Fetch Data ", value);
    fetch(`https://jsonplaceholder.typicode.com/todos/1`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // this logic is a process of storing a text value within a button
  const handleClick = (event) => {
    const value = event.target.innerText;
    setButtonText(value);
  };

  return (
    <div>
      <button onClick={handleClick}>sklusdt</button>

      {data && (
        <div>
          <p>Data fetched:</p>
          <p>{JSON.stringify(data)}</p>{" "}
          {/* Adjust how you want to display the fetched data */}
        </div>
      )}

      {!isLoading && !isError && <div> {gold.current.toString()} </div>}
      {!isLoading && !isError && <div> {silver.current.toString()} </div>}
      {!isLoading && !isError && <div> {bronze.current.toString()} </div>}
    </div>
  );
};

export default IndexPage;
