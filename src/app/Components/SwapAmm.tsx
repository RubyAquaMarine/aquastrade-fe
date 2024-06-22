// @ts-nocheck
"use client";

// --- // // @ts-nocheck
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
import PoolPrice from "@/app/Components/PoolPrice";
import NFTBalance from "@/app/Components/NFTBalance";
import GetAmountsOut from "@/app/Components/GetAmountsOut";
import DCAInterface from "@/app/Components/DCA";

import TokenApproveProps from "@/app/Components/TokenApproveProps";
import ShowAMMPoolReserves from "@/app/Components/ShowAMMPoolReserves";

import { isNumber, formatPriceBigToHuman } from "@/app/Utils/utils";

import { EUROPA_AMM_ROUTER_ABI } from "@/app/Abi/europaAMMRouter";

import { useSkaleExplorer, WALLET } from "@/app/Hooks/useSkaleExplorer";
import { useFactory, useGetAmountInQuote } from "@/app/Hooks/useAMM";

import styles from "@/app/Styles/AMM.module.css";
import styles_pop from "@/app/Styles/Popup.module.css";

const ROUTER_AQUADEX: `0x${string}` = findContractInfo("router")?.address;
//
const FACTORY_AQUADEX: `0x${string}` = findContractInfo("factory")?.address;

const SwapAmm = () => {
  // Save state without rendering
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

  const feeNFT = useRef(BigInt(997)); // todo nft calculation support

  const tokenADecimal = useRef(BigInt(18));
  const tokenBDecimal = useRef(BigInt(18));

  // wagmi
  const { address, isConnected, chain } = useAccount();
  const resultBlock = useBlock();
  const { data: hash, writeContract } = useWriteContract();
  const { data: contractCallDataConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // ROUTING
  // is multihop or does amm pool exist?
  const [multiHop, setMultihop] = useState(false);
  // make a multi hop route with AQUA as the BASE if the LP pool doesn't exist
  // Display the Reservers in UI of both pools on multihop
  const [multihopBaseToken, setMultihopBaseToken] = useState<string>("AQUA");
  //contains token addresses:  logic shows the routing asset logos , can be two or three items , alos used for the GetAmounts Out
  const [swap_path, setSwapPath] = useState([""]);

  // AMM FEATURES
  const [tradeFeature, setTradeFeature] = useState<string>("swap");
  const [ammFeature, setAMMFeature] = useState<string>("swap");
  const [feeForTrade, setFeeForTrade] = useState<string>("0.0");

  // UI DEFAULTS
  const [tokenA, setTokenA] = useState<string>("USDC");
  const [tokenB, setTokenB] = useState<string>("AQUA");
  const [amountA, setAmountA] = useState<string>("1");
  const [amountB, setAmountB] = useState<string>("0.0");

  // WALLETS and BALANCES
  const [showTokenListA, setShowTokenListA] = useState<boolean>(false);
  const [showTokenListB, setShowTokenListB] = useState<boolean>(false);
  const walletTokenList = useSkaleExplorer(address as WALLET);

  // NEWEST : Not using yet: just an idea when refactoring the Add Liq functionality to new componenent
  // The pool address is required in All three AMM functionalities.
  const [savePoolAddress, setPoolAddress] = useState(
    "0x0000000000000000000000000000000000000000" as `0x${string}`,
  );

  // anythnig that I dont show in the UI can be used as useREF

  const { data: poolAddress } = useFactory(FACTORY_AQUADEX, "getPair", [
    tokenAAddress.current,
    tokenBAddress.current,
  ]);

  // refactor this .... only run these functions within useEffect
  const swap_path_logos0 = useRef("");
  const swap_path_logos1 = useRef("");
  const swap_path_logos2 = useRef("");
  // const swap_path_logos0 = findTokenLogoFromAddress(swap_path[0]);
  // const swap_path_logos2 = findTokenLogoFromAddress(swap_path[1]);
  // const swap_path_logos3 = findTokenLogoFromAddress(swap_path?.[2]);

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

  // todo Adding Liqudity : can be removed when refactoring into ammFeature Components

  // setAmountB   need to this once this value exist
  const addTokenBAmount = useGetAmountInQuote(
    amountA,
    poolAddress,
    tokenAAddress.current,
    tokenADecimal.current,
  );

  // test
  useEffect(() => {
    if (swap_path) {
      swap_path_logos0.current = findTokenLogoFromAddress(swap_path[0]);
      swap_path_logos1.current = findTokenLogoFromAddress(swap_path[1]);
      swap_path_logos2.current = findTokenLogoFromAddress(swap_path?.[2]);
    }
  }, [swap_path]);

  // test
  useEffect(() => {
    // ensure this is amm feature Add Liquidity Only and Not the Swap functionality
    if (
      addTokenBAmount &&
      addTokenBAmount >= BigInt(1) &&
      ammFeature !== "swap"
    ) {
      setAmountB(formatUnits(addTokenBAmount, Number(tokenBDecimal.current))); // convert big to human amount string
    } else {
      setAmountB("0.0");
    }
  }, [addTokenBAmount, ammFeature]);

  useEffect(() => {
    if (address && isConnected) {
      if (tokenA && tokenB) {
        tokenAAddress.current = findTokenAddressFromSymbol(tokenA);
        tokenBAddress.current = findTokenAddressFromSymbol(tokenB);

        tokenADecimal.current = findTokenDecimalsFromSymbol(tokenA);
        tokenBDecimal.current = findTokenDecimalsFromSymbol(tokenB);

        findPathForPools(tokenAAddress.current, tokenBAddress.current);
      }
    }
  }, [address, isConnected, tokenA, tokenB]);

  // test
  useEffect(() => {
    if (poolAddress) {
      setPoolAddress(poolAddress);
      findPathForPools(tokenAAddress.current, tokenBAddress.current);
    }
  }, [poolAddress]);

  useEffect(() => {
    if (amountA) {
      handleFeeCalculations();
    }
  }, [amountA]);

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

  const handleGetMaxAmount = (_index: number) => {
    console.log("CLICKED:ON _FOCUS");

    let text: string = "0";
    if (divRef?.current) {
      text = divRef?.current?.innerText; // string
    }

    const _amount = text; // types tpdp

    switch (_index) {
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

    // compare current values

    if (amount === amountA) {
      // console.log(" getMaxAmounts: DONT UPDATE amountA");

      return;
    }

    if (amount) {
      // console.log(" getMaxAmounts: UPDATE amountA");
      setAmountA(amount);
    } else {
      // console.log(" getMaxAmounts: NOT UPDATED amountA");
      setAmountA(_amount);
    }
  };

  // pass in the token addresses
  const findPathForPools = (_tokenA: string, _tokenB: string) => {
    // Checking logic
    // LP address exists
    if (
      poolAddress !== "0x0000000000000000000000000000000000000000" &&
      tokenA !== "AQUA" &&
      tokenB !== "AQUA"
    ) {
      setMultihop(false);
      setSwapPath([_tokenA, _tokenB]);
      console.log(`LOGIC 1:  LP address exists:  ${false} ${multiHop}`);
      return;
    }

    // Checking logic
    // LP address doesn't exist
    // Create a multip hop route
    if (
      poolAddress === "0x0000000000000000000000000000000000000000" &&
      tokenA !== "AQUA" &&
      tokenB !== "AQUA"
    ) {
      setMultihop(true);
      setSwapPath([_tokenA, aqua_token_address, _tokenB]);

      setMultihopBaseToken("AQUA"); // later add some logic to find other base assets like usdc
      console.log(`LOGIC 2:  LP address doesn't exists:  ${true} ${multiHop}`);
      return;
    }

    // What is this
    if (
      multiHop === false &&
      poolAddress === "0x0000000000000000000000000000000000000000"
    ) {
      setMultihop(true);
      setSwapPath([_tokenA, aqua_token_address, _tokenB]);

      setMultihopBaseToken("AQUA"); // later add some logic to find other base assets like usdc

      console.log(`LOGIC 3 ${true} ${multiHop}`);
      return;
    }

    setMultihop(false);
    setSwapPath([_tokenA, _tokenB]);
    // console.log(`LOGIC 4 ${false} ${multiHop}`);
  };

  // insert Token Addresses
  // only create the Multihop if multi hop  aka =>  no LP address exists
  const pathForPools = (
    _multiHop: boolean,
    _tokenA: string,
    _tokenB: string,
  ) => {
    if (_multiHop) {
      return [_tokenA, aqua_token_address, _tokenB];
    } else {
      return [_tokenA, _tokenB];
    }
  };

  // This function should be able to
  // select the router , such as AMM or Stable Swap, or Other, etc
  const isStableSwapPath = (tokenA: string, tokenB: string) => {
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
    console.log(
      "timestamp for swap ",
      timeIs,
      " Double check ",
      parseUnits("0.0", 18),
    );

    if (isStableSwapPath(tokenA, tokenB)) {
      writeContract({
        abi: EUROPA_AMM_ROUTER_ABI,
        address: ROUTER_AQUADEX,
        functionName: "swapExactTokensForTokens",
        args: [
          parseUnits(amountA, Number(tokenADecimal?.current)),
          parseUnits("0.0", 18),
          pathForPools(multiHop, tokenAAddress.current, tokenBAddress.current),
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
  // ensure the token is not the same as tokenB visa versa
  const handleTokenSelectionA = (token: string) => {
    if (token !== tokenB) {
      setTokenA(token);
    }
    setShowTokenListA(false);
  };

  const handleTokenSelectionB = (token: string) => {
    if (token !== tokenA) {
      setTokenB(token);
    }

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
      writeContract({
        abi: EUROPA_AMM_ROUTER_ABI,
        address: ROUTER_AQUADEX,
        functionName: "addLiquidity",
        args: [
          tokenAAddress.current,
          tokenBAddress.current,
          parseUnits(amountA, Number(tokenADecimal?.current)),
          addTokenBAmount
            ? addTokenBAmount
            : parseUnits(amountB, Number(tokenBDecimal?.current)), // Create new pool
          BigInt(0),
          BigInt(0),
          address,
          timeIs,
        ],
      });
    }
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

  const handleFeeCalculations = () => {
    const _fee = feeNFT.current;
    const nftCheck = BigInt(1000) - _fee;
    const input = parseUnits(amountA, Number(tokenADecimal?.current));
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
      console.log(" FEE CALC", fee);
      const fees = formatUnits(fee, tokenADecimal.current);
      setFeeForTrade(fees);
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

  // console.log(`"AMM Features: is Multihop", ${multiHop} isPool ${poolAddress}`);

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
            <div className={styles.input_container}>
              <span className={styles.input_box}>
                <input
                  className={styles.input_amount}
                  type="text"
                  placeholder="Input Amount"
                  value={amountA}
                  onChange={(e) => filterStringInput(e.target.value, 8)}
                />

                <input
                  className={styles.input_symbol}
                  type="text"
                  placeholder="Select Token"
                  value={tokenA}
                  onChange={(e) => setTokenA(e.target.value)}
                  onClick={() => setShowTokenListA(true)}
                />
              </span>

              {showTokenListA &&
              walletTokenList &&
              tokenAddresses?.length > 0 ? (
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
              <p className={styles.container_margin}>
                <span className={styles.text_space_right_12}>
                  <span className={styles.button_field_xs}>
                    <button
                      type="button"
                      onTouchStart={() => handleGetMaxAmount(3)}
                      onClick={() => handleGetMaxAmount(3)}
                    >
                      10%
                    </button>
                  </span>{" "}
                  <span className={styles.button_field_xs}>
                    <button
                      type="button"
                      onTouchStart={() => handleGetMaxAmount(0)}
                      onClick={() => handleGetMaxAmount(0)}
                    >
                      25%
                    </button>
                  </span>{" "}
                  <span className={styles.button_field_xs}>
                    <button
                      type="button"
                      onTouchStart={() => handleGetMaxAmount(1)}
                      onClick={() => handleGetMaxAmount(1)}
                    >
                      50%
                    </button>
                  </span>{" "}
                  <span className={styles.button_field_xs}>
                    <button
                      type="button"
                      onTouchStart={() => handleGetMaxAmount(2)}
                      onClick={() => handleGetMaxAmount(2)}
                    >
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
          {/** input_container : has no color : input_box has  background-color: #242629;
           * box_space : no color
           *
           *
           */}

          <div className={styles.container_wrap}>
            <div className={styles.input_container}>
              <span className={styles.input_box}>
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
                  <input
                    className={styles.input_amount}
                    type="text"
                    placeholder="0.0"
                    value={"0.0"}
                  />
                )}{" "}
                <input
                  className={styles.input_symbol}
                  type="text"
                  placeholder="Select Token"
                  value={tokenB}
                  onChange={(e) => setTokenB(e.target.value)}
                  onClick={() => setShowTokenListB(true)}
                />
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
            </div>
          </div>
          {/**  Swap and Approve button  */}

          <div className={styles.button_container_img}>
            <button className={styles.button_swap} onClick={handleSwap}>
              <span> Swap Tokens</span>
            </button>
          </div>

          <div className={styles.input_container_column}>
            <div className={styles.column}>
              <p className={styles.routing}>
                Fee: <span className={styles.fee_balance}>{feeForTrade}</span>{" "}
                <span className={styles.fee_balance}> {tokenA}</span>
              </p>

              <p className={styles.routing}>
                <PoolPrice
                  {...{
                    id: savePoolAddress,
                    pool: savePoolAddress,
                  }}
                ></PoolPrice>{" "}
              </p>
            </div>
            <div className={styles.column}>
              <p>
                {swap_path_logos2.current ? (
                  <span className={styles.routing}>
                    {" "}
                    Best Route:{" "}
                    <span>
                      {" "}
                      <Image
                        className={styles.token_list_symbol_space}
                        src={swap_path_logos0.current}
                        alt="Aquas.Trade Crypto Assets On SKALE Network"
                        width={30}
                        height={30}
                      />
                    </span>
                    <span>
                      <Image
                        className={styles.token_list_symbol_space}
                        src={swap_path_logos1.current}
                        alt="Aquas.Trade Crypto Assets On SKALE Network"
                        width={30}
                        height={30}
                      />
                    </span>
                    <span>
                      <Image
                        className={styles.token_list_symbol_space}
                        src={swap_path_logos2.current}
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
                        src={swap_path_logos0.current}
                        alt="Aquas.Trade Crypto Assets On SKALE Network"
                        width={30}
                        height={30}
                      />
                    </span>
                    <span>
                      {" "}
                      <Image
                        className={styles.token_list_symbol_space}
                        src={swap_path_logos1.current}
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

              {multiHop ? (
                <span>
                  {multihopBaseToken &&
                    tokenADecimal.current &&
                    tokenBDecimal.current && (
                      <ShowAMMPoolReserves
                        props={[
                          poolAddress,
                          "getReserves",
                          [],

                          tokenA,
                          multihopBaseToken,
                        ]}
                      ></ShowAMMPoolReserves>
                    )}

                  {multihopBaseToken &&
                    tokenADecimal.current &&
                    tokenBDecimal.current && (
                      <ShowAMMPoolReserves
                        props={[
                          poolAddress,
                          "getReserves",
                          [],

                          tokenB,
                          multihopBaseToken, //  todo why use this hardcode value here? and not the direct token address?
                        ]}
                      ></ShowAMMPoolReserves>
                    )}
                </span>
              ) : (
                <span>
                  {/**  is not Multihop, Show reserves from AMM  pool */}
                  {tokenADecimal.current && tokenBDecimal.current && (
                    <ShowAMMPoolReserves
                      props={[poolAddress, "getReserves", [], tokenA, tokenB]}
                    ></ShowAMMPoolReserves>
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
            <div className={styles.input_container}>
              <div className={styles.input_box}>
                <input
                  className={styles.input_amount}
                  type="text"
                  placeholder="Input Amount"
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
                    <button
                      type="button"
                      onTouchStart={() => handleGetMaxAmount(3)}
                      onClick={() => handleGetMaxAmount(3)}
                    >
                      10%
                    </button>
                  </span>{" "}
                  <span className={styles.button_field_xs}>
                    <button
                      type="button"
                      onTouchStart={() => handleGetMaxAmount(0)}
                      onClick={() => handleGetMaxAmount(0)}
                    >
                      25%
                    </button>
                  </span>{" "}
                  <span className={styles.button_field_xs}>
                    <button
                      type="button"
                      onTouchStart={() => handleGetMaxAmount(1)}
                      onClick={() => handleGetMaxAmount(1)}
                    >
                      50%
                    </button>
                  </span>{" "}
                  <span className={styles.button_field_xs}>
                    <button
                      type="button"
                      onTouchStart={() => handleGetMaxAmount(2)}
                      onClick={() => handleGetMaxAmount(2)}
                    >
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
          <div className={styles.container_wrap}>
            {" "}
            <div className={styles.input_container}>
              <div className={styles.input_box}>
                {poolAddress &&
                addTokenBAmount &&
                poolAddress !== "0x0000000000000000000000000000000000000000" ? (
                  <input
                    className={styles.input_amount}
                    type="text"
                    placeholder="0.0"
                    value={formatUnits(addTokenBAmount, tokenBDecimal.current)}
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

                <span className={styles.container_token_balance}>
                  {tokenBAddress.current !== "" &&
                    walletTokenList.map((_balance, index) => (
                      <span key={index} className={styles.amount_balance}>
                        {" "}
                        {_balance.contractAddress.toUpperCase() ===
                          tokenBAddress.current.toUpperCase() &&
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
              {/** Bug in amountB when adding liquidity. the value is defaulted to 1.0 ^ 18 */}
              <span className={styles.text_center}> Approved: </span>
              {address &&
              amountB &&
              tokenBAddress.current &&
              tokenBDecimal.current ? (
                <TokenApproveProps
                  {...{
                    name: "allowance",
                    address: tokenBAddress.current,
                    approve: parseUnits(
                      amountB,
                      Number(tokenBDecimal?.current),
                    ),
                    args: [address, ROUTER_AQUADEX],
                  }}
                ></TokenApproveProps>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className={styles.button_container_img}>
            <button
              className={styles.button_img}
              onClick={handleProvideLiquidity}
            >
              <span>
                {" "}
                <Image
                  src={`/cast.svg`}
                  alt="AquasTrade Logo outbound external links"
                  width={20}
                  height={20}
                  priority
                />
              </span>

              <span>
                {" "}
                {poolAddress !== "0x0000000000000000000000000000000000000000"
                  ? "Cast Line"
                  : "Build Boat"}{" "}
              </span>
            </button>
          </div>
          <div className={styles.input_container_column}>
            <div className={styles.column}>
              <p>
                <span className={styles.button_field_med}>
                  {" "}
                  {poolAddress !== "0x0000000000000000000000000000000000000000"
                    ? "Whale Size:"
                    : "100% Ownership!"}{" "}
                </span>
                <span className={styles.pool_balance}> %</span>
              </p>
              <p>
                <span className={styles.button_field_med}>
                  {" "}
                  Adding Liquidity to{" "}
                </span>
                <span className={styles.pool_balance}>
                  {" "}
                  {tokenA} - {tokenB}
                </span>
              </p>
            </div>
            <div className={styles.column}></div>
          </div>
        </div>
      ) : (
        <div> </div>
      )}

      {ammFeature === "remove" ? (
        <div className={styles.container_wrap}>
          {" "}
          <div className={styles.input_container}>
            <span className={styles.text_space_left_sm}> Find AMM Pool </span>{" "}
            <span className={styles.text_space_right_1}>
              LP: {poolAddress ? poolAddress : " Pool not found"}
            </span>
            {/** TOKEN A AND TOKEN B SELECTOR  */}
            <div className={styles.input_container}>
              <div className={styles.input_box}>
                <span className={styles.box_space_center}>
                  <input
                    className={styles.input_symbol}
                    type="text"
                    placeholder="Select Token"
                    value={tokenA}
                    onChange={(e) => setTokenA(e.target.value)}
                    onClick={() => setShowTokenListA(true)}
                  />
                </span>

                <span>
                  {" "}
                  {!showTokenListA && !showTokenListB ? (
                    <Image
                      src="/plus.svg"
                      alt="menu"
                      width={30}
                      height={30}
                      className={styles.image_invert}
                    />
                  ) : (
                    <div></div>
                  )}
                </span>

                <span className={styles.box_space_center}>
                  <input
                    className={styles.input_symbol}
                    type="text"
                    placeholder="Select Token"
                    value={tokenB}
                    onChange={(e) => setTokenB(e.target.value)}
                    onClick={() => setShowTokenListB(true)}
                  />
                </span>

                {/** Show the Token List and map Token balances  */}
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
                          {/** Does the user have any assets within their wallet  */}
                          {walletTokenList &&
                            walletTokenList.map((_balance, index) => (
                              <span
                                key={index}
                                className={styles.amount_balance}
                              >
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
            <span className={styles.text_space_left_sm}>
              {" "}
              Select Percentage{" "}
            </span>{" "}
            <div className={styles.input_container}>
              <div className={styles.input_box}>
                <span className={styles.box_space}>
                  {" "}
                  <input
                    className={styles.input_amount_sm}
                    type="number"
                    placeholder="100"
                    min={1}
                    step={1}
                    max={100}
                    value={amountLPRemove}
                    onChange={(e) => setAmountLPRemove(Number(e.target.value))}
                  />{" "}
                </span>

                <span className={styles.box_space}>
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
                </span>
              </div>
            </div>
            <p className={styles.container_margin}>
              <span className={styles.text_space_right_12}>
                {" "}
                Wallet balance{" "}
              </span>

              <span ref={divRef} className={styles.container_token_balance}>
                {poolAddress &&
                  walletTokenList &&
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
          </div>
          <div className={styles.button_container_img}>
            <button
              className={styles.button_img}
              onClick={handleRemoveLiquidity}
            >
              <span>
                {" "}
                <Image
                  src={`/sailboat.svg`}
                  alt="AquasTrade Logo outbound external links"
                  width={20}
                  height={20}
                  priority
                />
              </span>

              <span> Set Sail </span>
            </button>
          </div>
          {/**
           
             <div className={styles.input_container_column}>
            <div className={styles.column}>
              <p> Token A Out:</p>
              <p> Token B Out:</p>
            </div>
          </div>
           
           
           
            */}
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
/*
 {ammFeature !== "nft" && tradeFeature === "swap" ? (
          <button className={styles.nav}>
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
*/
