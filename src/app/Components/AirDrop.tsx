// @ts-nocheck
"use client";
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
import { CHAIN } from "@/app/Utils/config";
import { findContractInfo } from "@/app//Utils/findTokens";
import TokenBalance from "@/app/Components/TokenBalance";
import TokenApprove from "@/app/Components/TokenApprove";
import { AIRDROP_ABI } from "@/app/Abi/airdropErc20";
import styles from "@/app/Styles/Airdrop.module.css";

import { findTokenAddressFromSymbol } from "@/app/Utils/findTokens";

export interface Wallet {
  wallet?: `0x${string}`;
}

export interface Amount {
  amount?: string;
}

const AirDrop: React.FC = () => {
  //test
  const [inputValue, setInputValue] = useState<string>("");

  // updates via function parseEthAmounts()
  const setAirdropped = useRef(true);
  const isCommaAtEndOfAmounts = useRef(false);

  // Token Approval amount and function
  // updates via function parseEthAmounts()
  const setTotalAmounts = useRef(BigInt(0));
  // todo decimals
  const tokenADecimal = useRef(BigInt(18));

  const totalWallets = useRef();
  const totalAmounts = useRef();
  // const tokenBDecimal = useRef(BigInt(18));

  // Token Address that user inputs
  const [token, setAirdropToken] = useState("");

  // enter symbol to get token address
  const [tokenSymbol, setAirdropTokenSymbol] = useState("");

  // Original Input from user is in string format : will be parsed later
  const [tokenAddressList, setTokenAddresses] = useState<Wallet>();
  const [tokenAmount, setTokenAmount] = useState<Amount>();

  //wagmi
  const { address, isConnected, chain } = useAccount();
  const { chains, switchChain } = useSwitchChain();
  const { data: hash, writeContract } = useWriteContract();
  const { data: contractCallDataConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const contractAirdrop = findContractInfo("airdrop");

  const notify = () =>
    toast.success(
      `Airdropped ${tokenSymbol} to ${totalWallets.current} wallets from 🌊 AquasTrade!`,
      {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      },
    );

  console.log(
    " Airdrop status: ",
    setAirdropped.current,
    " ready: ",
    isCommaAtEndOfAmounts.current,
  );

  useEffect(() => {
    if (contractCallDataConfirmed) {
      console.log("POP UP HERE");
      // todo toast
      notify();
      // reset airdrop and fetch new balances
      setAirdropped.current = true;
    }
  }, [contractCallDataConfirmed]);

  // renders for ui
  // todo bug
  useEffect(() => {
    if (tokenAmount) {
      setAirdropped.current = false;

      const testT = tokenAmount as string;
      const testTT = testT.concat(",");

      console.log(
        " Token input amounts changed ",
        tokenAmount,
        " test with extra ,  : ",
        testTT,
      );

      const bug: string = tokenAmount as string;
      parseEthAmounts(bug);
    }

    if (tokenAddressList) {
      const bug: string = tokenAddressList as string;
      parseEthAddresses(bug);
    }

    // get the token address from using the symbol
    if (tokenSymbol) {
      const token_address = findTokenAddressFromSymbol(
        tokenSymbol,
      ) as unknown as `0x${string}`;
      console.log("Set the Address from Symbol ", token_address, tokenSymbol);
      setAirdropToken(token_address);
    }
  }, [tokenAmount, tokenSymbol, tokenAddressList]);

  const stringEndWithComma = (e: string) => {
    isCommaAtEndOfAmounts.current = true;
  };

  function isLastCharacterComma(input: string): boolean {
    // Check if the input string is not empty and the last character is a comma
    return input.trim() !== "" && input.trim().slice(-1) === ",";
  }

  // filter with regex
  const handleInputAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e;
    // Check if the input matches the allowed pattern
    if (/^[0-9.,]*$/.test(value)) {
      isCommaAtEndOfAmounts.current = isLastCharacterComma(value);

      // if true, show instructions

      setTokenAmount(value);
      setInputValue(value);

      console.log(
        "handleInputAmountChange: ",
        value,
        isCommaAtEndOfAmounts.current,
      );
    }
  };

  // runs the data again before submitting
  const doAirdrop = () => {
    setAirdropped.current = true;

    const amounts = parseEthAmounts(tokenAmount as string);
    const addresses = parseEthAddresses(tokenAddressList as string);
    if (
      token &&
      addresses?.length !== 0 &&
      addresses?.length === amounts?.length
    ) {
      writeContract({
        abi: AIRDROP_ABI,
        address: contractAirdrop?.addr,
        functionName: "doAirdrop",
        args: [token as `0x${string}`, addresses as `0x${string}`[], amounts],
      });
    }
  };

  function parseEthAddresses(addressString: string): string[] {
    // Split the addressString by commas to get individual addresses
    if (addressString) {
      const addresses: string[] = addressString.split(",");
      // Trim whitespace from each address and push it into a new array
      const formattedAddresses: string[] = [];
      addresses.forEach((address) => {
        const trimmedAddress = address.trim();
        if (trimmedAddress.length > 0) {
          formattedAddresses.push(trimmedAddress);
        }
      });

      totalWallets.current = formattedAddresses?.length;

      return formattedAddresses;
    }
  }

  // todo , make a sum = total amount to approve to pass down into props
  function parseEthAmounts(addressString: string): bigint[] {
    let sumOf: bigint = BigInt(0);

    if (addressString) {
      // Split the addressString by commas to get individual addresses
      const addresses: string[] = addressString.split(",");
      // Trim whitespace from each address and push it into a new array
      const formattedAddresses: bigint[] = [];
      addresses.forEach((address) => {
        const trimmedAddress = address.trim();
        if (trimmedAddress.length > 0) {
          let valueIs = parseUnits(trimmedAddress, 18); // do to , pass in decimals
          sumOf = valueIs + sumOf;
          formattedAddresses.push(valueIs);
        }
      });

      setTotalAmounts.current = sumOf;
      totalAmounts.current = formattedAddresses?.length;
      return formattedAddresses;
    }
  }

  const handleToEuropa = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    targetChainId: number,
  ) => {
    if (chain) {
      if (chain.id !== targetChainId) {
        event.preventDefault();
        // @ts-ignore: Unreachable code error
        switchChain({ chainId: targetChainId });
      }
    }
  };

  //   toast.error("Empty Room or Username field");

  return (
    <div>
      {address && chain && chain.id === CHAIN.id ? (
        <div>
          {" "}
          <input
            type="text"
            placeholder="Token Address to Airdrop"
            value={token}
            onChange={(e) => setAirdropToken(e.target.value)}
            className={styles.input_token_address}
          />
          <input
            type="text"
            placeholder="or input token symbol such as ETH, BTC, SKL, AQUA, etc"
            value={tokenSymbol}
            onChange={(e) => setAirdropTokenSymbol(e.target.value)}
            className={styles.input_token_address}
          />
          <div className={styles.container_margin}>
            {setAirdropped.current === false &&
            setTotalAmounts.current !== BigInt(0) &&
            token ? (
              <TokenApprove
                props={[
                  "allowance",
                  token,
                  setTotalAmounts.current,
                  [address, contractAirdrop?.addr],
                ]}
              />
            ) : (
              <span></span>
            )}

            {setAirdropped.current === true &&
            isConnected &&
            token &&
            address ? (
              <TokenBalance props={[token, 18, address]} />
            ) : (
              <span></span>
            )}
          </div>
          <input
            type="text"
            placeholder="Address List"
            value={tokenAddressList}
            onChange={(e) => setTokenAddresses(e.target.value)}
            className={styles.input_address}
          />
          {isCommaAtEndOfAmounts.current === true ||
          typeof totalAmounts.current === "undefined" ? (
            <span></span>
          ) : (
            <span className={styles.text_center_warning}>
              add one more {'"'} {","} {'"'} after the last digit
            </span>
          )}
          <input
            type="text"
            placeholder="Amount List"
            value={tokenAmount}
            onChange={(e) => handleInputAmountChange(e.target.value)}
            className={styles.input_address}
          />
          {/** todo: add decimal support : Add the number of wallets for user */}
          {totalWallets.current === totalAmounts.current ? (
            <span></span>
          ) : (
            <span className={styles.text_center_warning}>
              Wallets must equal Amounts
            </span>
          )}
          <p className={styles.container_margin}>
            {" "}
            <p>Wallets: {totalWallets.current}</p>{" "}
            <p>Amounts: {totalAmounts.current}</p>{" "}
            <span>
              {" "}
              Total Amount: {formatUnits(setTotalAmounts.current, 18)}
            </span>
          </p>
          {setTotalAmounts.current ? (
            <span>
              {isCommaAtEndOfAmounts.current === true ? (
                <span>
                  <button className={styles.airdrop} onClick={doAirdrop}>
                    {" "}
                    Airdrop{" "}
                    {formatUnits(
                      setTotalAmounts.current,
                      Number(tokenADecimal.current),
                    )}{" "}
                    to Community{" "}
                  </button>
                </span>
              ) : (
                <span>
                  <button
                    className={styles.airdrop_warning}
                    onClick={doAirdrop}
                  >
                    Fix Amount List
                  </button>
                </span>
              )}
            </span>
          ) : (
            <span className={styles.airdrop}>Complete Form</span>
          )}
        </div>
      ) : (
        <div>
          <p>Please select ChainID: 2046399126</p>
          <button
            onClick={(event) => handleToEuropa(event, 2046399126)}
            className={styles.toggleButtonEuropa}
          >
            Switch Network
          </button>
        </div>
      )}

      <span>
        <ToastContainer />
      </span>
    </div>
  );
};

export default AirDrop;
