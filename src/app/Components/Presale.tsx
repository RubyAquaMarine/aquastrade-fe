// @ts-nocheck
"use client";
import Slider from "@mui/material/Slider";
import Link from "next/link";
import Image from "next/image";
import React, { useState, ChangeEvent, useEffect, useRef } from "react";

import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useAccount,
  useWriteContract,
  useBlock,
  useWaitForTransactionReceipt,
  useSwitchChain,
} from "wagmi";
import { formatUnits, parseUnits } from "viem";
/*
  AquasTrade components
*/

import TokenApproveProps from "@/app/Components/TokenApproveProps";
import PresaleTokenInfo from "@/app/Components/PresaleTokenInfo";
/*
  AquasTrade hooks
*/
import { useSkaleExplorer } from "@/app/Hooks/useSkaleExplorer";
import { useERC20Token } from "@/app/Hooks/useAMM";
import { usePresale } from "@/app/Hooks/usePresale";
/*
  AquasTrade config
*/
import { CHAIN } from "@/app/Utils/config";
import { PRESALE_ABI } from "@/app/Abi/presale";
import styles from "@/app/Styles/Presale.module.css";
/*
  AquasTrade utils
*/
import {
  findTokenAddressFromSymbol,
  findContractInfo,
  findTokenFromAddress,
} from "@/app//Utils/findTokens";

type Props = {
  _address?: `0x${string}`; // AMM POOL ADDRESS, but maybe change to factory address : multi DEX support
  address?: `0x${string}`; // AMM POOL ADDRESS, but maybe change to factory address : multi DEX support
};

const Presale: React.FC = (props: Props) => {
  const presaleTokenAddress = props?.props;

  const inputMinAmount = useRef<number>();

  const [remaingTokens, setRemainingTokens] = useState<number>();

  // dropdown menu state
  const [showDropdownSymbol, setDDSymbol] = useState<boolean>(false);

  // load the symbols into an array for mapping
  // but this never needs to change : mod to useRef
  const inputSymbolsInDropdown = useRef(["USDC", "USDT", "USDP", "DAI"]);

  const [inputUSDAddress, setUSDAddress] = useState<string>();

  // how much in USD to use for purchasing preale
  const [inputTokenAmount, setTokenAmount] = useState<number>();

  // HOOKS

  const { data: isPresalePaused } = usePresale("isPaused", []);

  //wagmi
  const { address, isConnected, chain } = useAccount();
  const { chains, switchChain } = useSwitchChain();
  const { data: hash, writeContract } = useWriteContract();
  const { data: contractCallDataConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const walletTokenList = useSkaleExplorer(address);

  // UTILS

  // Presale Contract
  const contractPresale = findContractInfo("presale");

  // remove the slider into a componenet and pass down props (addresses and values )
  const { data: tokenSupply } = useERC20Token(
    presaleTokenAddress,
    "totalSupply",
    [],
  ); // $AQUA

  const { data: tokenSupplyRemaining } = useERC20Token(
    presaleTokenAddress,
    "balanceOf",
    [contractPresale?.address],
  ); // $AQUA

  const loadTokenUSDInfo = findTokenFromAddress(inputUSDAddress);
  inputMinAmount.current = 2; //  loadTokenUSDInfo?.decimals && loadTokenUSDInfo.decimals === 18 ? 8 : 6;

  useEffect(() => {
    if (tokenSupplyRemaining && tokenSupply) {
      setRemainingTokens(
        Number((tokenSupplyRemaining * 10000n) / tokenSupply) / 100,
      );
    }
  }, [tokenSupplyRemaining, tokenSupply]);

  useEffect(() => {
    if (contractCallDataConfirmed) {
      const isLink = `https://elated-tan-skat.explorer.mainnet.skalenodes.com/tx/${hash}`;
      notify(isLink);
    }
  }, [contractCallDataConfirmed, hash]);

  const CustomToastWithLink = (_url: string) => (
    <div>
      <Link href={_url} target="_blank">
        Presale Token Purchased: Tx Hash on 🌊 AquasTrade
      </Link>
    </div>
  );
  // `${_message} on 🌊 AquasTrade! [tx] Hash: ${_link}`
  const notify = (_link: string) =>
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

  const doTokenLaunch = () => {
    writeContract({
      abi: PRESALE_ABI,
      address: contractPresale?.address,
      functionName: "buy",
      args: [
        loadTokenUSDInfo?.address,
        parseUnits(inputTokenAmount?.toString(), loadTokenUSDInfo?.decimals),
      ],
    });
  };

  const handleItemClick = (item: string, _switch: number) => {
    switch (_switch) {
      case 0:
        break;

      case 1:
        const addr = findTokenAddressFromSymbol(item);
        setUSDAddress(addr);
        setDDSymbol(false);
        break;
    }
  };

  const handleMenuState = () => {
    setDDSymbol(!showDropdownSymbol);
  };

  // console.log(
  //   "Render Presale",
  //   remaingTokens,
  //   tokenSupply,
  //   tokenSupplyRemaining,
  //   presaleTokenAddress,
  // );

  function setTwoNumberDecimal(event) {
    this.value = parseFloat(this.value).toFixed(2);
  }

  return (
    <div>
      {address && chain && chain.id === CHAIN.id ? (
        <div>
          {presaleTokenAddress ? "" : "Loading"}

          <span className={styles.text_bd}> Next Raise </span>
          <PresaleTokenInfo
            {...{ address: presaleTokenAddress }}
          ></PresaleTokenInfo>

          <div className={styles.container_flex_tokens}>
            {" "}
            <span className={styles.text_border_bottom}>
              {" "}
              <Link
                href={`https://elated-tan-skat.explorer.mainnet.skalenodes.com/address/0xa88b25ebb3cb5b0f08124e8ffbc6249ae026cb07`}
                target={"_blank"}
              >
                Remaining Tokens
              </Link>{" "}
            </span>
            <span>
              {" "}
              {tokenSupplyRemaining &&
                presaleTokenAddress &&
                formatUnits(tokenSupplyRemaining, 18)}{" "}
            </span>
            {remaingTokens && tokenSupply && presaleTokenAddress ? (
              <Slider
                aria-label="Small steps"
                defaultValue={100 - remaingTokens}
                step={0.1}
                marks
                min={0}
                max={100}
                valueLabelDisplay="auto"
              />
            ) : (
              <span>loading</span>
            )}
          </div>
          <span className={styles.text_center}>
            {" "}
            <input
              type="text"
              value={inputUSDAddress}
              placeholder="Select USDC, USDT, USDP, DAI"
              onClick={handleMenuState}
              onChange={() => {
                setDDSymbol(false);
              }}
              className={styles.input_token_address}
            />{" "}
          </span>
          <span>
            {" "}
            {showDropdownSymbol &&
              inputSymbolsInDropdown.current.length >= 1 && (
                <div className={styles.dropdownmenu}>
                  {inputSymbolsInDropdown.current.map((_item) => (
                    <div
                      className={styles.box}
                      key={_item}
                      onClick={() => handleItemClick(_item, 1)}
                    >
                      <span className={styles.dropdownmenu_item}> {_item}</span>
                      <span className={styles.dropdownmenu_item_image}>
                        <Image
                          src={`/${_item}.svg`}
                          alt="AquasTrade USD"
                          width={20}
                          height={20}
                          priority
                        />
                      </span>
                      <span className={styles.dropdownmenu_item_balance}>
                        {walletTokenList.length >= 1 &&
                          walletTokenList.map((_balance, index) => (
                            <span key={index}>
                              {_balance?.symbol === _item.toUpperCase() &&
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
                    </div>
                  ))}
                </div>
              )}{" "}
          </span>
          <span className={styles.text_center}>
            {inputUSDAddress ? (
              <input
                type="number"
                placeholder="100"
                min={Number(formatUnits(1n, inputMinAmount.current))}
                step={Number(formatUnits(1n, inputMinAmount.current))}
                value={inputTokenAmount}
                onChange={(e) => setTokenAmount(Number(e.target.value))}
                className={styles.input_token_amount}
              />
            ) : (
              <span></span>
            )}
          </span>
          {inputUSDAddress && inputTokenAmount ? (
            <TokenApproveProps
              {...{
                name: "allowance",
                address: inputUSDAddress,
                approve: parseUnits(
                  inputTokenAmount.toString(),
                  loadTokenUSDInfo?.decimals,
                ),
                args: [address, contractPresale?.address],
              }}
            ></TokenApproveProps>
          ) : (
            <span> </span>
          )}
          {inputUSDAddress && isPresalePaused === false ? (
            <span className={styles.container_margin}>
              <button
                type="button"
                className={styles.button_presale}
                onClick={doTokenLaunch}
              >
                Buy Token
              </button>
            </span>
          ) : (
            <span className={styles.container_margin}>
              {isPresalePaused ? (
                <button
                  className={styles.button_presale}
                  onClick={doTokenLaunch}
                >
                  Presale Coming Soon
                </button>
              ) : (
                <button
                  className={styles.button_presale}
                  onClick={doTokenLaunch}
                >
                  Select USD
                </button>
              )}
            </span>
          )}
        </div>
      ) : (
        <div className={styles.text_border_bottom}>
          <Link href="/dashboard">Switch Networks</Link>
        </div>
      )}

      <span>
        <ToastContainer />
      </span>
    </div>
  );
};

export default Presale;
