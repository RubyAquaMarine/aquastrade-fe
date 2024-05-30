// @ts-nocheck
"use client";
import React, { useState, useEffect, useRef } from "react";
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
import { findContractInfo } from "@/app/Utils/findTokens";
import {
  findTokenAddressFromSymbol,
  findTokenLogoFromAddress,
  findTokenDecimalsFromSymbol,
} from "@/app/Utils/findTokens";

// Make components for better rendering functionality: move hooks into these new components

import NFTBalance from "@/app/Components/NFTBalance";
import GetAmountsOut from "@/app/Components/GetAmountsOut";
import DCAInterface from "@/app/Components/DCA";
import TokenBalance from "@/app/Components/TokenBalance";
import TokenApproveProps from "@/app/Components/TokenApproveProps";
import AMMPools from "@/app/Components/AMMPools";
import SwapAdd from "@/app/Components/SwapAdd";
import { SwapAddProps } from "../Types/types";

// HOOKS

import { useSkaleExplorer } from "@/app/Hooks/useSkaleExplorer";
import { useFactory } from "@/app/Hooks/useAMM";

import { isNumber } from "@/app/Utils/utils";

import styles from "@/app/Styles/AMM.module.css";
import styles_pop from "@/app/Styles/Popup.module.css";
import { EUROPA_AMM_ROUTER_ABI } from "@/app/Abi/europaAMMRouter";

const ROUTER_AQUADEX: `0x${string}` = findContractInfo("router")?.address;
//
const FACTORY_AQUADEX: `0x${string}` = findContractInfo("factory")?.address;

const SwapAmm = () => {
  // Save state without rendering
  const addLiqProps = useRef<SwapAddProps>();
  const divRef = useRef(null);
  const [amountLPRemove, setAmountLPRemove] = useState(100);
  const [amountLP, setAmountLP] = useState(BigInt(0));

  const tokenAAddress = useRef(
    "0xD2Aaa00700000000000000000000000000000000" as `0x${string}`,
  );

  const aqua_token_address = findTokenAddressFromSymbol(
    "AQUA",
  ) as unknown as `0x${string}`;

  const tokenBAddress = useRef(aqua_token_address);

  const feeNFT = useRef(BigInt(997));

  const tokenADecimal = useRef(BigInt(18));
  const tokenBDecimal = useRef(BigInt(18));

  // wagmi
  const { address, isConnected, chain } = useAccount();
  const resultBlock = useBlock();
  const { data: hash, writeContract } = useWriteContract();
  const { data: contractCallDataConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // default swapping pair
  const [tradeFeature, setTradeFeature] = useState("swap");
  const [ammFeature, setAMMFeature] = useState("swap");
  const [feeForTrade, setFeeForTrade] = useState("0.0");
  const [multihop, setMultihop] = useState(false);
  const [multihopBaseToken, setMultihopBaseToken] = useState("AQUA");

  //contains token addresses:  logic shows the routing asset logos , can be two or three items , alos used for the GetAmounts Out
  const [swap_path, setSwapPath] = useState([""]);

  const [tokenA, setTokenA] = useState("USDC");
  const [tokenB, setTokenB] = useState("AQUA");
  const [amountA, setAmountA] = useState<string>();
  const [amountB, setAmountB] = useState<string>("1");

  const [showTokenListA, setShowTokenListA] = useState(false);
  const [showTokenListB, setShowTokenListB] = useState(false);

  const walletTokenList = useSkaleExplorer(address);

  const { data: poolAddress } = useFactory(FACTORY_AQUADEX, "getPair", [
    tokenAAddress.current,
    tokenBAddress.current,
  ]);

  const swap_path_logos1 = findTokenLogoFromAddress(swap_path[0]);
  const swap_path_logos2 = findTokenLogoFromAddress(swap_path[1]);
  const swap_path_logos3 = findTokenLogoFromAddress(swap_path?.[2]);

  // COPY PASTE THIS INTO COMPONEBTS
  const filterStringInput = (_value: string, _decimals: number) => {
    if (_value === "") {
      setAmountA(_value);
    }
    if (isNumber(_value)) {
      // prevent update after certain decimals
      const lengthValue = _value.split(".")[1]?.length;
      if (_decimals >= lengthValue || typeof lengthValue === "undefined") {
        setAmountA(_value);
      }
    }
  };
  // COPY PASTE THIS INTO COMPONEBTS

  useEffect(() => {
    if (address && isConnected) {
      if (tokenA && tokenB) {
        // todo this can be simplified
        tokenAAddress.current = findTokenAddressFromSymbol(tokenA);
        tokenBAddress.current = findTokenAddressFromSymbol(tokenB);

        tokenADecimal.current = findTokenDecimalsFromSymbol(tokenA);
        tokenBDecimal.current = findTokenDecimalsFromSymbol(tokenB);

        findPathForPools(tokenAAddress.current, tokenBAddress.current);
      }
    }
  }, [address, isConnected, tokenA, tokenB]);

  useEffect(() => {
    if (poolAddress) {
      if (amountA) {
        addLiqProps.current = {
          amountInputA: amountA,
          amountInputB: amountB,
          tokenAAddress: tokenAAddress.current,
          tokenBAddress: tokenBAddress.current,
          ammPoolAddress: poolAddress,
        };
        handleFeeCalculations(amountA);
      }
    }
  }, [poolAddress, amountA, amountB]);

  useEffect(() => {
    if (poolAddress) {
      findPathForPools(tokenAAddress.current, tokenBAddress.current);
    }
  }, [poolAddress]);

  useEffect(() => {
    if (amountLPRemove && poolAddress) {
      handleLPCalculations();
    }
  }, [amountLPRemove, poolAddress]);

  useEffect(() => {
    if (amountLPRemove && poolAddress) {
      handleLPCalculations();
    }
  }, [amountLPRemove, poolAddress]);

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

  const handleGetMaxAmount = (index: number) => {
    let text: string = "0";
    if (divRef?.current) {
      text = divRef?.current?.innerText;
    }

    const _amount = text; // types tpdp

    switch (index) {
      case 0:
        getMaxAmounts("25", _amount);
        break;
      case 1:
        getMaxAmounts("50", _amount);
        break;

      case 2:
        getMaxAmounts("100", _amount);
        break;
      case 3:
        getMaxAmounts("10", _amount);
        break;
    }
  };

  const getMaxAmounts = (_percentage: string, _amount: string) => {
    const dec = tokenADecimal.current; // bigint : convert to number
    // convert to bigint first for math
    const bigAmount = parseUnits(_amount, Number(dec)) * BigInt(100);
    const bigPerc = parseUnits(_percentage, 0);
    const math = (bigAmount * bigPerc) / BigInt(10000);
    // then back to string for UI
    const amount = formatUnits(math, Number(dec));
    if (amount) {
      setAmountA(amount);
    } else {
      setAmountA(_amount);
    }
  };

  // pass in the token addresses
  const findPathForPools = (_tokenA: string, _tokenB: string) => {
    // Having No Aqua base means a MultiHop is required

    // does pool address exist with current TokenA and TokenB ?
    if (
      poolAddress !== "0x0000000000000000000000000000000000000000" &&
      tokenA !== "AQUA" &&
      tokenB !== "AQUA"
    ) {
      setMultihop(false);
      setSwapPath([_tokenA, _tokenB]);
      // console.log(`LOGIC 1 ${false} ${multihop}`);
      return;
    }

    if (
      poolAddress === "0x0000000000000000000000000000000000000000" &&
      tokenA !== "AQUA" &&
      tokenB !== "AQUA"
    ) {
      setMultihop(true);
      setSwapPath([_tokenA, aqua_token_address, _tokenB]);
      setMultihopBaseToken("AQUA"); // later add some logic to find other base assets like usdc
      // console.log(`LOGIC 2 ${true} ${multihop}`);
      return;
    }

    if (
      multihop === false &&
      poolAddress === "0x0000000000000000000000000000000000000000"
    ) {
      setMultihop(true);
      setSwapPath([_tokenA, aqua_token_address, _tokenB]);
      setMultihopBaseToken("AQUA"); // later add some logic to find other base assets like usdc
      // console.log(`LOGIC 3 ${true} ${multihop}`);
      return;
    }

    setMultihop(false);
    setSwapPath([_tokenA, _tokenB]);
    // console.log(`LOGIC 4 ${false} ${multihop}`);
  };

  // insert Token Addresses
  const pathForPools = (_tokenA: string, _tokenB: string) => {
    if (tokenA !== "AQUA" && tokenB !== "AQUA") {
      return [_tokenA, aqua_token_address, _tokenB];
    }
    return [_tokenA, _tokenB];
  };

  // path for swapping
  const getSwapPath = (tokenA: string, tokenB: string) => {
    let pathAmm = true; // default AMM

    if (
      tokenA === "DAI" ||
      tokenA === "USDP" ||
      tokenA === "USDC" ||
      tokenA === "USDT"
    ) {
      if (
        tokenB === "DAI" ||
        tokenB === "USDP" ||
        tokenB === "USDC" ||
        tokenB === "USDT"
      ) {
        pathAmm = false; // todo : build out stableswap logic
      }
    }
    return pathAmm;
  };

  // Function to handle token swapping
  const handleSwap = () => {
    const timeIs = resultBlock?.data?.timestamp
      ? resultBlock?.data?.timestamp + BigInt(20000)
      : BigInt(404);
    console.log("timestamp for swap ", timeIs);

    if (getSwapPath(tokenA, tokenB)) {
      writeContract({
        abi: EUROPA_AMM_ROUTER_ABI,
        address: ROUTER_AQUADEX,
        functionName: "swapExactTokensForTokens",
        args: [
          parseUnits(amountA, Number(tokenADecimal?.current)),
          parseUnits("0.0", 18),
          pathForPools(tokenAAddress.current, tokenBAddress.current),
          address,
          timeIs,
        ],
      });
    } else {
      //
      console.log(" DEX Stable Swap ");
    }
  };

  // Function to handle token selection from the list
  const handleTokenSelectionA = (token: string) => {
    setTokenA(token);
    setShowTokenListA(false);
  };

  const handleTokenSelectionB = (token: string) => {
    setTokenB(token);
    setShowTokenListB(false);
  };

  // Function to handle liquidity provision
  const handleRemoveLiquidity = () => {
    // Implement liquidity provision logic here
    const timeIs = resultBlock?.data?.timestamp
      ? resultBlock?.data?.timestamp + BigInt(20000)
      : BigInt(404);

    console.log(
      "timestamp for remove Liquidity ",
      timeIs,
      tokenAAddress.current,
      tokenBAddress.current,
      address,
    );

    if (timeIs) {
      writeContract({
        abi: EUROPA_AMM_ROUTER_ABI,
        address: ROUTER_AQUADEX,
        functionName: "removeLiquidity",
        args: [
          tokenAAddress.current,
          tokenBAddress.current,
          amountLP,
          BigInt(0),
          BigInt(0),
          address,
          timeIs,
        ],
      });
    }
  };

  const handleFlipTokens = () => {
    const tempTokenA = tokenA;
    setTokenA(tokenB);
    setTokenB(tempTokenA);
    const tempAmountA = amountA;
    setAmountA(amountB);
    setAmountB(tempAmountA);
  };

  const handleAMMFeatures = (_feature: string) => {
    console.log("Toggle AMM Features ", _feature);
    setAMMFeature(_feature);
  };

  const handleTradeFeatures = (_feature: string) => {
    console.log("Toggle Trading Features ", _feature);
    setTradeFeature(_feature);
  };

  const handleFeeCalculations = (_amount: string) => {
    const _fee = feeNFT.current;
    const nftCheck = BigInt(1000) - _fee;
    const input = parseUnits(_amount, 18); // string to big
    const oneTenth = input / BigInt(1000);
    let fee = BigInt(0);
    switch (Number(nftCheck)) {
      case 0:
        // gold
        fee = oneTenth * BigInt(nftCheck);

      case 1:
        // silver
        fee = oneTenth * BigInt(nftCheck);

      case 2:
        // br
        fee = oneTenth * BigInt(nftCheck);

      case 3:
        // norm
        fee = oneTenth * BigInt(nftCheck); // 0.3% fee

        break;
    }

    if (tokenADecimal.current && fee) {
      setFeeForTrade(formatUnits(fee, 18));
    } else {
      setFeeForTrade("0.0");
    }
  };

  const handleLPCalculations = () => {
    // find lp balance ; value will be string?
    if (
      poolAddress &&
      poolAddress !== "0x0000000000000000000000000000000000000000" &&
      poolAddress !== ""
    ) {
      let saveBalance = "";
      walletTokenList.forEach((element) => {
        if (
          element.contractAddress.toUpperCase() ===
          poolAddress.toLocaleUpperCase()
        ) {
          saveBalance = element.balance;
        }
      });

      if (saveBalance) {
        const percentage = BigInt(amountLPRemove);
        const wallet = BigInt(saveBalance); // string to big
        const out = (wallet * percentage) / BigInt(100);
        setAmountLP(out);
      }
    }
  };

  // console.log(`"AMM Features: is Multihop", ${multihop} isPool ${poolAddress}`);

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <button
          className={styles.nav}
          onClick={() => handleAMMFeatures("swap")}
        >
          Trade
        </button>
        <button
          type="button"
          className={styles.nav}
          onClick={() => handleAMMFeatures("add")}
        >
          Cast
        </button>
        <button
          className={styles.nav}
          onClick={() => handleAMMFeatures("remove")}
        >
          Ship
        </button>
        <button
          type="button"
          className={styles.nav}
          onClick={() => handleAMMFeatures("nft")}
        >
          NFT
        </button>

        {ammFeature !== "nft" && tradeFeature === "swap" ? (
          <button type="button" className={styles.nav}>
            <Image
              src="/gear.svg"
              alt="menu"
              width={26}
              height={26}
              className={styles.imageInvert}
              onClick={handleFlipTokens}
            />
          </button>
        ) : (
          <span></span>
        )}
      </div>

      {ammFeature === "swap" ? (
        <span className={styles.container_nav_xs}>
          <button
            className={
              tradeFeature === "swap" ? styles.nav_xs_select : styles.nav_xs
            }
            onClick={() => handleTradeFeatures("swap")}
          >
            SWP{" "}
          </button>
          <span> </span>
          <button
            className={
              tradeFeature === "dca" ? styles.nav_xs_select : styles.nav_xs
            }
            onClick={() => handleTradeFeatures("dca")}
          >
            DCA{" "}
          </button>
          <span> </span>
          <button
            className={
              tradeFeature === "limit" ? styles.nav_xs_select : styles.nav_xs
            }
            onClick={() => handleTradeFeatures("limit")}
          >
            LMT{" "}
          </button>
        </span>
      ) : (
        <span></span>
      )}

      {ammFeature === "swap" && tradeFeature === "swap" ? (
        <div>
          <div className={styles.container_wrap}>
            {" "}
            <span className={styles.input_box}>
              <input
                className={styles.input_amount}
                type="text"
                placeholder="0.0"
                value={amountA}
                onChange={(e) => filterStringInput(e.target.value, 8)}
              />
              <span className={styles.box_space}>
                <input
                  className={styles.input_symbol}
                  type="text"
                  placeholder="Select Token"
                  value={tokenA}
                  onChange={(e) => setTokenA(e.target.value)}
                  onClick={() => setShowTokenListA(true)}
                />
              </span>
            </span>
            {showTokenListA && walletTokenList && tokenAddresses?.length > 0 ? (
              <div className={styles_pop.popup_container}>
                <div className={styles_pop.popup_content}>
                  {tokenAddresses.map((_token, index) => (
                    <div
                      className={styles.token_list_symbol}
                      key={index}
                      onClick={() => handleTokenSelectionA(_token.symbol)}
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
                            parseFloat(
                              formatUnits(
                                _balance.balance,
                                Number(_balance.decimals),
                              ),
                            ).toFixed(8)}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <span></span>
            )}
            <span className={styles.container_margin}>
              <span className={styles.text_space_right_12}>
                <span className={styles.button_field_xs}>
                  <button type="button" onClick={() => handleGetMaxAmount(3)}>
                    10%
                  </button>
                </span>{" "}
                <span className={styles.button_field_xs}>
                  <button type="button" onClick={() => handleGetMaxAmount(0)}>
                    25%
                  </button>
                </span>{" "}
                <span className={styles.button_field_xs}>
                  <button type="button" onClick={() => handleGetMaxAmount(1)}>
                    50%
                  </button>
                </span>{" "}
                <span className={styles.button_field_xs}>
                  <button type="button" onClick={() => handleGetMaxAmount(2)}>
                    Wallet balance
                  </button>
                </span>
              </span>

              <span ref={divRef} className={styles.container_token_balance}>
                {tokenAAddress.current !== "" &&
                  walletTokenList.map((_balance, index) => (
                    <span key={index} className={styles.amount_balance}>
                      {" "}
                      {_balance.contractAddress.toUpperCase() ===
                        tokenAAddress.current.toUpperCase() &&
                        parseFloat(
                          formatUnits(
                            _balance.balance,
                            Number(_balance.decimals),
                          ),
                        ).toFixed(8)}
                    </span>
                  ))}
              </span>
            </span>
            <span className={styles.text_center}> Approved: </span>
            {address &&
            amountA &&
            tokenAAddress.current &&
            tokenADecimal.current ? (
              <TokenApproveProps
                {...{
                  name: "allowance",
                  address: tokenAAddress.current,
                  approve: parseUnits(amountA, Number(tokenADecimal?.current)),
                  args: [address, ROUTER_AQUADEX],
                }}
              ></TokenApproveProps>
            ) : (
              <span className={styles.text_center}> error </span>
            )}
          </div>

          {!showTokenListA && !showTokenListB ? (
            <span className={styles.button_container_sm}>
              <Image
                src="/flip.svg"
                alt="menu"
                width={30}
                height={30}
                className={styles.imageInvertToggle_sm}
                onClick={handleFlipTokens}
              />
            </span>
          ) : (
            <span></span>
          )}
          {/**  */}
          <div className={styles.input_container}>
            <span className={styles.input_box}>
              <span className={styles.box_space}>
                {amountA && swap_path !== [""] ? (
                  <GetAmountsOut
                    props={[
                      amountA,
                      swap_path,
                      feeNFT.current,
                      tokenADecimal.current,
                      tokenBDecimal.current,
                    ]}
                  ></GetAmountsOut>
                ) : (
                  <input
                    type="text"
                    placeholder="Get Amounts Out"
                    value={"0.0"}
                  />
                )}

                <span className={styles.box_space}>
                  {" "}
                  <input
                    className={styles.input_symbol}
                    type="text"
                    placeholder="Select Token"
                    value={tokenB}
                    onChange={(e) => setTokenB(e.target.value)}
                    onClick={() => setShowTokenListB(true)}
                  />
                </span>

                {showTokenListB && tokenAddresses?.length > 0 ? (
                  <span className={styles_pop.popup_container}>
                    <span className={styles_pop.popup_content}>
                      {tokenAddresses.map((_token, index) => (
                        <span
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
                                parseFloat(
                                  formatUnits(
                                    _balance.balance,
                                    Number(_balance.decimals),
                                  ),
                                ).toFixed(8)}
                            </span>
                          ))}
                        </span>
                      ))}
                    </span>
                  </span>
                ) : (
                  <span></span>
                )}
              </span>
            </span>
          </div>
          {/**  Swap and Approve button  */}
          <span className={styles.button_container}>
            <button
              type="button"
              className={styles.button_field}
              onClick={handleSwap}
            >
              Swap
            </button>
          </span>

          <div className={styles.input_container_column}>
            <div className={styles.column}>
              <p className={styles.routing}>
                Fee:{" "}
                <span className={styles.fee_balance}>
                  {" "}
                  {Number(feeForTrade).toFixed(4)}{" "}
                </span>{" "}
                <span className={styles.fee_balance}> {tokenA}</span>
              </p>
              <p className={styles.routing}> Exchange Rate:</p>
            </div>
            <div className={styles.column}>
              <p>
                {swap_path_logos3 ? (
                  <span className={styles.routing}>
                    {" "}
                    Best Route:{" "}
                    <span>
                      {" "}
                      <Image
                        className={styles.token_list_symbol_space}
                        src={swap_path_logos1}
                        alt="Aquas.Trade Crypto Assets On SKALE Network"
                        width={30}
                        height={30}
                      />
                    </span>
                    <span>
                      <Image
                        className={styles.token_list_symbol_space}
                        src={swap_path_logos2}
                        alt="Aquas.Trade Crypto Assets On SKALE Network"
                        width={30}
                        height={30}
                      />
                    </span>
                    <span>
                      <Image
                        className={styles.token_list_symbol_space}
                        src={swap_path_logos3}
                        alt="Aquas.Trade Crypto Assets On SKALE Network"
                        width={30}
                        height={30}
                      />
                    </span>
                  </span>
                ) : (
                  <span className={styles.routing}>
                    {" "}
                    Best Route:{" "}
                    <span>
                      {" "}
                      <Image
                        className={styles.token_list_symbol_space}
                        src={swap_path_logos1}
                        alt="Aquas.Trade Crypto Assets On SKALE Network"
                        width={30}
                        height={30}
                      />
                    </span>
                    <span>
                      {" "}
                      <Image
                        className={styles.token_list_symbol_space}
                        src={swap_path_logos2}
                        alt="Aquas.Trade Crypto Assets On SKALE Network"
                        width={30}
                        height={30}
                      />
                    </span>
                  </span>
                )}
              </p>
            </div>
          </div>
          {/**  Add AMM Pool Reserves */}
          <div className={styles.input_container_column}>
            <div className={styles.column}>
              {/**  is Multihop, Show reserves from both pools */}

              {multihop ? (
                <span>
                  {multihopBaseToken &&
                    tokenADecimal.current &&
                    tokenBDecimal.current && (
                      <AMMPools
                        props={[
                          poolAddress,
                          "getReserves",
                          [],
                          tokenADecimal.current,
                          18,

                          tokenA,
                          multihopBaseToken,
                        ]}
                      ></AMMPools>
                    )}

                  {multihopBaseToken &&
                    tokenADecimal.current &&
                    tokenBDecimal.current && (
                      <AMMPools
                        props={[
                          poolAddress,
                          "getReserves",
                          [],
                          tokenADecimal.current,
                          18,

                          tokenB,
                          multihopBaseToken,
                        ]}
                      ></AMMPools>
                    )}
                </span>
              ) : (
                <span>
                  {" "}
                  {tokenADecimal.current && tokenBDecimal.current && (
                    <AMMPools
                      props={[
                        poolAddress,
                        "getReserves",
                        [],
                        tokenADecimal.current,
                        tokenBDecimal.current,

                        tokenA,
                        tokenB,
                      ]}
                    ></AMMPools>
                  )}
                </span>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div> </div>
      )}

      {ammFeature === "swap" && tradeFeature === "dca" ? (
        <div>
          <DCAInterface></DCAInterface>
        </div>
      ) : (
        <div> </div>
      )}

      {ammFeature === "swap" && tradeFeature === "limit" ? (
        <div className={styles.input_container}> On Chain Limit Orders</div>
      ) : (
        <div> </div>
      )}

      {ammFeature === "add" ? (
        <div>
          {" "}
          <div className={styles.container_wrap}>
            <div className={styles.input_container_sm}>
              <div className={styles.input_box}>
                <input
                  className={styles.input_amount}
                  type="text"
                  placeholder="0.0"
                  value={amountA}
                  onChange={(e) => filterStringInput(e.target.value, 8)}
                />
                <span className={styles.box_space}>
                  {" "}
                  <input
                    className={styles.input_symbol}
                    type="text"
                    placeholder="Select Token"
                    value={tokenA}
                    onChange={(e) => setTokenA(e.target.value)}
                    onClick={() => setShowTokenListA(true)}
                  />{" "}
                </span>

                {showTokenListA && tokenAddresses?.length > 0 ? (
                  <div className={styles_pop.popup_container}>
                    <div className={styles_pop.popup_content}>
                      {tokenAddresses.map((_token, index) => (
                        <div
                          className={styles.token_list_symbol}
                          key={index}
                          onClick={() => handleTokenSelectionA(_token.symbol)}
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
                                parseFloat(
                                  formatUnits(
                                    _balance.balance,
                                    Number(_balance.decimals),
                                  ),
                                ).toFixed(8)}
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
                  <span className={styles.button_field_xs}>
                    <button type="button" onClick={() => handleGetMaxAmount(3)}>
                      10%
                    </button>
                  </span>{" "}
                  <span className={styles.button_field_xs}>
                    <button type="button" onClick={() => handleGetMaxAmount(0)}>
                      25%
                    </button>
                  </span>{" "}
                  <span className={styles.button_field_xs}>
                    <button type="button" onClick={() => handleGetMaxAmount(1)}>
                      50%
                    </button>
                  </span>{" "}
                  <span className={styles.button_field_xs}>
                    <button type="button" onClick={() => handleGetMaxAmount(2)}>
                      Wallet balance
                    </button>
                  </span>
                </span>

                <div ref={divRef}>
                  {tokenAAddress.current !== "" ? (
                    <TokenBalance
                      props={[
                        tokenAAddress.current,
                        tokenADecimal.current,
                        address,
                      ]}
                    ></TokenBalance>
                  ) : (
                    <span></span>
                  )}
                </div>
              </p>

              <span className={styles.text_center}> Approved: </span>
              {address &&
              amountA &&
              tokenAAddress.current &&
              tokenADecimal.current ? (
                <TokenApproveProps
                  {...{
                    name: "allowance",
                    address: tokenAAddress.current,
                    approve: parseUnits(
                      amountA,
                      Number(tokenADecimal?.current),
                    ),
                    args: [address, ROUTER_AQUADEX],
                  }}
                ></TokenApproveProps>
              ) : (
                <span className={styles.text_center}> error </span>
              )}
            </div>
          </div>
          {!showTokenListA && !showTokenListB ? (
            <div className={styles.button_container_sm_custom}>
              <Image
                src="/flip.svg"
                alt="menu"
                width={30}
                height={30}
                className={styles.imageInvertToggle_sm}
                onClick={handleFlipTokens}
              />
            </div>
          ) : (
            <div></div>
          )}
          <SwapAdd {...addLiqProps.current}> </SwapAdd>
        </div>
      ) : (
        <div> </div>
      )}

      {ammFeature === "remove" ? (
        <div>
          {" "}
          <div className={styles.input_container_sm}>
            <span className={styles.text_space_left_sm}>
              {" "}
              Select Percentage{" "}
            </span>{" "}
            <span className={styles.text_space_left}> Select Token A </span>
            <div className={styles.input_box}>
              <input
                className={styles.input_amount}
                type="number"
                placeholder="100"
                max={100}
                value={amountLPRemove}
                onChange={(e) => setAmountLPRemove(Number(e.target.value))}
              />
              <span className={styles.box_space_xl}>
                <input
                  className={styles.input_symbol}
                  type="text"
                  placeholder="Select Token"
                  value={tokenA}
                  onChange={(e) => setTokenA(e.target.value)}
                  onClick={() => setShowTokenListA(true)}
                />
              </span>

              {showTokenListA && tokenAddresses?.length > 0 ? (
                <div className={styles_pop.popup_container}>
                  <div className={styles_pop.popup_content}>
                    {tokenAddresses.map((_token, index) => (
                      <div
                        className={styles.token_list_symbol}
                        key={index}
                        onClick={() => handleTokenSelectionA(_token.symbol)}
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
                LP: {poolAddress ? poolAddress : " Pool not found"}
              </span>

              <span className={styles.text_space_right_12}>
                {" "}
                Wallet balance{" "}
              </span>

              <span ref={divRef} className={styles.container_token_balance}>
                {poolAddress &&
                  poolAddress !==
                    "0x0000000000000000000000000000000000000000" &&
                  poolAddress !== "" &&
                  walletTokenList.map((_balance, index) => (
                    <span key={index} className={styles.amount_balance}>
                      {" "}
                      {_balance.contractAddress.toUpperCase() ===
                        poolAddress.toUpperCase() &&
                        parseFloat(
                          formatUnits(
                            _balance.balance,
                            Number(_balance.decimals),
                          ),
                        ).toFixed(8)}
                    </span>
                  ))}
              </span>
            </p>
            <span className={styles.text_center}> Approved: </span>
            {address && poolAddress && amountLP ? (
              <TokenApproveProps
                {...{
                  name: "allowance",
                  address: poolAddress,
                  approve: amountLP,
                  args: [address, ROUTER_AQUADEX],
                }}
              ></TokenApproveProps>
            ) : (
              <span className={styles.text_center}> error </span>
            )}
          </div>
          {!showTokenListA && !showTokenListB ? (
            <div className={styles.button_container_sm}>
              <Image
                src="/flip.svg"
                alt="menu"
                width={30}
                height={30}
                className={styles.imageInvertToggle_sm}
                onClick={handleFlipTokens}
              />
            </div>
          ) : (
            <div></div>
          )}
          <div className={styles.input_container}>
            <span className={styles.text_space_left_xl}>Select Token B</span>

            <div className={styles.token_inputs}>
              {" "}
              <span className={styles.box_space}>
                <input
                  className={styles.input_symbol}
                  type="text"
                  placeholder="Select Token"
                  value={tokenB}
                  onChange={(e) => setTokenB(e.target.value)}
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
                              parseFloat(
                                formatUnits(
                                  _balance.balance,
                                  Number(_balance.decimals),
                                ),
                              ).toFixed(8)}
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
          </div>
          <div className={styles.button_container}>
            <button
              className={styles.button_field}
              onClick={handleRemoveLiquidity}
            >
              Set Sail
            </button>
          </div>
          <div className={styles.input_container_column}>
            <div className={styles.column}>
              <p> Token A Out:</p>
              <p> Token B Out:</p>
            </div>
          </div>
        </div>
      ) : (
        <div> </div>
      )}

      {ammFeature === "nft" ? (
        <div className={styles.container_margin}>
          <NFTBalance> </NFTBalance>
          <p className={styles.center}>
            {" "}
            <button type="button" className={styles.button_field}>
              <Link href="/dashboard/nft">Buy NFT</Link>
            </button>
          </p>
        </div>
      ) : (
        <div> </div>
      )}

      <span>
        <ToastContainer />
      </span>
    </div>
  );
};

export default SwapAmm;
