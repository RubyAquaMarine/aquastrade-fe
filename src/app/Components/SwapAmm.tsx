// @ts-nocheck
"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
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

import { ERC20_ABI } from "@/app/Abi/erc20";
import { EUROPA_AMM_ROUTER_ABI } from "@/app/Abi/europaAMMRouter";
import { useERC20Token } from "@/app/Hooks/useAMM";
import {
  tokenSymbols,
  tokenAddresses,
  ROUTER_AQUADEX,
} from "@/app/Utils/config";
import styles from "@/app/Styles/AMM.module.css";
import styles_pop from "@/app/Styles/Popup.module.css";

const SwapAmm = () => {
  // Save state without rendering
  const tokenAAddress = useRef(
    "0xD2Aaa00700000000000000000000000000000000" as `0x${string}`,
  );
  const tokenBAddress = useRef(
    "0xE34A1fEF365876D4D0b55D281618768583ba4867" as `0x${string}`,
  );
  const feeNFT = useRef(BigInt(997));

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
  const [tokenA, setTokenA] = useState("USDP");
  const [tokenB, setTokenB] = useState("AQUA");
  const [amountA, setAmountA] = useState("0.00001");
  const [amountB, setAmountB] = useState("0.0");
  const [showTokenListA, setShowTokenListA] = useState(false);
  const [showTokenListB, setShowTokenListB] = useState(false);

  // Allowance on Swapping Token A
  const allowanceArray: any[any] = [address, ROUTER_AQUADEX];

  const { data: tokenAllowance } = useERC20Token(
    tokenAAddress.current,
    "allowance",
    allowanceArray,
  );

  console.log("Rendered AMM ");

  // todo : this needs to be useRef because usingState renders way too much
  useEffect(() => {
    if (address && isConnected === true) {
      if (tokenA && tokenB) {
        findAddressFromSymbol(true, tokenA);
        findAddressFromSymbol(false, tokenB);
        findPathForPools(tokenAAddress.current, tokenBAddress.current);
      }
    }
  }, [address, isConnected, tokenA, tokenB]);

  useEffect(() => {
    if (contractCallDataConfirmed) {
      console.log("POP UP HERE");
    }
  }, [contractCallDataConfirmed]);

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
  const pathForSwap = (tokenA: string, tokenB: string) => {
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

  // Function to handle token swapping
  const handleSwap = () => {
    const timeIs = resultBlock?.data?.timestamp
      ? resultBlock?.data?.timestamp + BigInt(20000)
      : BigInt(404);
    console.log("timestamp for swap ", timeIs);
    // Implement swapping logic here
    if (pathForSwap(tokenA, tokenB)) {
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
          parseEther(amountA),
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

  // Function to handle token swapping
  const handleSwapApprove = () => {
    // Implement swapping logic here

    console.log("Approve Token  ", tokenA, " data ", tokenAllowance);

    writeContract({
      abi: ERC20_ABI,
      address: tokenAAddress.current,
      functionName: "approve",
      args: [ROUTER_AQUADEX, parseEther(amountA)],
    });
  };

  // todo
  const handleLiquidityApprove = () => {
    // todo : need to check allowance on both tokens
    writeContract({
      abi: ERC20_ABI,
      address: tokenAAddress.current,
      functionName: "approve",
      args: [ROUTER_AQUADEX, parseEther(amountA)],
    });

    writeContract({
      abi: ERC20_ABI,
      address: tokenBAddress.current,
      functionName: "approve",
      args: [ROUTER_AQUADEX, parseEther(amountB)],
    });
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
      parseEther(amountA),
      parseEther(amountB),
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
          parseEther(amountA),
          parseEther(amountB),
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
    <main>
      <div className={styles.container}>
        <div>
          <button
            className={styles.nav}
            onClick={() => handleAMMFeatures("swap")}
          >
            Swap
          </button>
          <button
            className={styles.nav}
            onClick={() => handleAMMFeatures("add")}
          >
            Add
          </button>
          <button
            className={styles.nav}
            onClick={() => handleAMMFeatures("nft")}
          >
            NFT
          </button>
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
        </div>

        {ammFeature === "swap" ? (
          <div>
            {" "}
            <div className={styles.input_container}>
              <p>You pay</p>
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
              <p className={styles.amount_balance}>
                Balance{" "}
                {tokenAAddress.current !== "" ? (
                  <TokenBalance
                    props={[tokenAAddress.current, 18]}
                  ></TokenBalance>
                ) : (
                  <div></div>
                )}
              </p>
            </div>
            {!showTokenListA && !showTokenListB ? (
              <div id="1" className={styles.button_container}>
                {" "}
                <Image
                  src="/flip.svg"
                  alt="menu"
                  width={18}
                  height={18}
                  priority
                  className={styles.imageInvert}
                  onClick={handleFlipTokens}
                />
              </div>
            ) : (
              <div></div>
            )}
            <div className={styles.input_container}>
              <p>You receive</p>
              <div className={styles.amount_inputs}>
                {swap_path !== [""] && amountA !== "0.0" ? (
                  <GetAmountsOut
                    props={[amountA, swap_path, feeNFT.current]}
                  ></GetAmountsOut>
                ) : (
                  <div className={styles.container}>
                    <input
                      className={styles.get_amount}
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

              <p className={styles.amount_balance}>
                Balance{" "}
                {tokenBAddress.current !== "" ? (
                  <TokenBalance
                    props={[tokenBAddress.current, 18]}
                  ></TokenBalance>
                ) : (
                  <div></div>
                )}
              </p>
            </div>
            <div className={styles.button_container}>
              {tokenAllowance &&
                BigInt(tokenAllowance) >= parseEther(amountA) ? (
                <button className={styles.button_field} onClick={handleSwap}>
                  Swap
                </button>
              ) : (
                <button
                  className={styles.button_field}
                  onClick={handleSwapApprove}
                >
                  Approve
                </button>
              )}
            </div>
          </div>
        ) : (
          <div> </div>
        )}

        {ammFeature === "add" ? (
          <div>
            {" "}
            <div className={styles.input_container}>
              <p>Select Token A</p>
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

              <p className={styles.amount_balance}>
                Balance{" "}
                {tokenAAddress.current !== "" ? (
                  <TokenBalance
                    props={[tokenAAddress.current, 18]}
                  ></TokenBalance>
                ) : (
                  <div></div>
                )}
              </p>
            </div>
            {!showTokenListA && !showTokenListB ? (
              <div id="1" className={styles.button_container}>
                {" "}
                <Image
                  src="/flip.svg"
                  alt="menu"
                  width={18}
                  height={18}
                  priority
                  className={styles.imageInvert}
                  onClick={handleFlipTokens}
                />
              </div>
            ) : (
              <div></div>
            )}
            <div className={styles.input_container}>
              <p>Select Token B</p>
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
              <p className={styles.amount_balance}>
                Balance{" "}
                {tokenBAddress.current !== "" ? (
                  <TokenBalance
                    props={[tokenBAddress.current, 18]}
                  ></TokenBalance>
                ) : (
                  <div></div>
                )}
              </p>
            </div>
            <div className={styles.button_container}>
              {tokenAllowance &&
                BigInt(tokenAllowance) >= parseEther(amountA) ? (
                <button
                  className={styles.button_field}
                  onClick={handleProvideLiquidity}
                >
                  Add Liquidity
                </button>
              ) : (
                <button
                  className={styles.button_field}
                  onClick={handleLiquidityApprove}
                >
                  Approve
                </button>
              )}
            </div>
          </div>
        ) : (
          <div> </div>
        )}

        {ammFeature === "nft" ? (
          <div>
            <NFTBalance> </NFTBalance>
          </div>
        ) : (
          <div> </div>
        )}
      </div>
    </main>
  );
};

export default SwapAmm;
