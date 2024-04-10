import { useReadContract } from "wagmi";

import { marketplaceABI } from "@/app/Abi/europaMarketPlace";
import { ERC20_ABI } from "@/app/Abi/erc20";

import { EUROPA_NFT_ABI } from "@/app/Abi/europaAquaNFT";

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

// args: [address as `0x${string}`],

export const useERC20Token = (_address: `0x${string}`, _functionName: string, _args?: [any]) => {

  const { data, isError, isLoading } = useReadContract({
    abi: ERC20_ABI,
    address: _address,
    functionName: _functionName as unknown as undefined,
    args: _args,
  });

  return { data, isError, isLoading };
};

export const useNFTs = (_address: `0x${string}`, _functionName: string, _args?: [any]) => {

  const { data, isError, isLoading } = useReadContract({
    abi: EUROPA_NFT_ABI,
    address: _address,
    functionName: _functionName as unknown as undefined,
    args: _args,
  });

  return { data, isError, isLoading };
};
