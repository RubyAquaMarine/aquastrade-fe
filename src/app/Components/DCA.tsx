// @ts-nocheck
"use client";
import Link from "next/link";
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
import { formatUnits, parseUnits } from "viem";

import {
  findTokenAddressFromSymbol,
  findTokenDecimalsFromSymbol,
  findContractInfo,
  findTokenFromSymbol,
} from "@/app/Utils/findTokens";
import {
  CHAIN,
  poolsAtAqua,
  poolsAtRuby,
  poolsAtSushi,
  uniswapRouters,
} from "@/app/Utils/config";

import PoolPrice from "@/app/Components/PoolPrice";
import TokenApproveProps from "@/app/Components/TokenApproveProps";
import DCATotalOrders from "@/app/Components/DCATotalOrders";
import { DCA_ABI } from "@/app/Abi/dca";
import { useDCA } from "@/app/Hooks/useDCA";

import { useSkaleExplorer } from "@/app/Hooks/useSkaleExplorer";
import { useAquaFeed } from "@/app/Hooks/useAquaFeed";

import styles from "@/app/Styles/DCA.module.css";

// need this address for the smart contract
const routerAddressList: string[] = uniswapRouters.map((router) => {
  return router.address;
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
  const [inputDCAFeatures, setDCAFeature] = useState<string>("submit");

  const [inputIsBuying, setInputIsBuying] = useState<boolean>(false);

  // drop down menus
  const [showDropdownRouter, setDDRouter] = useState<boolean>(false);
  const [showDropdownPool, setDDPool] = useState<boolean>(false);

  const [inputSymbolList, setSymbolList] = useState([]);
  // copy the object for later use : change to useRef later
  const [inputPoolData, setPoolData] = useState([]);

  // allow switching from different AMM Routers
  const [inputRouterAddress, setRouter] = useState<string>(
    "0x698EA133CBA3BACD4aA6405411d8e8c1726D5f61",
  );
  const [inputRouterName, setRouterName] = useState<string>("Aquas.Trade");

  // Dropdown menu of pool addresses or use the
  const [inputPoolAddress, setPoolAddress] = useState<string>();

  const [inputPoolSymbol, setPoolSymbol] = useState<string>("ETH-USD");

  const [inputTokenA, setTokenA] = useState<string>("");
  const [inputTokenB, setTokenB] = useState<string>("");

  const [inputSwapSpeed, setSwapSpeed] = useState<number>(1);
  const [inputInvestmentDuration, setInvestmentDuration] = useState<number>(24);

  const [inputMinPrice, setMinPrice] = useState<string>("0.1");
  const [inputMaxPrice, setMaxPrice] = useState<string>("60000");

  const [inputTokenAmount, setTokenAmount] = useState<string>();

  const [inputTokenABalance, setTokenABalance] = useState(null);
  const [inputTokenBBalance, setTokenBBalance] = useState(null);

  //wagmi
  const { address, isConnected, chain } = useAccount();
  const { chains, switchChain } = useSwitchChain();
  const { data: hash, writeContract } = useWriteContract();
  const { data: contractCallDataConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const walletTokenList = useSkaleExplorer(address);

  // get contracts or assets
  const contractDCAMulti = findContractInfo("dcamulti");
  const token_address_aqua = findTokenFromSymbol("AQUA");
  // todo : refactor to findTokenFrom
  const tokenAddress_a = findTokenAddressFromSymbol(inputTokenA);
  const tokenAddress_b = findTokenAddressFromSymbol(inputTokenB);
  const token_decimal_a = findTokenDecimalsFromSymbol(inputTokenA);
  const token_decimal_b = findTokenDecimalsFromSymbol(inputTokenB);

  // NEW
  const { data: globalID, isLoading, isError } = useDCA("GlobalID");

  // when inputPoolSymbol changes,  need to update the inputPoolAddress

  useEffect(() => {
    if (inputPoolData.length >= 1 && inputPoolSymbol) {
      // console.log("inputPoolSymbol changed ", inputPoolSymbol);
      // console.log(
      //   "inputPoolSymbol changed :  inputPoolData ",
      //   inputPoolData[0],
      // );

      inputPoolData.map((pool) => {
        pool.symbol === inputPoolSymbol
          ? setTokenA(pool.tokenA) &
            setTokenB(pool.tokenB) &
            setPoolAddress(pool.address)
          : "0";
      });
    }

    // console.log("inputPoolSymbol changed token A ", inputTokenA);
    // console.log("inputPoolSymbol changed token B", inputTokenB);
    // console.log("inputPoolAddress", inputPoolAddress);
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
    if (tokenAddress_a && tokenAddress_b) {
      // Probably not done
      const testBalance = handleWalletBalance();

      setTokenABalance(testBalance[0]);
      setTokenBBalance(testBalance[1]);

      console.log("token A  Balance ", testBalance[0]);
      console.log("token B  Balance ", testBalance[1]);
    }
  }, [tokenAddress_a, tokenAddress_b]);

  useEffect(() => {
    if (contractCallDataConfirmed) {
      const isLink = `https://elated-tan-skat.explorer.mainnet.skalenodes.com/tx/${hash}`;
      notify(isLink);
    }
  }, [contractCallDataConfirmed, hash]);

  const CustomToastWithLink = (_url: string) => (
    <div>
      <Link href={_url} target="_blank">
        DCA Order Tx Hash on 🌊 AquasTrade
      </Link>
    </div>
  );

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
        setPoolSymbol("ETH-USD"); // defaults to this symbol each time the router changes
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
      inputRouterAddress,
      tokenAddress_a,
      tokenAddress_b,

      BigInt(inputSwapSpeed * 60), // convert seconds to minutes
      BigInt(inputInvestmentDuration),

      parseUnits(inputMinPrice, dec), // The bug
      parseUnits(inputMaxPrice, dec),

      parseUnits(inputTokenAmount, dec),
      inputIsBuying,
    ];
    console.log("Sumbit DCA Order: data input: ", data);
    // todo : need to figure out the LastPoolPrice value (show in UI first)
    switch (index) {
      case 0:
        writeContract({
          abi: DCA_ABI,
          address: contractDCAMulti.address,
          functionName: "SubmitDCAOrder",
          args: data,
        });
        break;
    }
  };

  // switch checkbox
  const handleCheckboxChange = () => {
    setInputIsBuying(!inputIsBuying);
  };

  // todo :refactor : move to child component
  const handleWalletBalance = () => {
    let saveBalanceA, saveBalanceB;
    if (walletTokenList && tokenAddress_a && tokenAddress_b) {
      walletTokenList.forEach((element) => {
        if (
          element.contractAddress.toUpperCase() === tokenAddress_a.toUpperCase()
        ) {
          saveBalanceA = element;
        }
      });
      //----
      walletTokenList.forEach((element) => {
        if (
          element.contractAddress.toUpperCase() === tokenAddress_b.toUpperCase()
        ) {
          saveBalanceB = element;
        }
      });
    }
    return [saveBalanceA, saveBalanceB];
  };

  return (
    <div>
      {address && chain && chain.id === CHAIN.id ? (
        <div>
          <div className={styles.container}>
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
          </div>

          <span className={styles.text_center}>
            <span className={styles.column}>
              Buying {inputTokenA} {" : "}
            </span>
            <span className={styles.column}>
              <input
                type="checkbox"
                checked={inputIsBuying}
                onChange={handleCheckboxChange}
              />
            </span>
          </span>

          {/** Show the wallet balance of the two tokens within the Pair */}

          {inputPoolAddress ? (
            <span>
              {" "}
              <span className={styles.text_center}>
                <span className={styles.column_balance}>
                  {inputTokenA} {" : "}
                </span>
                <span className={styles.column_balance}>
                  {inputTokenABalance &&
                    parseFloat(
                      formatUnits(
                        inputTokenABalance.balance,
                        inputTokenABalance.decimals,
                      ),
                    ).toFixed(8)}
                </span>
              </span>
              <span className={styles.text_center}>
                <span className={styles.column_balance}>
                  {inputTokenB} {" : "}
                </span>
                <span className={styles.column_balance}>
                  {inputTokenBBalance &&
                    parseFloat(
                      formatUnits(
                        inputTokenBBalance.balance,
                        inputTokenBBalance.decimals,
                      ),
                    ).toFixed(8)}
                </span>
              </span>{" "}
            </span>
          ) : (
            <span> </span>
          )}

          <div className={styles.container}>
            <span className={styles.text_center}>
              <input
                type="number"
                placeholder="Input Token Amount"
                value={Number(inputTokenAmount)}
                onChange={(e) =>
                  setTokenAmount(
                    e.target.value === "string"
                      ? Number(e.target.value)
                      : e.target.value,
                  )
                }
                className={styles.input_token_address}
              />{" "}
            </span>

            <span className={styles.text_center_sm}>Approved:</span>

            {/** figure out some locig that allows adding one AQUA to the approval amount when selling AQUA for the QUOTE asset  */}

            {contractDCAMulti &&
              inputTokenAmount &&
              tokenAddress_b !== token_address_aqua?.address && (
                <TokenApproveProps
                  {...{
                    name: "allowance",
                    address: inputIsBuying ? tokenAddress_b : tokenAddress_a,
                    approve: parseUnits(
                      inputTokenAmount,
                      inputIsBuying ? token_decimal_b : token_decimal_a,
                    ),
                    args: [
                      address,
                      contractDCAMulti.address,
                      inputIsBuying ? token_decimal_b : token_decimal_a,
                    ],
                  }}
                ></TokenApproveProps>
              )}
            {/** adding one AQUA to the approval amount when selling AQUA for the QUOTE asset  */}
            {contractDCAMulti &&
              inputTokenAmount &&
              tokenAddress_b === token_address_aqua?.address && (
                <TokenApproveProps
                  {...{
                    name: "allowance",
                    address: inputIsBuying ? tokenAddress_b : tokenAddress_a,
                    approve:
                      parseUnits(
                        inputTokenAmount,
                        inputIsBuying ? token_decimal_b : token_decimal_a,
                      ) + BigInt(1000000000000000000n),
                    args: [
                      address,
                      contractDCAMulti.address,
                      inputIsBuying ? token_decimal_b : token_decimal_a,
                    ],
                  }}
                ></TokenApproveProps>
              )}

            {contractDCAMulti &&
            inputIsBuying &&
            tokenAddress_b !== token_address_aqua?.address ? (
              <span>
                {" "}
                <span className={styles.text_center}>
                  Approve 1 AQUA (fee){" "}
                </span>{" "}
                <span>
                  <TokenApproveProps
                    {...{
                      name: "allowance",
                      address: token_address_aqua?.address,
                      approve: parseUnits("1.0", token_address_aqua?.decimals),
                      args: [
                        address,
                        contractDCAMulti.address,
                        token_address_aqua?.decimals,
                      ],
                    }}
                  ></TokenApproveProps>
                </span>
              </span>
            ) : (
              <span> </span>
            )}

            {contractDCAMulti &&
            !inputIsBuying &&
            tokenAddress_a !== token_address_aqua?.address ? (
              <span className={styles.text_center}>
                <TokenApproveProps
                  {...{
                    name: "allowance",
                    address: token_address_aqua?.address,
                    approve: parseUnits("1.0", token_address_aqua?.decimals),
                    args: [
                      address,
                      contractDCAMulti.address,
                      token_address_aqua?.decimals,
                    ],
                  }}
                ></TokenApproveProps>
              </span>
            ) : (
              <span> </span>
            )}
          </div>

          <span className={styles.text_center}>
            {" "}
            <button
              className={styles.button_field}
              onClick={() => submitDCAOrder(0)}
            >
              {" "}
              Submit Order{" "}
            </button>
          </span>

          <div className={styles.container}>
            <span className={styles.text_center}>
              {" "}
              <button
                className={styles.button_border_bottom}
                onClick={() =>
                  inputDCAFeatures !== "advanced"
                    ? setDCAFeature("advanced")
                    : setDCAFeature("submit")
                }
              >
                {" "}
                DCA Settings
              </button>
            </span>

            {inputDCAFeatures === "advanced" ? (
              <p>
                {" "}
                <span className={styles.text_center_sm}>
                  {" "}
                  Swap Speed: minutes{" "}
                </span>
                <span className={styles.text_center}>
                  {" "}
                  <input
                    type="number"
                    min={1}
                    value={inputSwapSpeed}
                    onChange={(e) => setSwapSpeed(Number(e.target.value))}
                    className={styles.input_token_address}
                  />{" "}
                </span>
                <span className={styles.text_center_sm}>
                  {" "}
                  Investment Duration: hours{" "}
                </span>
                <span className={styles.text_center}>
                  {" "}
                  <input
                    type="number"
                    min={1}
                    value={inputInvestmentDuration}
                    onChange={(e) =>
                      setInvestmentDuration(Number(e.target.value))
                    }
                    className={styles.input_token_address}
                  />
                </span>
                <span className={styles.text_center_sm}> Minimum Price </span>
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
                <span className={styles.text_center_sm}> Maximum Price</span>
                <span className={styles.text_center}>
                  {" "}
                  <input
                    type="text"
                    placeholder="Highest Price"
                    value={inputMaxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className={styles.input_token_address}
                  />
                </span>{" "}
                {/** */}
                <span className={styles.text_center_sm}>
                  {inputPoolAddress && token_decimal_b ? (
                    <span>
                      {" "}
                      PoolPrice:{" "}
                      <PoolPrice
                        {...{
                          id: inputPoolAddress,
                          pool: inputPoolAddress,
                          base_decimal: token_decimal_b,
                        }}
                      ></PoolPrice>{" "}
                    </span>
                  ) : (
                    <span> </span>
                  )}
                </span>
              </p>
            ) : (
              <p> </p>
            )}
          </div>

          <div className={styles.container}>
            <span className={styles.text_center}>
              {" "}
              <button
                className={styles.button_border_bottom}
                onClick={() =>
                  inputDCAFeatures !== "orders"
                    ? setDCAFeature("orders")
                    : setDCAFeature("submit")
                }
              >
                {" "}
                Current Orders
              </button>
            </span>

            {inputDCAFeatures === "orders" && globalID && (
              <span>
                <DCATotalOrders props={{ globalID: globalID }} />
              </span>
            )}
          </div>
        </div>
      ) : (
        <div>connect wallet</div>
      )}
    </div>
  );
};

export default DCAInterface;
