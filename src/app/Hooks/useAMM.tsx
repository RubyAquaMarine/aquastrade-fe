// @ts-nocheck
"use client";

import { useReadContract } from "wagmi";
import { parseUnits } from "viem";
import { MARKETPACE_ABI } from "@/app/Abi/europaMarketPlace";
import { ERC20_ABI } from "@/app/Abi/erc20";
import { EUROPA_AMM_ROUTER_ABI } from "@/app/Abi/europaAMMRouter";
import { EUROPA_NFT_ABI } from "@/app/Abi/europaAquaNFT";
import { PAIRS_ABI } from "@/app/Abi/pairs";
import { FACTORY_ABI } from "@/app/Abi/factory";
import { MARKETPLACE_AQUADEX } from "@/app/Utils/config";
import { findContractInfo } from "../Utils/findTokens";

export const useMarketPlace = (functionName: string, args?: [any]) => {
  const { data, isError, isLoading } = useReadContract({
    abi: MARKETPACE_ABI,
    address: MARKETPLACE_AQUADEX,
    functionName: functionName as unknown as undefined,
    args: args,
  });

  return { data, isError, isLoading };
};

export const useERC20Token = (
  _address: `0x${string}`,
  _functionName: string,
  _args?: [any],
) => {
  const { data, isError, isLoading } = useReadContract({
    abi: ERC20_ABI,
    address: _address,
    functionName: _functionName as unknown as undefined,
    args: _args,
  });

  return { data, isError, isLoading };
};

export const useNFTs = (
  _address: `0x${string}`,
  _functionName: string,
  _args?: [any],
) => {
  //  console.log(`use NFT  ${_functionName}  with params: ${_args}`);

  const { data, isError, isLoading } = useReadContract({
    abi: EUROPA_NFT_ABI,
    address: _address,
    functionName: _functionName as unknown as undefined,
    args: _args,
  });

  return { data, isError, isLoading };
};

export const useAMMRouter = (
  _address: `0x${string}`,
  _functionName: string,
  _args?: [any],
) => {
  // console.log(`use AMM Router ${_functionName}  with params: ${_args}`);

  const { data, isError, isLoading } = useReadContract({
    abi: EUROPA_AMM_ROUTER_ABI,
    address: _address,
    functionName: _functionName as unknown as undefined,
    args: _args,
  });

  return { data, isError, isLoading };
};

export const useAMMPairs = (
  _address: `0x${string}`,
  _functionName: string,
  _args?: [any],
) => {
  //  console.log(`use AMM Pairs ${_address}  with name ${_functionName}  with params: ${_args}`);
  const { data, isError, isLoading } = useReadContract({
    abi: PAIRS_ABI,
    address: _address,
    functionName: _functionName as unknown as undefined,
    args: _args,
  });

  return { data, isError, isLoading };
};

export const useFactory = (
  _address: `0x${string}`,
  _functionName: string,
  _args: `0x${string}`[],
) => {
  const { data, isError, isLoading } = useReadContract({
    abi: FACTORY_ABI,
    address: _address,
    functionName: _functionName as unknown as undefined,
    args: [_args?.[0], _args?.[1]],
  });

  return { data, isError, isLoading };
};

export const useGetAmountInQuote = (
  _amount: string,
  _addressPair: `0x${string}`,
  _inputTokenAddress: `0x${string}`,
  _decimalA: bigint,
) => {
  console.log("useGetAmountInQuote:Props: ", _amount, _addressPair, _decimalA);

  const amountIn = parseUnits(_amount, Number(_decimalA ? _decimalA : 18));


  let flip = false;

  const { data: reserves } = useAMMPairs(_addressPair, "getReserves");
  const { data: addrA } = useAMMPairs(_addressPair, "token0");

  if (_addressPair && addrA && _inputTokenAddress) {
    if (addrA === _inputTokenAddress) {
      flip = false;
    } else {
      flip = true;
    }
  }

  const routerContract = findContractInfo("router");

  const data = [
    parseUnits(_amount ? _amount : "0", Number(_decimalA ? _decimalA : 18)),
    flip === false ? reserves?.[0] : reserves?.[1],
    flip === false ? reserves?.[1] : reserves?.[0],
  ];

  const { data: swap_out } = useAMMRouter(
    routerContract.address,
    "quote",
    data as any,
  );

  // console.log("GetAmountInQuote: ", swap_out);

  return swap_out as unknown as bigint;
};
