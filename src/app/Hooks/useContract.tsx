import { useReadContract } from "wagmi";

import { marketplaceABI } from "@/app/Abi/europaMarketPlace";

import { MARKETPLACE_AQUADEX } from "@/app/Utils/config";

export const useContract = (functionName: string, args?: [any]) => {
  const { data, isError, isLoading } = useReadContract({
    abi: marketplaceABI,
    address: MARKETPLACE_AQUADEX,
    functionName: functionName as unknown as undefined,
    args: args,
  });

  return { data, isError, isLoading };
};
