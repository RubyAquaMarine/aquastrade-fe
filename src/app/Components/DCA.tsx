// @ts-nocheck
"use client";
import React, { useState, ChangeEvent, useEffect, useRef } from "react";

import { Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  useAccount,
  useWriteContract,
  useBlock,
  useWaitForTransactionReceipt,
  useSwitchChain,
} from "wagmi";
import { formatUnits, parseUnits, parseEther } from "viem";
import {
  CHAIN,
  poolsAtAqua,
  poolsAtRuby,
  poolsAtSushi,
  uniswapRouters,
} from "@/app/Utils/config";
import { findContractInfo } from "@/app//Utils/findTokens";
import styles from "@/app/Styles/DCA.module.css";

import { DCA_ABI } from "@/app/Abi/dca";

import {
  findTokenAddressFromSymbol,
  findTokenDecimalsFromSymbol,
} from "@/app/Utils/findTokens";

import TokenApprove from "@/app/Components/TokenApprove";

// need this address for the smart contract
const routerAddressList: string[] = uniswapRouters.map((router) => {
  return router.addr;
});

// show this to the user : when changed, use the router address
const routerName: string[] = uniswapRouters.map((router) => {
  return router.name;
});

export interface Wallet {
  wallet?: `0x${string}`;
}

export interface Amount {
  amount?: string;
}

const DCAInterface: React.FC = () => {
  const [inputIsBuying, setInputIsBuying] = useState(false);

  // drop down menus
  const [showDropdownRouter, setDDRouter] = useState(false);
  const [showDropdownPool, setDDPool] = useState(false);

  const [inputSymbolList, setSymbolList] = useState([]);
  // copy the object for later use : change to useRef later
  const [inputPoolData, setPoolData] = useState([]);

  // allow switching from different AMM Routers
  const [inputRouter, setRouter] = useState<string>(
    "0x698EA133CBA3BACD4aA6405411d8e8c1726D5f61",
  );
  const [inputRouterName, setRouterName] = useState<string>("Aquas.Trade");

  // Dropdown menu of pool addresses or use the
  const [inputPoolAddress, setPoolAddress] = useState<string>(
    "0x7CE47dA2789267B254e243e45A216Ef6897E5840",
  );

  const [inputPoolSymbol, setPoolSymbol] = useState<string>("ETH-USD");

  const [inputTokenA, setTokenA] = useState<string>("");
  const [inputTokenB, setTokenB] = useState<string>("");

  const [inputSwapSpeed, setSwapSpeed] = useState<string>("");
  const [inputInvestmentDuration, setInvestmentDuration] = useState<string>("");

  const [inputMinPrice, setMinPrice] = useState<string>("");
  const [inputMaxPrice, setMaxPrice] = useState<string>("");

  const [inputTokenAmount, setTokenAmount] = useState<string>("");

  const setAirdropped = useRef(true);

  //wagmi
  const { address, isConnected, chain } = useAccount();
  const { chains, switchChain } = useSwitchChain();
  const { data: hash, writeContract } = useWriteContract();
  const { data: contractCallDataConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // get contracts or assets
  const contractDCAMulti = findContractInfo("dcamulti");
  const token_address_aqua = findTokenAddressFromSymbol("AQUA");
  const tokenAddress_a = findTokenAddressFromSymbol(inputTokenA);
  const tokenAddress_b = findTokenAddressFromSymbol(inputTokenB);
  const token_decimal_a = findTokenDecimalsFromSymbol(inputTokenA);
  const token_decimal_b = findTokenDecimalsFromSymbol(inputTokenB);

  // when inputPoolSymbol changes,  need to update the inputPoolAddress

  useEffect(() => {
    if (inputPoolData.length >= 1 && inputPoolSymbol) {
      console.log("inputPoolSymbol changed ", inputPoolSymbol);
      console.log(
        "inputPoolSymbol changed :  inputPoolData ",
        inputPoolData[0],
      );

      inputPoolData.map((pool) => {
        pool.symbol === inputPoolSymbol
          ? setTokenA(pool.tokenA) &
            setTokenB(pool.tokenB) &
            setPoolAddress(pool.addr)
          : "0";
      });
    }

    console.log("inputPoolSymbol changed token A ", inputTokenA);

    console.log("inputPoolSymbol changed token B", inputTokenB);

    console.log("inputPoolAddress", inputPoolAddress);
  }, [inputPoolSymbol, inputPoolData]);

  // Switching the router should prompt fetching the
  //   setPoolData(poolsAtAqua);
  useEffect(() => {
    if (inputRouterName) {
      let routerID;
      console.log("Router Selected ", inputRouterName);
      // make a function to make the routername to the address of rotuer

      if (inputRouterName === "Aquas.Trade") {
        setPoolData(poolsAtAqua);
        const list: string[] = poolsAtAqua.map((pool) => {
          return pool.symbol;
        });
        setSymbolList(list);
        routerID = 0;
      }
      if (inputRouterName === "Ruby.Exchange") {
        setPoolData(poolsAtRuby);
        const list: string[] = poolsAtRuby.map((pool) => {
          return pool.symbol;
        });
        setSymbolList(list);
        routerID = 1;
      }
      if (inputRouterName === "Sushi.com") {
        setPoolData(poolsAtSushi);
        const list: string[] = poolsAtSushi.map((pool) => {
          return pool.symbol;
        });
        setSymbolList(list);
        routerID = 2;
      }

      setRouter(routerAddressList[routerID]);
    }
  }, [inputRouterName]);

  useEffect(() => {
    if (contractCallDataConfirmed) {
      // todo toast
      notify();
      // reset airdrop and fetch new balances
      setAirdropped.current = true;
    }
  }, [contractCallDataConfirmed]);

  const notify = () =>
    toast.success(`DCA TX from 🌊 AquasTrade!`, {
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

  const handleMenuStateRouter = () => {
    setDDRouter(!showDropdownRouter);
  };

  const handleMenuStatePool = () => {
    setDDPool(!showDropdownPool);
  };

  // need a function to set the Router based on the selected routerName
  const handleItemClick = (item: string, _switch: number) => {
    switch (_switch) {
      case 0:
        setRouterName(item);
        setPoolSymbol('ETH-USD');// defaults to this symbol each time the router changes
        setDDRouter(false); // change the dropdown menu state : close the menu
        break;

      case 1:
        // setPoolAddress(item);
        setPoolSymbol(item);
        setDDPool(false); // change the dropdown menu state : close the menu
        break;
    }
  };

  const submitDCAOrder = (index: number) => {
    // fixed bug : BUYING TOKEN QUOTE means you are using the decimals from token B for the input amount
    const dec = inputIsBuying ? token_decimal_b : token_decimal_a;
    const data = [
      inputRouter,
      tokenAddress_a,
      tokenAddress_b,

      BigInt(inputSwapSpeed),
      BigInt(inputInvestmentDuration),
      parseEther(inputMinPrice),
      parseEther(inputMaxPrice),
      parseUnits(inputTokenAmount, dec),
      inputIsBuying,
    ];
    console.log("Sumbit DCA Order: data input: ", data);
    // todo : need to figure out the LastPoolPrice value (show in UI first)
    switch (index) {
      case 0:
        writeContract({
          abi: DCA_ABI,
          address: contractDCAMulti.addr,
          functionName: "SubmitDCAOrder",
          args: data,
        });
        break;
    }
  };

  const submitDeleteOrder = (_storageID: bigint, _id: bigint) => {
    const dec = inputIsBuying ? token_decimal_b : token_decimal_a;
    const data = [_storageID, _id];
    console.log("Sumbit DCA Order: data input: ", data);
    // todo : need to figure out the LastPoolPrice value (show in UI first)
    writeContract({
      abi: DCA_ABI,
      address: contractDCAMulti.addr,
      functionName: "DeleteOrder",
      args: data,
    });
  };

  console.log(
    ` InputSymbolList  ${inputSymbolList}  | inputPoolData ${inputPoolData.toString()}  is buying  ${inputIsBuying} isRouter ${inputRouter} isTokensAddresses ${tokenAddress_a} ${tokenAddress_b}  amounts ${inputTokenAmount}`,
  );

  return (
    <div>
      {address && chain && chain.id === CHAIN.id ? (
        <div>
          <span className={styles.text_center}> Select DEX </span>
          <span className={styles.text_center}>
            {" "}
            <input
              type="text"
              value={inputRouterName}
              onClick={handleMenuStateRouter}
              className={styles.input_token_address}
            />{" "}
          </span>

          <span className={styles.text_center}>
            {" "}
            {showDropdownRouter && routerName.length >= 1 && (
              <div className={styles.dropdownmenu}>
                {routerName.map((item) => (
                  <div key={item} onClick={() => handleItemClick(item, 0)}>
                    {item}
                  </div>
                ))}
              </div>
            )}{" "}
          </span>

          <span className={styles.text_center}> Select AMM Pool</span>
          <span className={styles.text_center}>
            {" "}
            <input
              type="text"
              value={inputPoolSymbol}
              onClick={handleMenuStatePool}
              onChange={() => {
                setDDPool(false);
              }}
              className={styles.input_token_address}
            />{" "}
          </span>

          <span className={styles.text_center}>
            {" "}
            {showDropdownPool && inputSymbolList.length >= 1 && (
              <div className={styles.dropdownmenu}>
                {inputSymbolList.map((item) => (
                  <div key={item} onClick={() => handleItemClick(item, 1)}>
                    {item}
                  </div>
                ))}
              </div>
            )}{" "}
          </span>

          <span className={styles.text_center}>
            <span className={styles.column}>
              {" "}
              Buying {inputTokenA} ? {" : "}{" "}
            </span>
            <span className={styles.column}>
              {" "}
              <input
                type="checkbox"
                onChange={(e) =>
                  setInputIsBuying(e.target.value === "on" ? true : false)
                }
              />
            </span>
          </span>
          <span className={styles.text_center}>
            <input
              type="text"
              placeholder="Input Token Amount"
              value={inputTokenAmount}
              onChange={(e) => setTokenAmount(e.target.value)}
              className={styles.input_token_address}
            />{" "}
          </span>

          <p>
            {contractDCAMulti && inputTokenAmount ? (
              <TokenApprove
                props={[
                  "allowance",
                  inputIsBuying ? tokenAddress_b : tokenAddress_a,
                  parseUnits(
                    inputTokenAmount,
                    inputIsBuying ? token_decimal_b : token_decimal_a,
                  ),
                  [
                    address,
                    contractDCAMulti.addr,
                    inputIsBuying ? token_decimal_b : token_decimal_a,
                  ],
                ]}
              ></TokenApprove>
            ) : (
              <span> </span>
            )}
          </p>

          <p>
            {contractDCAMulti &&
            inputIsBuying &&
            tokenAddress_b !== token_address_aqua ? (
              <span>
                {" "}
                <span className={styles.text_center}>
                  Approve 1 AQUA (fee){" "}
                </span>{" "}
                <span>
                  {" "}
                  <TokenApprove
                    props={[
                      "allowance",
                      token_address_aqua,
                      parseEther("1.0"),
                      [address, contractDCAMulti.addr, 18],
                    ]}
                  ></TokenApprove>{" "}
                </span>
              </span>
            ) : (
              <span> </span>
            )}

            {contractDCAMulti &&
            !inputIsBuying &&
            tokenAddress_a !== token_address_aqua ? (
              <span className={styles.text_center}>
                <TokenApprove
                  props={[
                    "allowance",
                    token_address_aqua,
                    parseEther("1.0"),
                    [address, contractDCAMulti.addr, 18],
                  ]}
                ></TokenApprove>
              </span>
            ) : (
              <span> </span>
            )}
          </p>
          <span className={styles.text_center}>
            {" "}
            <input
              type="text"
              placeholder="Swap speed in Seconds"
              value={inputSwapSpeed}
              onChange={(e) => setSwapSpeed(e.target.value)}
              className={styles.input_token_address}
            />{" "}
          </span>

          <span className={styles.text_center}>
            {" "}
            <input
              type="text"
              placeholder="Duration in Hours"
              value={inputInvestmentDuration}
              onChange={(e) => setInvestmentDuration(e.target.value)}
              className={styles.input_token_address}
            />
          </span>

          <span className={styles.text_center}>
            {" "}
            <input
              type="text"
              placeholder="Lowest Price"
              value={inputMinPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className={styles.input_token_address}
            />{" "}
          </span>

          <span className={styles.text_center}>
            {" "}
            <input
              type="text"
              placeholder="Highest Price"
              value={inputMaxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className={styles.input_token_address}
            />
          </span>

          <span className={styles.text_center}>
            {" "}
            <button
              className={styles.button_field}
              onClick={() => submitDCAOrder(0)}
            >
              {" "}
              Submit DCA Order{" "}
            </button>
          </span>

          <span className={styles.text_center}>User Data </span>

          <span className={styles.text_center}>
            {" "}
            <button
              className={styles.button_detailed}
              onClick={() => submitDeleteOrder(BigInt(4), BigInt(3))}
            >
              Delete Order
            </button>
            -
            <button
              className={styles.button_detailed}
              onClick={() => submitDeleteOrder(BigInt(4), BigInt(17))}
            >
              Delete Order
            </button>
          </span>
        </div>
      ) : (
        <div>connect wallet</div>
      )}
    </div>
  );
};

export default DCAInterface;
