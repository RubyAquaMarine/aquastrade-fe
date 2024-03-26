import { useReadContract } from "wagmi";

import { marketplaceABI } from "@/app/Abi/europaMarketPlace";

import {
  COIN_FLIP_AQUA,
  MARKETPLACE_AQUADEX,
  EUROPA_ETH,
  MARKETPLACE_BRONZE_NFT,
  MARKETPLACE_SILVER_NFT,
  MARKETPLACE_GOLD_NFT,
} from "@/app/Utils/config";

export const useContract = (functionName: string, args?: [any]) => {
  const { data, isError, isLoading } = useReadContract({
    abi: marketplaceABI,
    address: MARKETPLACE_AQUADEX,
    functionName: functionName as unknown as undefined,
    args: args,
  });

  return { data, isError, isLoading };
};
