// https://github.com/heyxyz/hey/blob/main/apps/web/src/hooks/useCreatePublication.tsx#L65
// just testing a hook from latest Viem and Wagmi project ^^
import { useRouter } from "next/router";
import { useSignTypedData, useWriteContract } from "wagmi";
import useHandleWrongNetwork from "./useHandleWrongNetwork";
import { useState } from "react";

interface CreatePublicationProps {
  commentOn?: any;
  onCompleted: (status?: any) => void;
  onError: (error: any) => void;
  quoteOn?: any;
}

const useCreatePublication = ({
  commentOn,
  onCompleted,
  onError,
  quoteOn,
}: CreatePublicationProps) => {
  const { push } = useRouter();
  const handleWrongNetwork = useHandleWrongNetwork();

  const [txnQueue, setTxnQueue] = useState("");

  const { error, writeContractAsync } = useWriteContract({
    mutation: {
      onError: (error: Error) => {
        onError(error);
      },
      onSuccess: (hash: string) => {
        onCompleted();

        setTxnQueue(
          generateOptimisticPublication({ txHash: hash }), // not tested
        );
      },
    },
  });
  //  functionName: isComment ? 'comment' : isQuote ? 'quote' : 'post'
  const write = async ({ args }: { args: any[] }) => {
    return await writeContractAsync({
      abi: [],
      address: "0x" as `0x${string}`,
      args,
      functionName: "",
    });
  };
  // todo
  // regen for post to next database : POST to /api/data.ts
  const generateOptimisticPublication = ({
    txHash,
    txId,
  }: {
    txHash?: string;
    txId?: string;
  }) => {
    return {
      ...(commentOn && { commentOn: commentOn?.id }),
      content: "",
      txHash,
      txId,
      type: "nob",
    };
  };
};

export default useCreatePublication;
