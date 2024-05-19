// @ts-nocheck
"use client";
import Link from "next/link";
import Image from "next/image";
import React, { memo } from "react";
import { formatUnits, parseUnits } from "viem";
/*
  AquasTrade components
*/
import TokenBalanceOf from "@/app/Components/TokenBalanceOf";
import TokenSupply from "@/app/Components/TokenSupply";
/*
  AquasTrade hooks
*/

import { usePresale } from "@/app/Hooks/usePresale";

/*
  AquasTrade config
*/

/*
  AquasTrade utils
*/
import {
  findContractInfo,
  findTokenFromAddress,
} from "@/app//Utils/findTokens";

import styles from "@/app/Styles/Presale.module.css";

type Props = {
  _address?: `0x${string}`; // AMM POOL ADDRESS, but maybe change to factory address : multi DEX support
  address?: `0x${string}`; // AMM POOL ADDRESS, but maybe change to factory address : multi DEX support
};

const PresaleTokenInfo: React.FC = (props: Props) => {
  const presaleTokenAddress = props?.props;

  const { data: isPresalePaused } = usePresale("isPaused");
  const { data: maxAllocation } = usePresale("maxAllocation");
  const { data: priceInUSD } = usePresale("price");
  const { data: presaleOwner } = usePresale("presaleOwner");

  // Presale Contract
  const contractPresale = findContractInfo("presale");

  const loadTokenPresaleInfo = findTokenFromAddress(presaleTokenAddress);

  console.log("Render PresaleTokenInfo", props);

  return (
    <div>
      <div className={styles.container_flex}>
        <ul>
          <li className={styles.text_border_bottom}> Token Information </li>

          <li>
            <span className={styles.text_sm}> Name: </span>{" "}
            {loadTokenPresaleInfo.name}{" "}
          </li>

          <li>
            <span className={styles.text_sm}> Symbol :</span>{" "}
            {loadTokenPresaleInfo.symbol}{" "}
          </li>

          <li>
            {" "}
            <span className={styles.text_sm}> Max Supply : </span>{" "}
            <TokenSupply
              props={[presaleTokenAddress, 18, contractPresale?.address]}
            ></TokenSupply>{" "}
          </li>
          <li>
            {" "}
            <span className={styles.text_sm}> FDV : </span>{" "}
            <TokenSupply
              props={[presaleTokenAddress, 18, contractPresale?.address]}
            ></TokenSupply>{" "}
          </li>
          <li>
            <span className={styles.text_sm}> CA :</span>{" "}
            {loadTokenPresaleInfo.address}{" "}
          </li>

          <li>
            <span className={styles.text_sm}> CO :</span>{" "}
            {presaleOwner && presaleOwner}{" "}
          </li>
        </ul>
      </div>
      <div className={styles.container_flex}>
        <ul>
          <li className={styles.text_border_bottom}> Presale Information </li>
          <li>
            <span className={styles.text_sm}> Presale Live:</span>
            {isPresalePaused === false ? (
              <span> LFG</span>
            ) : (
              <span>Coming Soon</span>
            )}
          </li>

          <li>
            <span className={styles.text_sm}>
              {" "}
              Price per {loadTokenPresaleInfo.symbol} : ${" "}
            </span>
            {priceInUSD ? (
              <span> {formatUnits(priceInUSD, 18)}</span>
            ) : (
              <span> 0.0</span>
            )}
          </li>

          <li>
            <span className={styles.text_sm}> Max Allocation : </span>
            {maxAllocation ? (
              <span>
                {" "}
                {formatUnits(maxAllocation, 18)} {" token"}
              </span>
            ) : (
              <span> </span>
            )}
          </li>

          <li>
            <span className={styles.text_sm}> Max USD Amount : $</span>

            {priceInUSD && maxAllocation ? (
              <span>
                {" "}
                {Number(formatUnits(maxAllocation, 18)) *
                  Number(formatUnits(priceInUSD, 18))}
              </span>
            ) : (
              <span> 0.0</span>
            )}
          </li>

          <li>
            {" "}
            <span className={styles.text_sm}> Remaining Tokens: </span>{" "}
            <TokenBalanceOf
              props={[presaleTokenAddress, 18, contractPresale?.address]}
            ></TokenBalanceOf>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default memo(PresaleTokenInfo);
