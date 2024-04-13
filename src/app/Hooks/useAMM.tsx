import { useReadContract } from "wagmi";

import { MARKETPACE_ABI } from "@/app/Abi/europaMarketPlace";
import { ERC20_ABI } from "@/app/Abi/erc20";
import { EUROPA_AMM_ROUTER_ABI } from "@/app/Abi/europaAMMRouter";
import { EUROPA_NFT_ABI } from "@/app/Abi/europaAquaNFT";

import { MARKETPLACE_AQUADEX } from "@/app/Utils/config";

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
  console.error(`use NFT  ${_functionName}  with params: ${_args}`);

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
  console.error(`use AMM Router ${_functionName}  with params: ${_args}`);

  const { data, isError, isLoading } = useReadContract({
    abi: EUROPA_AMM_ROUTER_ABI,
    address: _address,
    functionName: _functionName as unknown as undefined,
    args: _args,
  });

  return { data, isError, isLoading };
};
