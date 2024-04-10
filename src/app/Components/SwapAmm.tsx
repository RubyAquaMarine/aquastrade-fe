"use client";
import {
  useAccount,
  useWriteContract,
  useBlock,
  useWaitForTransactionReceipt,
} from "wagmi";
import React, { useState, useEffect, useRef } from "react";
import { formatUnits, parseEther, parseUnits } from "viem";
import { usePathname } from "next/navigation";

import Image from "next/image";

import { ERC20_ABI } from "@/app/Abi/erc20";
import { EUROPA_AMM_ROUTER_ABI } from "@/app/Abi/europaAMMRouter";
import { useERC20Token, useNFTs, useAMMRouter } from "@/app/Hooks/useAMM";
import {
  EUROPA_ROUTER,
  tokenSymbols,
  tokenAddresses,
  ROUTER_AQUADEX,
  MARKETPLACE_GOLD_NFT,
  MARKETPLACE_BRONZE_NFT,
  MARKETPLACE_SILVER_NFT,
} from "@/app/Utils/config";
import styles from "@/app/Styles/AMM.module.css";
import styles_pop from "@/app/Styles/Popup.module.css";

const SwapAmm = () => {
  const toggleAMMFeatures = useRef("swap"); // swap, add, list
  const [ammFeature, setAMMFeature] = useState("swap"); // swap, add, list

  const { address, isConnected, chain } = useAccount();
  const resultBlock = useBlock();
  const { data: hash, writeContract } = useWriteContract();

  const { data: contractCallDataConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const path = usePathname();
  const dappType = path;

  // default swapping pair
  const [tokenA, setTokenA] = useState("ETH");
  const [tokenB, setTokenB] = useState("AQUA");

  const [showTokenListA, setShowTokenListA] = useState(false);
  const [showTokenListB, setShowTokenListB] = useState(false);

  const [tokenAAddress, setTokenAAddress] = useState(
    "0xD2Aaa00700000000000000000000000000000000" as `0x${string}`,
  );
  const [tokenBAddress, setTokenBAddress] = useState(
    "0xE34A1fEF365876D4D0b55D281618768583ba4867" as `0x${string}`,
  );

  // Token Balances
  const { data: tokenA_balance } = useERC20Token(tokenAAddress, "balanceOf", [
    address,
  ]);
  const { data: tokenB_balance } = useERC20Token(tokenBAddress, "balanceOf", [
    address,
  ]);

  // Allowance on Swapping Token A
  const allowanceArray: any[any] = [address, EUROPA_ROUTER];
  const { data: tokenAllowance } = useERC20Token(
    tokenAAddress,
    "allowance",
    allowanceArray,
  );

  const [amountA, setAmountA] = useState("");
  const [amountB, setAmountB] = useState("");

  // NFT Balances
  const { data: nft_gold_balance } = useNFTs(
    MARKETPLACE_GOLD_NFT,
    "balanceOf",
    [address],
  );
  const { data: nft_silver_balance } = useNFTs(
    MARKETPLACE_SILVER_NFT,
    "balanceOf",
    [address],
  );
  const { data: nft_bronze_balance } = useNFTs(
    MARKETPLACE_BRONZE_NFT,
    "balanceOf",
    [address],
  );

  const [swap_path, setSwapPath] = useState([""]);

  // Get Amounts Out  ( amountIn, Path[], 999:fee)
  const { data: swap_out } = useAMMRouter(ROUTER_AQUADEX, "getAmountsOut", [
    parseUnits(amountA, 18),
    swap_path,
    999,
  ]);

  useEffect(() => {
    if (address && isConnected === true) {
      if (tokenA && tokenB) {
        findAddressFromSymbol(true, tokenA);
        findAddressFromSymbol(false, tokenB);
      }
    }
  }, [address, isConnected, tokenA, tokenB]);

  useEffect(() => {
    if (contractCallDataConfirmed) {
      console.log("POP UP HERE");
    }
  }, [contractCallDataConfirmed]);

  useEffect(() => {
    if (address && isConnected === true) {
      // new  : get the path and save state
      if (tokenAAddress && tokenBAddress) {
        console.log("  findPathForPools");
        findPathForPools(tokenAAddress, tokenBAddress);
      }
    }
  }, [address, isConnected, tokenAAddress, tokenBAddress]);

  // path for pools
  // insert Token Addresses
  const findPathForPools = (_tokenA: string, _tokenB: string) => {
    if (tokenA !== "AQUA" && tokenB !== "AQUA") {
      console.log(" MultiHop AMM ");
      // all pools are aqua based
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
            setTokenAAddress(element.addr);
          }
          if (_a === false) {
            setTokenBAddress(element.addr);
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
        pathForPools(tokenAAddress, tokenBAddress),
      );
      writeContract({
        abi: EUROPA_AMM_ROUTER_ABI,
        address: ROUTER_AQUADEX,
        functionName: "swapExactTokensForTokens",
        args: [
          parseEther(amountA),
          parseEther("0.0"),
          pathForPools(tokenAAddress, tokenBAddress),
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
      address: tokenAAddress,
      functionName: "approve",
      args: [EUROPA_ROUTER, parseEther(amountA)],
    });
  };

  // todo
  const handleLiquidityApprove = () => {
    // todo : need to check allowance on both tokens
    writeContract({
      abi: ERC20_ABI,
      address: tokenAAddress,
      functionName: "approve",
      args: [EUROPA_ROUTER, parseEther(amountA)],
    });

    writeContract({
      abi: ERC20_ABI,
      address: tokenBAddress,
      functionName: "approve",
      args: [EUROPA_ROUTER, parseEther(amountB)],
    });
  };

  // Function to handle liquidity provision
  const handleProvideLiquidity = () => {
    // Implement liquidity provision logic here
    const timeIs = resultBlock?.data?.timestamp
      ? resultBlock?.data?.timestamp + BigInt(20000)
      : BigInt(404);
    console.log("timestamp for add Liquidity ", timeIs);
    console.log(
      "timestamp for add Liquidity ",
      tokenAAddress,
      tokenBAddress,
      address,
      parseEther(amountA),
      parseEther(amountB),
    );

    // todo : bug doesn't prompt metamask
    writeContract({
      abi: EUROPA_AMM_ROUTER_ABI,
      address: ROUTER_AQUADEX,
      functionName: "addLiquidity",
      args: [
        tokenAAddress,
        tokenBAddress,
        parseEther(amountA),
        parseEther(amountB),
        BigInt(1),
        BigInt(1),
        address,
        timeIs,
      ],
      gas: BigInt(9999999999),
    });
  };

  const handleFlipTokens = () => {
    const tempTokenA = tokenA;
    setTokenA(tokenB);
    setTokenB(tempTokenA);
    const tempAmountA = amountA;
    setAmountA(amountB);
    setAmountB(tempAmountA);

    // get new token balances
    console.log(
      "handleFlipTokens: Token Balances ",
      tokenA_balance,
      tokenB_balance,
    );
    // todo : debug
    console.log("debug swap_out ", swap_out);
  };

  const handleAMMFeatures = (_feature: string) => {
    toggleAMMFeatures.current = _feature;
    setAMMFeature(toggleAMMFeatures.current);
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

        {toggleAMMFeatures.current === "swap" ? (
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
                      {tokenSymbols.map((token, index) => (
                        <div
                          key={index}
                          onClick={() => handleTokenSelectionA(token)}
                        >
                          {token}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <p className={styles.amount_balance}>
                Balance{" "}
                {!tokenA_balance
                  ? "0.0"
                  : typeof tokenA_balance === "bigint" &&
                    formatUnits(tokenA_balance, 18)}{" "}
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
                {!swap_out ? (
                  <input
                    className={styles.input_token}
                    type="text"
                    placeholder="Select Token"
                    value={"0.0"}
                  />
                ) : (
                  typeof swap_out === "object" && (
                    <input
                      className={styles.input_token}
                      type="text"
                      placeholder="Select Token"
                      value={formatUnits(swap_out[1], 18)}
                    />
                  )
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
                      {tokenSymbols.map((token, index) => (
                        <div
                          key={index}
                          onClick={() => handleTokenSelectionB(token)}
                        >
                          {token}
                        </div>
                      ))}

                      <div className="selected-tokens">
                        {tokenSymbols.map(({ id, iconUrl }) => (
                          <img key={id} src={iconUrl}></img>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <p className={styles.amount_balance}>
                Balance{" "}
                {!tokenB_balance
                  ? "0.0"
                  : typeof tokenB_balance === "bigint" &&
                    formatUnits(tokenB_balance, 18)}{" "}
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

        {toggleAMMFeatures.current === "add" ? (
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
                      {tokenSymbols.map((token, index) => (
                        <div
                          key={index}
                          onClick={() => handleTokenSelectionA(token)}
                        >
                          {token}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <p className={styles.amount_balance}>
                Balance{" "}
                {!tokenA_balance
                  ? "0.0"
                  : typeof tokenA_balance === "bigint" &&
                    formatUnits(tokenA_balance, 18)}{" "}
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
                      {tokenSymbols.map((token, index) => (
                        <div
                          key={index}
                          onClick={() => handleTokenSelectionB(token)}
                        >
                          {token}
                        </div>
                      ))}

                      <div className="selected-tokens">
                        {tokenSymbols
                          .filter(({ selected }) => selected)
                          .map(({ id, iconUrl }) => (
                            <img key={id} src={iconUrl}></img>
                          ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <p className={styles.amount_balance}>
                Balance{" "}
                {!tokenB_balance
                  ? "0.0"
                  : typeof tokenB_balance === "bigint" &&
                    formatUnits(tokenB_balance, 18)}{" "}
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

        {toggleAMMFeatures.current === "nft" ? (
          <div>
            {" "}
            <div className={styles.input_container}>
              <p>Gold NFT Holder</p>
              <p className={styles.amount_balance}>
                {" "}
                {!nft_gold_balance
                  ? "0.0"
                  : typeof nft_gold_balance === "bigint" &&
                    formatUnits(nft_gold_balance, 0)}
              </p>

              <p>Silver NFT Holder</p>
              <p className={styles.amount_balance}>
                {" "}
                {!nft_silver_balance
                  ? "0.0"
                  : typeof nft_silver_balance === "bigint" &&
                    formatUnits(nft_silver_balance, 0)}{" "}
              </p>

              <p>Bronze NFT Holder</p>
              <p className={styles.amount_balance}>
                {" "}
                {!nft_bronze_balance
                  ? "0.0"
                  : typeof nft_bronze_balance === "bigint" &&
                    formatUnits(nft_bronze_balance, 0)}{" "}
              </p>
            </div>
          </div>
        ) : (
          <div> </div>
        )}
      </div>
    </main>
  );
};

export default SwapAmm;
