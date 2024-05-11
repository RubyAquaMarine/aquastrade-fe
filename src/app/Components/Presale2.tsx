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
import TokenApprove from "@/app/Components/TokenApprove";
import { CHAIN } from "@/app/Utils/config";
import { PRESALE_ABI } from "@/app/Abi/presale";
import {
  findContractInfo,
  findTokenFromAddress,
} from "@/app//Utils/findTokens";
import { findTokenAddressFromSymbol } from "@/app/Utils/findTokens";
import { useERC20Token } from "@/app/Hooks/useAMM";
import { usePresale } from "@/app/Hooks/usePresale";
import styles from "@/app/Styles/Presale.module.css";

const Presale: React.FC = () => {
  // USD LIST
  const [showDropdownSymbol, setDDSymbol] = useState<boolean>(false);

  const [inputSymbolsInDropdown, setSymbolsInDropdown] = useState([]);

  const [inputUSDAddress, setUSDAddress] = useState<string>(
    "Select USDC, USDT, USDP, DAI",
  );
  const [inputTokenAmount, setTokenAmount] = useState<string>("");

  //wagmi
  const { address, isConnected, chain } = useAccount();
  const { chains, switchChain } = useSwitchChain();
  const { data: hash, writeContract } = useWriteContract();
  const { data: contractCallDataConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Presale Contract
  const contractIDO = findContractInfo("presale");
  const [presaleTokenSymbol, setPresaleTokenSymbol] = useState("AQUA");

  // recode : i want to show the Symbols in the UI , not the addresses, then fetch address using symbol
  // no reason to fetch from contract
  const { data: inputUSDC } = usePresale("USD", [0]);
  const { data: inputUSDT } = usePresale("USD", [1]);
  const { data: inputUSDP } = usePresale("USD", [2]);
  const { data: inputDAI, isLoading: isUSD } = usePresale("USD", [3]);

  const { data: presaleTokenAddress } = usePresale("currentTokenSale", []);
  const { data: isPresalePaused } = usePresale("isPaused", []);
  const { data: maxAllocation } = usePresale("maxAllocation", []);
  const { data: priceInUSD } = usePresale("price", []);
  const { data: presaleOwner } = usePresale("presaleOwner", []);

  const percentOfTokens = useRef();

  // fix this ,  not hardcode
  const aqua_addr = findTokenAddressFromSymbol(
    presaleTokenSymbol ? presaleTokenSymbol : "AQUA",
  );
  const { data: tokenSupply } = useERC20Token(aqua_addr, "totalSupply", []); // $AQUA

  const { data: tokenSupplyRemaining } = useERC20Token(aqua_addr, "balanceOf", [
    contractIDO?.addr,
  ]); // $AQUA

  const loadTokenPresaleInfo = findTokenFromAddress(aqua_addr);

  const loadTokenUSDInfo = findTokenFromAddress(inputUSDAddress);

  useEffect(() => {
    if (inputTokenAmount) {
      console.log(" Input amounts changed ");
    }
  }, [inputTokenAmount]);

  useEffect(() => {
    if (presaleTokenAddress) {
      console.log("presale token address:", presaleTokenAddress);
      const token = findTokenFromAddress(presaleTokenAddress);
      setPresaleTokenSymbol(token?.symbol);
      setSymbolsInDropdown(["USDC", "USDT", "USDP", "DAI"]);
    

      if (tokenSupplyRemaining && tokenSupply) {
        percentOfTokens.current =
          Number((tokenSupplyRemaining * 10000n) / tokenSupply) / 100;
        console.log(" Percentage: ok ", percentOfTokens.current);
      }
    }
  }, [presaleTokenAddress, tokenSupplyRemaining, tokenSupply]);

  // setPresaleTokenSymbol

  // console.log(" inputToken Addresses: ", inputUSDAddress);

  const notify = () =>
    toast.success(`Token Created ${presaleTokenSymbol} from 🌊 AquasTrade!`, {
      position: "bottom-left",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });

  useEffect(() => {
    if (contractCallDataConfirmed) {
      notify();
    }
  }, [contractCallDataConfirmed]);

  const doTokenLaunch = () => {
    console.log(" Deploy Token with CA: ", contractIDO?.addr);

    writeContract({
      abi: PRESALE_ABI,
      address: contractIDO?.addr,
      functionName: "buy",
      args: [
        loadTokenUSDInfo?.addr,
        parseUnits(inputTokenAmount, loadTokenUSDInfo?.decimal),
      ],
    });
  };

  //   toast.error("Empty Room or Username field");

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

  return (
    <div>
      {address && chain && chain.id === CHAIN.id ? (
        <div>
          {" "}
          <div className={styles.container_flex}>
            {loadTokenPresaleInfo ? (
              <ul>
                <li>
                  <span className={styles.text_sm}> Name: </span>{" "}
                  {loadTokenPresaleInfo.name}{" "}
                </li>

                <li>
                  <span className={styles.text_sm}> Symbol :</span>{" "}
                  {loadTokenPresaleInfo.symbol}{" "}
                </li>

                <li>
                  <span className={styles.text_sm}> Max Supply:</span>
                  {tokenSupply ? formatUnits(tokenSupply, 18) : "0.0"}
                </li>

                <li>
                  <span className={styles.text_sm}> Presale Live:</span>
                  {isPresalePaused === false ? (
                    <span> LFG</span>
                  ) : (
                    <span>Coming Soon</span>
                  )}
                </li>

                <li>
                  <span className={styles.text_sm}> Max Allocation : </span>
                  {maxAllocation ? (
                    <span>
                      {" "}
                      {formatUnits(maxAllocation, 18)}{" "}
                      {loadTokenPresaleInfo.symbol}{" "}
                    </span>
                  ) : (
                    <span> </span>
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

                <span className={styles.text_border_bottom}>
                  {" "}
                  <Link
                    href={`https://elated-tan-skat.explorer.mainnet.skalenodes.com/address/${loadTokenPresaleInfo?.addr}`}
                    target={"_blank"}
                  >
                    Contract Details
                  </Link>{" "}
                </span>

                <li>
                  <span className={styles.text_sm}> CA :</span>{" "}
                  {loadTokenPresaleInfo.addr}{" "}
                </li>

                <li>
                  <span className={styles.text_sm}> CO :</span> {presaleOwner}{" "}
                </li>
              </ul>
            ) : (
              <span></span>
            )}
          </div>
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
                formatUnits(tokenSupplyRemaining, 18)}{" "}
            </span>
            {percentOfTokens.current && tokenSupply && loadTokenPresaleInfo ? (
              <Slider
                aria-label="Small steps"
                defaultValue={100 - percentOfTokens.current}
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
              onClick={handleMenuState}
              onChange={() => {
                setDDSymbol(false);
              }}
              className={styles.input_token_address}
            />{" "}
          </span>
          <span>
            {" "}
            {showDropdownSymbol && inputSymbolsInDropdown.length >= 1 && (
              <div className={styles.dropdownmenu}>
                {inputSymbolsInDropdown.map((item) => (
                  <div key={item} onClick={() => handleItemClick(item, 1)}>
                    <span className={styles.dropdownmenu_item}> {item}</span>{" "}
                    <span className={styles.dropdownmenu_item_image}>
                      {" "}
                      <Image
                        src={`/${item}.svg`}
                        alt="AquasTrade USD"
                        width={20}
                        height={20}
                        priority
                      />
                    </span>
                  </div>
                ))}
              </div>
            )}{" "}
          </span>
          <span className={styles.text_center}>
            <input
              type="text"
              placeholder="Input USD Amount"
              value={inputTokenAmount}
              onChange={(e) => setTokenAmount(e.target.value)}
              className={styles.input_token_address}
            />{" "}
          </span>
          {inputUSDAddress && inputTokenAmount ? (
            <TokenApprove
              props={[
                "allowance",
                inputUSDAddress,
                parseUnits(inputTokenAmount, loadTokenUSDInfo?.decimal),
                [address, contractIDO?.addr],
              ]}
            />
          ) : (
            <span> </span>
          )}
          {presaleTokenSymbol && isPresalePaused === false ? (
            <span className={styles.container_margin}>
              <button className={styles.button_presale} onClick={doTokenLaunch}>
                Buy {loadTokenPresaleInfo.symbol}
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
                  Input Values
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
