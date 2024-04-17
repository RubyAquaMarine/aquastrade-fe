// @ts-nocheck
"use client";
import Image from "next/image";
import Link from "next/link";
import {
  useAccount,
  useWriteContract,
  useBlock,
  useWaitForTransactionReceipt,
} from "wagmi";
import React, { useState, useEffect, useRef } from "react";
import { formatUnits, parseEther, parseUnits } from "viem";

// Make components for better rendering functionality: move hooks into these new components
import NFTBalance from "@/app/Components/NFTBalance";
import GetAmountsOut from "@/app/Components/GetAmountsOut";
import TokenBalance from "@/app/Components/TokenBalance";

// test
import TokenApprove from "@/app/Components/TokenApprove";

import AMMPools from "@/app/Components/AMMPools";

import { EUROPA_AMM_ROUTER_ABI } from "@/app/Abi/europaAMMRouter";
import { useFactory } from "@/app/Hooks/useAMM";
import {
  tokenAddresses,
  ROUTER_AQUADEX,
  contractAddresses,
} from "@/app/Utils/config";
import styles from "@/app/Styles/AMM.module.css";
import styles_pop from "@/app/Styles/Popup.module.css";

const SwapAmm = () => {
  // Save state without rendering
  const divRef = useRef(null);

  const handleGetMaxAmount = (index: number) => {
    const text = divRef.current.innerText;
    console.log(text);
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
    }
  };
  const tokenAAddress = useRef(
    "0xD2Aaa00700000000000000000000000000000000" as `0x${string}`,
  );
  const tokenBAddress = useRef(
    "0xE34A1fEF365876D4D0b55D281618768583ba4867" as `0x${string}`,
  );
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
  const [ammFeature, setAMMFeature] = useState("swap");
  const [swap_path, setSwapPath] = useState([""]);
  const [tokenA, setTokenA] = useState("USDC");
  const [tokenB, setTokenB] = useState("AQUA");
  const [amountA, setAmountA] = useState("1");
  const [amountB, setAmountB] = useState("0");
  const [showTokenListA, setShowTokenListA] = useState(false);
  const [showTokenListB, setShowTokenListB] = useState(false);

  // todo : recode this : just a test for now

  const { data: poolAddress } = useFactory(
    contractAddresses[2].addr,
    "getPair",
    [tokenAAddress.current, tokenBAddress.current],
  );

  console.log("Rendered AMM  Pair Address: ", poolAddress);

  // todo : this needs to be useRef because usingState renders way too much
  useEffect(() => {
    if (address && isConnected === true) {
      if (tokenA && tokenB) {
        findAddressFromSymbol(true, tokenA);
        findAddressFromSymbol(false, tokenB);
        findPathForPools(tokenAAddress.current, tokenBAddress.current);

        findSymbolDecimals(tokenA, tokenB);
      }
    }
  }, [address, isConnected, tokenA, tokenB]);

  useEffect(() => {
    if (contractCallDataConfirmed) {
      console.log("POP UP HERE");
    }
  }, [contractCallDataConfirmed]);

  const findSymbolDecimals = (_symbolA: string, _symbolB: string) => {
    if (tokenAddresses) {
      tokenAddresses.forEach((element) => {
        if (_symbolA === element.symbol) {
          tokenADecimal.current = element.decimal;
        }

        if (_symbolB === element.symbol) {
          tokenBDecimal.current = element.decimal;
        }
      });
    }
  };

  const getMaxAmounts = (_percentage: string, _amount: string) => {
    const dec = tokenADecimal.current; // bigint : convert to number
    // convert to bigint first for math
    const bigAmount = parseUnits(_amount, Number(dec)) * BigInt(100);
    const bigPerc = parseUnits(_percentage, 0);
    const math = (bigAmount * bigPerc) / BigInt(10000);
    // then back to string for UI
    const amount = formatUnits(math, dec);
    if (amount) {
      setAmountA(amount);
    } else {
      setAmountA(_amount);
    }
  };

  // todo : this needs to be useRef because usingState renders way too much
  const findPathForPools = (_tokenA: string, _tokenB: string) => {
    if (tokenA !== "AQUA" && tokenB !== "AQUA") {
      // todo : this needs to be useRef because usingState renders way too much
      setSwapPath([
        _tokenA,
        "0xE34A1fEF365876D4D0b55D281618768583ba4867",
        _tokenB,
      ]);
    } else {
      setSwapPath([_tokenA, _tokenB]);
    }
    console.log("  findPathForPools: swap path: ", swap_path);
  };

  const findAddressFromSymbol = (_a: boolean, _symbol: string) => {
    console.log("findTokenAddressFromSymbol", _symbol);
    if (tokenAddresses) {
      tokenAddresses.forEach((element) => {
        if (_symbol === element.symbol) {
          console.log(`found ${_symbol} at address: `, element.addr);

          if (_a === true) {
            tokenAAddress.current = element.addr;
          }
          if (_a === false) {
            tokenBAddress.current = element.addr;
          }
        }
      });
    }
  };

  // path for pools
  // insert Token Addresses
  const pathForPools = (_tokenA: string, _tokenB: string) => {
    if (tokenA !== "AQUA" && tokenB !== "AQUA") {
      console.log(" MultiHop AMM ");
      // all pools are aqua based
      return [_tokenA, "0xE34A1fEF365876D4D0b55D281618768583ba4867", _tokenB];
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
        pathAmm = false;
      }
    }
    return pathAmm;
  };

  const getSwapPool = (tokenA: string, tokenB: string) => {};

  // Function to handle token swapping
  const handleSwap = () => {
    const timeIs = resultBlock?.data?.timestamp
      ? resultBlock?.data?.timestamp + BigInt(20000)
      : BigInt(404);
    console.log("timestamp for swap ", timeIs);
    // Implement swapping logic here
    if (getSwapPath(tokenA, tokenB)) {
      // amm
      console.log(
        " DEX AMM Swap path: ",
        pathForPools(tokenAAddress.current, tokenBAddress.current),
      );
      writeContract({
        abi: EUROPA_AMM_ROUTER_ABI,
        address: ROUTER_AQUADEX,
        functionName: "swapExactTokensForTokens",
        args: [
          parseUnits(amountA, Number(tokenADecimal?.current)),
          parseEther("0.0"),
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
    console.log("User Asset Selected Token A", token);
    setTokenA(token);
    setShowTokenListA(false);
  };

  const handleTokenSelectionB = (token: string) => {
    console.log("User Asset Selected Token B", token);
    setTokenB(token);
    setShowTokenListB(false);
  };

  // Function to handle liquidity provision
  const handleProvideLiquidity = () => {
    // Implement liquidity provision logic here
    const timeIs = resultBlock?.data?.timestamp
      ? resultBlock?.data?.timestamp + BigInt(20000)
      : BigInt(404);

    console.log(
      "timestamp for add Liquidity ",
      timeIs,
      tokenAAddress.current,
      tokenBAddress.current,
      address,
      parseUnits(amountA, Number(tokenADecimal?.current)),
      parseUnits(amountB, Number(tokenBDecimal?.current)),
    );

    if (timeIs) {
      // todo : bug doesn't prompt metamask
      writeContract({
        abi: EUROPA_AMM_ROUTER_ABI,
        address: ROUTER_AQUADEX,
        functionName: "addLiquidity",
        args: [
          tokenAAddress.current,
          tokenBAddress.current,
          parseUnits(amountA, Number(tokenADecimal?.current)),
          parseUnits(amountB, Number(tokenBDecimal?.current)),
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

  return (
    <div className={styles.container}>
      <div>
        <button
          className={styles.nav}
          onClick={() => handleAMMFeatures("swap")}
        >
          Trade
        </button>
        <button className={styles.nav} onClick={() => handleAMMFeatures("add")}>
          Cast
        </button>
        <button
          className={styles.nav}
          onClick={() => handleAMMFeatures("remove")}
        >
          Ship
        </button>
        <button className={styles.nav} onClick={() => handleAMMFeatures("nft")}>
          NFT
        </button>

        {ammFeature !== "nft" ? (
          <button className={styles.nav_right}>
            <Image
              src="/gear.svg"
              alt="menu"
              width={22}
              height={22}
              priority
              className={styles.imageInvert}
              onClick={handleFlipTokens}
            />
          </button>
        ) : (
          <div></div>
        )}
      </div>

      {ammFeature === "swap" ? (
        <div>
          {" "}
          <div></div>
          <div className={styles.input_container_sm}>
            <div className={styles.input_container_column}>
              <div className={styles.column}>
                <span className={styles.button_field_sm}>
                  <button onClick={() => handleGetMaxAmount(0)}>25%</button>
                </span>{" "}
                <span className={styles.button_field_sm}>
                  <button onClick={() => handleGetMaxAmount(1)}>50%</button>
                </span>{" "}
                <span className={styles.button_field_sm}>
                  <button onClick={() => handleGetMaxAmount(2)}>Max</button>
                </span>
              </div>
              <div className={styles.column}>
                <span className={styles.text_space_right_12}>
                  {" "}
                  Wallet balance{" "}
                </span>{" "}
                <div ref={divRef}>
                  {tokenAAddress.current !== "" && (
                    <TokenBalance
                      props={[
                        tokenAAddress.current,
                        tokenADecimal.current,
                        address,
                      ]}
                    ></TokenBalance>
                  )}{" "}
                </div>
              </div>
            </div>

            <div className={styles.input_token_a}>
              <input
                className={styles.input_amount}
                type="text"
                placeholder="0.0"
                value={amountA}
                onChange={(e) => setAmountA(e.target.value)}
              />

              <input
                className={styles.input_token}
                type="text"
                placeholder="Select Token"
                value={tokenA}
                onChange={(e) => setTokenA(e.target.value)}
                onClick={() => setShowTokenListA(true)}
              />

              {showTokenListA && (
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
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <span className={styles.text_center}> Approved: </span>
            {address &&
            amountA &&
            tokenAAddress.current &&
            tokenADecimal.current ? (
              <TokenApprove
                props={[
                  "allowance",
                  tokenAAddress.current,
                  parseUnits(amountA, Number(tokenADecimal?.current)),
                  [address, ROUTER_AQUADEX],
                  tokenADecimal.current,
                ]}
              ></TokenApprove>
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
                priority
                className={styles.imageInvertToggle_sm}
                onClick={handleFlipTokens}
              />
            </div>
          ) : (
            <div></div>
          )}
          {/**  */}
          <div className={styles.input_container}>
            <p className={styles.text_space_left_bd}>Receive</p>
            <div className={styles.amount_inputs}>
              {swap_path !== [""] && amountA !== "0.0" ? (
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
                <div className={styles.input_container}>
                  <input
                    className={styles.amount_inputs}
                    type="text"
                    placeholder="Get Amounts Out"
                    value={"0.0"}
                  />
                </div>
              )}

              <input
                className={styles.input_token}
                type="text"
                placeholder="Select Token"
                value={tokenB}
                onChange={(e) => setTokenB(e.target.value)}
                onClick={() => setShowTokenListB(true)}
              />

              {showTokenListB && (
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
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/**  Swap and Approve button  */}
          <div className={styles.button_container}>
            <button className={styles.button_field} onClick={handleSwap}>
              Swap
            </button>
          </div>
          <div className={styles.input_container_column}>
            <div className={styles.column}>
              <p> Fee:</p>
              <p> Exchange Rate:</p>
            </div>
            <div className={styles.column}>
              <p> Route:</p>
              <p> Slippage:</p>
            </div>
          </div>
          {/**  Add AMM Pool Reserves */}
          <div className={styles.input_container_column}>
            <div className={styles.column}>
              {poolAddress &&
                tokenADecimal.current &&
                tokenBDecimal.current && (
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
            </div>
          </div>
        </div>
      ) : (
        <div> </div>
      )}

      {ammFeature === "add" ? (
        <div>
          {" "}
          <div className={styles.input_container_sm}>
            <span className={styles.text_space_left_sm}>Select Token A </span>

            <div className={styles.amount_inputs}>
              <input
                className={styles.input_amount}
                type="text"
                placeholder="0.0"
                value={amountA}
                onChange={(e) => setAmountA(e.target.value)}
              />

              <input
                className={styles.input_token}
                type="text"
                placeholder="Select Token"
                value={tokenA}
                onChange={(e) => setTokenA(e.target.value)}
                onClick={() => setShowTokenListA(true)}
              />

              {showTokenListA && (
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
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <p className={styles.container_margin}>
              <span className={styles.text_space_right_12}>
                {" "}
                Wallet balance{" "}
              </span>
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
            </p>

            <span className={styles.text_center}> Approved: </span>
            {address &&
            amountA &&
            tokenAAddress.current &&
            tokenADecimal.current ? (
              <TokenApprove
                props={[
                  "allowance",
                  tokenAAddress.current,
                  parseUnits(amountA, Number(tokenADecimal?.current)),
                  [address, ROUTER_AQUADEX],
                  tokenADecimal.current,
                ]}
              ></TokenApprove>
            ) : (
              <span className={styles.text_center}> error </span>
            )}
          </div>
          {!showTokenListA && !showTokenListB ? (
            <div className={styles.button_container_sm_custom}>
              <Image
                src="/flip.svg"
                alt="menu"
                width={30}
                height={30}
                priority
                className={styles.imageInvertToggle_sm}
                onClick={handleFlipTokens}
              />
            </div>
          ) : (
            <div></div>
          )}
          <div className={styles.input_container_sm}>
            <span className={styles.text_space_left_sm}>Select Token B </span>
            <div className={styles.amount_inputs}>
              <input
                className={styles.input_amount}
                type="text"
                placeholder="0.0"
                value={amountB}
                onChange={(e) => setAmountB(e.target.value)}
              />

              <input
                className={styles.input_token}
                type="text"
                placeholder="Select Token"
                value={tokenB}
                onChange={(e) => setTokenB(e.target.value)}
                onClick={() => setShowTokenListB(true)}
              />
              {showTokenListB && (
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
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <p className={styles.container_margin}>
              <span className={styles.text_space_right_12}>
                {" "}
                Wallet balance{" "}
              </span>

              {tokenBAddress.current !== "" ? (
                <TokenBalance
                  props={[
                    tokenBAddress.current,
                    tokenBDecimal.current,
                    address,
                  ]}
                ></TokenBalance>
              ) : (
                <div></div>
              )}
            </p>

            <span className={styles.text_center}> Approved: </span>
            {address &&
            amountB &&
            tokenBAddress.current &&
            tokenBDecimal.current ? (
              <TokenApprove
                props={[
                  "allowance",
                  tokenBAddress.current,
                  parseUnits(amountB, Number(tokenBDecimal?.current)),
                  [address, ROUTER_AQUADEX],
                  tokenBDecimal.current,
                ]}
              ></TokenApprove>
            ) : (
              <div></div>
            )}
          </div>
          <div className={styles.button_container}>
            <button
              className={styles.button_field}
              onClick={handleProvideLiquidity}
            >
              Cast Line
            </button>
          </div>
          <div className={styles.input_container_column}>
            <div className={styles.column}>
              <p> Whale Size:</p>
              <p> Exchange Rate:</p>
            </div>
            <div className={styles.column}>
              <p> Route:</p>
              <p> Slippage:</p>
            </div>
          </div>
        </div>
      ) : (
        <div> </div>
      )}

      {ammFeature === "remove" ? (
        <div>
          {" "}
          <div className={styles.input_container_sm}>
            <span className={styles.text_bold}>
              <span className={styles.text_space_left_sm}>
                {" "}
                Select Percentage{" "}
              </span>{" "}
              <span className={styles.text_space_left}> Select Token A </span>
            </span>

            <div className={styles.amount_inputs}>
              <input
                className={styles.input_amount}
                type="text"
                placeholder="0.0"
                value={amountA}
                onChange={(e) => setAmountA(e.target.value)}
              />

              <input
                className={styles.input_token}
                type="text"
                placeholder="Select Token"
                value={tokenA}
                onChange={(e) => setTokenA(e.target.value)}
                onClick={() => setShowTokenListA(true)}
              />

              {showTokenListA && (
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
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <p className={styles.container_margin}>
              <span className={styles.text_space_right_12}>
                {" "}
                Wallet balance{" "}
              </span>
              {tokenAAddress.current !== "" ? (
                <TokenBalance
                  props={[
                    tokenAAddress.current,
                    tokenADecimal.current,
                    address,
                  ]}
                ></TokenBalance>
              ) : (
                <div></div>
              )}
            </p>

            <span className={styles.text_center}> Approved: </span>
            {address &&
            amountA &&
            tokenAAddress.current &&
            tokenADecimal.current ? (
              <TokenApprove
                props={[
                  "allowance",
                  tokenAAddress.current,
                  parseUnits(amountA, Number(tokenADecimal?.current)),
                  [address, ROUTER_AQUADEX],
                  tokenADecimal.current,
                ]}
              ></TokenApprove>
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
                priority
                className={styles.imageInvertToggle_sm}
                onClick={handleFlipTokens}
              />
            </div>
          ) : (
            <div></div>
          )}
          <div className={styles.input_container}>
            <span className={styles.text_bold}>
              <span className={styles.text_space_left_xl}>Select Token B</span>
            </span>
            <div className={styles.amount_inputs}>
              <span className={styles.space_left_xl}>
                {" "}
                <input
                  className={styles.input_token}
                  type="text"
                  placeholder="Select Token"
                  value={tokenB}
                  onChange={(e) => setTokenB(e.target.value)}
                  onClick={() => setShowTokenListB(true)}
                />{" "}
              </span>

              {showTokenListB && (
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
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <p className={styles.container_margin}>
              <span className={styles.text_space_right_12}>
                {" "}
                Wallet balance{" "}
              </span>
              {tokenBAddress.current !== "" ? (
                <TokenBalance
                  props={[
                    tokenBAddress.current,
                    tokenBDecimal.current,
                    address,
                  ]}
                ></TokenBalance>
              ) : (
                <div></div>
              )}
            </p>

            <span className={styles.text_center}> Approved: </span>
            {address &&
            amountB &&
            tokenBAddress.current &&
            tokenBDecimal.current ? (
              <TokenApprove
                props={[
                  "allowance",
                  tokenBAddress.current,
                  parseUnits(amountB, Number(tokenBDecimal?.current)),
                  [address, ROUTER_AQUADEX],
                  tokenBDecimal.current,
                ]}
              ></TokenApprove>
            ) : (
              <div></div>
            )}
          </div>
          <div className={styles.button_container}>
            <button
              className={styles.button_field}
              onClick={handleProvideLiquidity}
            >
              Set Sail
            </button>
          </div>
          <div className={styles.input_container_column}>
            <div className={styles.column}>
              <p> Token A Out:</p>
              <p> Token B Out:</p>
            </div>
            <div className={styles.column}>
              <p> Route:</p>
              <p> Slippage:</p>
            </div>
          </div>
        </div>
      ) : (
        <div> </div>
      )}

      {ammFeature === "nft" ? (
        <div>
          <NFTBalance> </NFTBalance>
          <p className={styles.center}>
            {" "}
            <span className={styles.container_text}>
              <Link href="/nft">Buy NFT</Link>
            </span>
          </p>
        </div>
      ) : (
        <div> </div>
      )}
    </div>
  );
};

export default SwapAmm;
