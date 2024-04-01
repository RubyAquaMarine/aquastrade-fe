import { useReadContract } from "wagmi";

import { COIN_FLIP_ABI } from "@/app/Abi/europaCoinflip";
import { ERC20_ABI } from "@/app/Abi/erc20";

import {
  COIN_FLIP_AQUA,
  MARKETPLACE_AQUADEX,
  EUROPA_AQUA,
  MARKETPLACE_BRONZE_NFT,
  MARKETPLACE_SILVER_NFT,
  MARKETPLACE_GOLD_NFT,
} from "@/app/Utils/config";

export const useCoinflip = (functionName: string, args?: [any]) => {
  const { data, isError, isLoading } = useReadContract({
    abi: COIN_FLIP_ABI,
    address: COIN_FLIP_AQUA,
    functionName: functionName as unknown as undefined,
    args: args,
  });

  return { data, isError, isLoading };
};

export const useERC20Token = (functionName: string, args?: [any]) => {
  const { data, isError, isLoading } = useReadContract({
    abi: ERC20_ABI,
    address: EUROPA_AQUA,
    functionName: functionName as unknown as undefined,
    args: args,
  });

  return { data, isError, isLoading };
};
