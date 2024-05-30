"use client";

import React, { useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";

import { hashMessage, formatUnits } from "viem";

import { EUROPA_RAZOR_ORACLE, ASSET_ETH } from "@/app/Utils/config";
import { RAZOR_ORACLE_ABI } from "@/app/Abi/oracle";

import styles from "@/app/Styles/Links.module.css";

export interface ReadProps {
  name?: string;
}

console.log(`Read `, ASSET_ETH.symbol);
//bug
const argsSC = hashMessage(ASSET_ETH.symbol);
// this is broken until hashing working correctly as ethers.keccak256
function Oracle({ name }: ReadProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { address, isConnected, chain } = useAccount();

  //== ETH APPRVE
  const smartConrtactValue = useReadContract({
    abi: RAZOR_ORACLE_ABI,
    address: EUROPA_RAZOR_ORACLE,
    functionName: "getResult",
    args: [
      "0x59102b37de83bdda9f38ac8254e596f0d9ac61d2035c07936675e87342817160",
    ],
  });

  console.log(
    `Read Contract ${name}`,
    smartConrtactValue?.data,
    " | Connected with ",
    address,
  );

  // 0x59102b37de83bdda9f38ac8254e596f0d9ac61d2035c07936675e87342817160 : correct value  in node.js ethers.

  let valueOfString;

  if (typeof smartConrtactValue?.data === "object") {
    valueOfString = smartConrtactValue?.data;
    valueOfString = formatUnits(valueOfString[0], Number(valueOfString[1]));
    console.log(`Read Contract ${name}`, valueOfString);
  }

  // This useEffect hook ensures that the component is only mounted on the client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {}, []);

  if (!isMounted) {
    return null; // Don't render anything on the server side
  }

  return (
    <div>
      {isConnected && chain?.id === 2046399126 ? (
        <button type="button" className={styles.buttonDisplay}>
          {name?.toUpperCase()} : {valueOfString}
        </button>
      ) : (
        <button type="button" className={styles.buttonDisplay}>
          ETHUSD:{" "}
        </button>
      )}
    </div>
  );
}

export default Oracle;
