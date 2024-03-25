// @ts-nocheck
"use client";
import { useConfig, useCall } from "@usedapp/core";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { Contract } from "@ethersproject/contracts";
import abiRouter from "./router.json";
import abiFactory from "./factory.json";
import abiPair from "./pairs.json";
import abiERC20 from "./erc20.json";

import { parseUnits } from "ethers/lib/utils";
const FACTORY_ADDRESS = "0x71f7BbbB33550fa5d70CA3F7eeAD87529f2DC3C8"; //todo : not being used

let saveRouter = "";

async function getRouterAddress(mock) {
  if (mock) {
    saveRouter = mock;
    return saveRouter;
  }
  if (saveRouter != "") {
    return saveRouter;
  }
}

export async function loadPoolsWithWETHAddress(routerAddress, providerUrl) {
  await getRouterAddress(routerAddress);

  const provider = new Web3.providers.HttpProvider(providerUrl);
  const web3 = new Web3(provider);

  const routerInfo = await getRouterInfo(routerAddress, web3); // Returns the Factory address

  if (routerInfo) {
    const factoryInfo = await getFactoryInfo(routerInfo.factory, web3);

    return {
      pools: factoryInfo.pairsInfo,
      //
    };
  }
}

export async function getRouterInfo(routerAddress, web3) {
  console.log("getRouterInfo: Address: ", routerAddress);
  if (routerAddress) {
    const router = new web3.eth.Contract(abiRouter, routerAddress);
    return {
      factory: await router.methods.factory().call(),
      // WETH: await router.methods.WETH().call()
    };
  } else {
    console.error("No Router Address found within usePool()");
  }
}

/**
 *
 * @param pairAddress {string} Address of the pair contract
 * @param amountIn {BigNumber} Amount of token to give in
 * @param fromToken string Address of the token to give in
 * @param toToken string Address of the token to get out
 * @return {BigNumber} The calculated amountOut
 */
export function useAmountsOut(pairAddress, amountIn, fromToken, toToken) {
  const isValidAmountIn = amountIn.gt(parseUnits("0"));
  const areParamsValid = !!(
    pairAddress &&
    isValidAmountIn &&
    fromToken &&
    toToken
  );
  const { error, value } =
    useCall(
      areParamsValid && {
        contract: new Contract(saveRouter, abiRouter),
        method: "getAmountsOut",
        args: [amountIn, [fromToken, toToken], 997],
      },
    ) ?? {};
  return error ? parseUnits("0") : value?.amounts[1];
}

export function usePoolsWithWETHAddress(router_address, mock) {
  const { readOnlyChainId, readOnlyUrls } = useConfig();
  const [loading, setLoading] = useState(true);
  const [pools, setPools] = useState({});
  const [routerAddress, setRouterAddress] = useState("");
  const [, setError] = useState();

  useEffect(() => {
    if (mock) {
      setPools(mock);
      if (router_address) {
        setRouterAddress(router_address);
      }

      setLoading(false);
    } else {
      if (router_address) {
        setRouterAddress(router_address);
      }

      loadPoolsWithWETHAddress(router_address, readOnlyUrls[readOnlyChainId])
        .then((data) => {
          if (data) {
            setPools(data.pools);
          }

          setLoading(false);
        })
        .catch((error) => {
          // rethrow error in setError to be catchable by ErrorBoundary
          setError(() => {
            throw error;
          });
        });
    }
  }, [mock, readOnlyUrls, readOnlyChainId, router_address]);

  return [loading, pools]; //, WETHAddress
}

export async function getFactoryInfo(factoryAddress, web3) {
  const factory = new web3.eth.Contract(abiFactory, factoryAddress);

  const factoryInfo = {
    allPairsLength: await factory.methods.allPairsLength().call(),
    allPairs: [],
  };

  console.error(" Pairs info length ", factoryInfo?.allPairsLength);

  for (let i = 0; i < factoryInfo?.allPairsLength; ++i) {
    factoryInfo.allPairs[i] = await factory.methods.allPairs(i).call();
  }

  factoryInfo.pairsInfo = await getPairsInfo(factoryInfo.allPairs, web3);
  return factoryInfo;
}

export async function getPairsInfo(pairAddresses, web3) {
  const pairsInfo = [];
  const pairABI = abiPair;
  const tokenABI = abiERC20;

  for (let i = 0; i < pairAddresses.length; ++i) {
    const pairAddress = pairAddresses[i];
    console.error(" Pair address", pairAddress);
    const pair = new web3.eth.Contract(pairABI, pairAddress);

    const token0Address = await pair.methods.token0().call();
    const token1Address = await pair.methods.token1().call();
    const token0Contract = new web3.eth.Contract(tokenABI, token0Address);
    const token1Contract = new web3.eth.Contract(tokenABI, token1Address);
    const token0Name = await token0Contract.methods.name().call();
    const token1Name = await token1Contract.methods.name().call();
    const reserves = await pair.methods.getReserves().call();

    pairsInfo.push({
      address: pairAddress,
      token0Address,
      token1Address,
      token0Name,
      token1Name,
      reserve0: reserves._reserve0,
      reserve1: reserves._reserve1,
    });
  }

  return pairsInfo;
}

// Function is not used within the UI atm : //aqua
export function useFactoryPairs() {
  const res = useCall({
    contract: new Contract(FACTORY_ADDRESS, abiFactory),
    method: "allPairsLength",
    args: [],
  });
  const pairsLength = res?.value ?? 0;

  const calls = [];
  for (var i = 0; i < pairsLength; i++) {
    calls.push({
      contract: new Contract(FACTORY_ADDRESS, abiFactory),
      method: "allPairs",
      args: [i],
    });
  }
  const pairResults = useCalls(calls) ?? [];
  pairResults.forEach((result) => {
    if (result && result.error) {
      console.error(result.error.message);
    }
  });
  return pairResults.map((result) => result?.value);
}
