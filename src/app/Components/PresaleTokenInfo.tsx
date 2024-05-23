// @ts-nocheck
"use client";
import Link from "next/link";
import Image from "next/image";
import React, { memo, useRef, useEffect, useState } from "react";
import { formatUnits, parseUnits } from "viem";
/*
  AquasTrade components
*/
import TokenFDV from "@/app/Components/TokenFDV";
import TokenBalanceOf from "@/app/Components/TokenBalanceOf";
import TokenSupply from "@/app/Components/TokenSupply";
/*
  AquasTrade hooks
*/

import { usePresale } from "@/app/Hooks/usePresale";
import { useERC20Token } from "@/app/Hooks/useAMM";

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
  address?: `0x${string}`; // AMM POOL ADDRESS, but maybe change to factory address : multi DEX support
};

// Presale Contract
export const contractPresale = findContractInfo("presale");

const PresaleTokenInfo: React.FC = (props: Props) => {
  const presaleTokenAddress = props?.address;

  const [fdv, setFDV] = useState();
  const { data: isPresalePaused } = usePresale("isPaused");
  const { data: maxAllocation } = usePresale("maxAllocation");
  const { data: priceInUSD } = usePresale("price");
  //  const { data: presaleOwner } = usePresale("presaleOwner");

  // new

  const [tokenSupply, setBalance] = useState(BigInt(0));

  const { data: token_balance, isLoading } = useERC20Token(
    presaleTokenAddress,
    "totalSupply",
    [],
  );

  const loadTokenPresaleInfo = findTokenFromAddress(presaleTokenAddress);

  const _domElement = window.document.getElementById("token_supply")?.innerText;

  useEffect(() => {
    if (token_balance) {
      setBalance(token_balance);
    }
  }, [token_balance]);

  // priceInUSD,tokenSupply: tokenSupply

  return (
    <div>
      <div className={styles.container_flex}>
        <span className={styles.container_left}>
          <span className={styles.button_kyc}>
            <spaan className={styles.icon_info}>
              {" "}
              <Image
                src="/info.svg"
                alt="info"
                width={18}
                height={18}
                priority
              />{" "}
            </spaan>
            <spaan> No KYC Required</spaan>
          </span>{" "}
        </span>

        <ul>
          <li className={styles.item_cell_top}>
            <span className={styles.text_bd}>
              {" "}
              {loadTokenPresaleInfo.name}{" "}
            </span>{" "}
            <span>
              {" "}
              <Image
                src="/EUROPA.png"
                alt="IDO: presale skale network"
                width={18}
                height={18}
                priority
              />
            </span>
          </li>

          <li>
            <span className={styles.text_sm}> Symbol :</span>{" "}
            {loadTokenPresaleInfo.symbol}{" "}
          </li>

          <li className={styles.text_sm}>
            <span> Max Supply :</span>
            <span>
              <TokenSupply
                props={[presaleTokenAddress, 18, contractPresale?.address]}
              ></TokenSupply>{" "}
            </span>
          </li>
          <li>
            <span className={styles.text_sm}> FDV : {"$"} </span>{" "}
            <span>
              {" "}
              <TokenFDV {...{ price: priceInUSD, tokenSupply: tokenSupply }}>
                {" "}
              </TokenFDV>
            </span>
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

          <li className={styles.text_sm}>
            {" "}
            <span> Remaining Tokens: </span>{" "}
            <TokenBalanceOf
              props={[presaleTokenAddress, 18, contractPresale?.address]}
            ></TokenBalanceOf>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PresaleTokenInfo;
