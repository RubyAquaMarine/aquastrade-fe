// Jun e 2024 : Not using... atm

// to fix ,, th etokenA and tokeB must hae state, since the porops will change from the FLIP icon.

// also when use uses the Token List, the token SYM will change, and then we need to to use the latest address

// lots of issues... and for what?

// @ts-nocheck
"use client";
import React, { useState, useEffect, useRef, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  useAccount,
  useWriteContract,
  useBlock,
  useWaitForTransactionReceipt,
} from "wagmi";

import { formatUnits, parseUnits } from "viem";

import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { tokenAddresses } from "@/app/Utils/config";
import {
  findContractInfo,
  findTokenFromAddress,
  findTokenFromSymbol,
} from "@/app/Utils/findTokens";

// Make components for better rendering functionality: move hooks into these new components
import TokenApproveProps from "@/app/Components/TokenApproveProps";

import { EUROPA_AMM_ROUTER_ABI } from "@/app/Abi/europaAMMRouter";

import { useSkaleExplorer } from "@/app/Hooks/useSkaleExplorer";
import { useFactory, useGetAmountInQuote } from "@/app/Hooks/useAMM";

import styles from "@/app/Styles/AMM.module.css";
import styles_pop from "@/app/Styles/Popup.module.css";
import styles_balance from "@/app/Styles/TokenBalance.module.css";

import { SwapAddProps } from "../Types/types";

const SwapAdd = (params: SwapAddProps) => {
  console.log(" reafacto the add Liq comp", params);

  // CORE

  const tokenA = findTokenFromAddress(params.tokenAAddress);
  const tokenB = findTokenFromAddress(params.tokenBAddress);
  const ROUTER_AQUADEX: `0x${string}` = findContractInfo("router")?.address;
  const FACTORY_AQUADEX: `0x${string}` = findContractInfo("factory")?.address;

  // STATE

  const [showTokenListB, setShowTokenListB] = useState(false);
  // This value is only being used for the TokenApproveProp
  const [amountB, setAmountB] = useState<string>();
  // only used for <input>
  const [tokenBSymbol, setTokenBSymbol] = useState<string>();

  // WAGMI LIB
  const { address, isConnected, chain } = useAccount();
  const resultBlock = useBlock();
  const { data: hash, writeContract } = useWriteContract();
  const { data: contractCallDataConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  /// HOOKS
  const walletTokenList = useSkaleExplorer(address);
  const poolAddress = params.ammPoolAddress;
  // todo Adding Liqudity : can be removed when refactoring into ammFeature Components
  const addTokenBAmount = useGetAmountInQuote(
    params.amountInputA,
    poolAddress,
    tokenA.address,
    tokenA.decimals,
  );

  useEffect(() => {
    if (address && isConnected) {
      if (tokenA && tokenB) {
        setTokenBSymbol(tokenB.symbol);

        if (addTokenBAmount) {
          setAmountB(formatUnits(addTokenBAmount, tokenB.decimals));
        }
      }
    }

    if (tokenBSymbol) {
      // fucking recode all this shit with better naming types.
      const tokenB = findTokenFromSymbol(tokenBSymbol);

      //
    }
    tokenBSymbol;
  }, [address, isConnected, tokenA, tokenB, addTokenBAmount]);

  // Function s

  const handleTokenSelectionB = (token: string) => {
    setTokenBSymbol(token);
    setShowTokenListB(false);
  };

  // Function to handle liquidity provision
  const handleProvideLiquidity = () => {
    // Implement liquidity provision logic here
    const timeIs = resultBlock?.data?.timestamp
      ? resultBlock?.data?.timestamp + BigInt(20000)
      : BigInt(404);

    if (timeIs) {
      writeContract({
        abi: EUROPA_AMM_ROUTER_ABI,
        address: ROUTER_AQUADEX,
        functionName: "addLiquidity",
        args: [
          tokenA.address,
          tokenB.address,
          parseUnits(params.amountInputA, Number(tokenA.decimals)),
          addTokenBAmount
            ? addTokenBAmount
            : parseUnits(params.amountInputB, Number(tokenB.decimals)), // Create new pool
          BigInt(0),
          BigInt(0),
          address,
          timeIs,
        ],
      });
    }
  };

  useEffect(() => {
    if (contractCallDataConfirmed) {
      const isLink = `https://elated-tan-skat.explorer.mainnet.skalenodes.com/tx/${hash}`;
      notify(isLink);
      // After swap, reset the Token Input Amount to zero: double check getOutsOut is only called when input > 0
      setAmountA("0.0");
    }
  }, [contractCallDataConfirmed, hash]);

  const CustomToastWithLink = (_url: string) => (
    <div>
      <Link href={_url} target="_blank">
        {ammFeature?.toUpperCase()} Tx Hash on 🌊 AquasTrade
      </Link>
    </div>
  );

  const notify = (_link: string) => {
    // if(!toast.isActive(ammFeature)) {
    toast.info(CustomToastWithLink(_link), {
      position: "bottom-left",
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });
    //  }
  };

  return (
    <div>
      <div>
        {
          " Basically all the Add liquidity component is 2 hooks and 1 write call "
        }

        <div className={styles.container_wrap}>
          {" "}
          <div className={styles.input_container_sm}>
            <div className={styles.input_box}>
              {poolAddress &&
              addTokenBAmount &&
              poolAddress !== "0x0000000000000000000000000000000000000000" ? (
                <input
                  className={styles.input_amount}
                  type="text"
                  placeholder="0.0"
                  value={formatUnits(addTokenBAmount, tokenB.decimals)}
                />
              ) : (
                <input
                  className={styles.input_amount}
                  type="text"
                  placeholder="0.0"
                  value={amountB}
                  onChange={(e) => setAmountB(e.target.value)}
                />
              )}
              <span className={styles.box_space}>
                {" "}
                <input
                  className={styles.input_symbol}
                  type="text"
                  placeholder="Select Token"
                  value={tokenBSymbol}
                  onChange={(e) => setTokenBSymbol(e.target.value)}
                  onClick={() => setShowTokenListB(true)}
                />
              </span>

              {showTokenListB && tokenAddresses?.length > 0 ? (
                <div className={styles_pop.popup_container}>
                  <div className={styles_pop.popup_content}>
                    {tokenAddresses.map((_token, index) => (
                      <div
                        className={styles.token_list_symbol}
                        key={index}
                        onClick={() => handleTokenSelectionB(_token.symbol)}
                      >
                        {_token.symbol} {"  "}
                        <Image
                          className={styles.token_list_symbol_space}
                          src={_token.logo}
                          alt="Aquas.Trade Crypto Assets On SKALE Network"
                          width={18}
                          height={18}
                        />
                        {"  "}{" "}
                        {walletTokenList.map((_balance, index) => (
                          <span key={index} className={styles.amount_balance}>
                            {" "}
                            {_balance.contractAddress.toUpperCase() ===
                              _token.address.toUpperCase() &&
                              formatUnits(
                                _balance.balance,
                                Number(_balance.decimals),
                              )}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <span></span>
              )}
            </div>

            <p className={styles.container_margin}>
              <span className={styles.text_space_right_12}>
                {" "}
                Wallet balance{" "}
              </span>

              {tokenB.symbol && tokenB.address !== "" ? (
                <span className={styles_balance.container_token_balance}>
                  {walletTokenList.length >= 1 &&
                    walletTokenList.map((_balance, index) => (
                      <span key={index}>
                        {/**    Gummy : todo     basically since I am using the explower token list oand not the rpc direct token call , the token list can contain nfts etc with out symbols  */}

                        {_balance.symbol === tokenB.symbol.toUpperCase() &&
                          parseFloat(
                            formatUnits(
                              _balance.balance,
                              Number(_balance.decimals),
                            ),
                          ).toFixed(2)}
                      </span>
                    ))}

                  {/** How to add a zero if no balance exists: no balance means the api responsse doesn't have a matching symbol */}
                </span>
              ) : (
                <div></div>
              )}
            </p>

            <span className={styles.text_center}> Approved: </span>
            {address && amountB && tokenB.address && tokenB.decimals ? (
              <TokenApproveProps
                {...{
                  name: "allowance",
                  address: tokenB.address,
                  approve: parseUnits(amountB, Number(tokenB.decimals)),
                  args: [address, ROUTER_AQUADEX],
                }}
              ></TokenApproveProps>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className={styles.button_container}>
          <button
            className={styles.button_field}
            onClick={handleProvideLiquidity}
          >
            {poolAddress !== "0x0000000000000000000000000000000000000000"
              ? "Cast Line"
              : "Build Boat"}
          </button>
        </div>
        <div className={styles.input_container_column}>
          <div className={styles.column}>
            <p>
              {" "}
              {poolAddress !== "0x0000000000000000000000000000000000000000"
                ? "Whale Size:"
                : "100% Ownership"}
            </p>
            <p> Exchange Rate:</p>
          </div>
          <div className={styles.column}></div>
        </div>
      </div>
    </div>
  );
};

export default memo(SwapAdd);
