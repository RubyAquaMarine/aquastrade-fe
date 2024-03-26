import { useReadContract } from "wagmi";

import { marketplaceABI } from "@/app/Abi/europaMarketPlace";
import { ERC20_ABI } from "@/app/Abi/erc20";

import {
  COIN_FLIP_AQUA,
  MARKETPLACE_AQUADEX,
  EUROPA_ETH,
  MARKETPLACE_BRONZE_NFT,
  MARKETPLACE_SILVER_NFT,
  MARKETPLACE_GOLD_NFT,
} from "@/app/Utils/config";

export const useMarketPlace = (functionName: string, args?: [any]) => {
  const { data, isError, isLoading } = useReadContract({
    abi: marketplaceABI,
    address: MARKETPLACE_AQUADEX,
    functionName: functionName as unknown as undefined,
    args: args,
  });

  return { data, isError, isLoading };
};

export const useERC20Token = (functionName: string, args?: [any]) => {
  const { data, isError, isLoading } = useReadContract({
    abi: ERC20_ABI ,
    address: EUROPA_ETH,
    functionName: functionName as unknown as undefined,
    args: args,
  });

  return { data, isError, isLoading };
};
