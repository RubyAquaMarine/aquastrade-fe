// @ts-nocheck
"use client";
import Link from "next/link";
import React, { useState, ChangeEvent, useEffect, memo } from "react";
import { formatUnits, parseUnits } from "viem";

import {
  useAccount,
  useWriteContract,
  useBlock,
  useWaitForTransactionReceipt,
  useSwitchChain,
} from "wagmi";

import { Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "@/app/Styles/DCA.module.css";

import { DCA_ABI } from "@/app/Abi/dca";
import { findContractInfo, findTokenFromAddress } from "@/app/Utils/findTokens";

const DCA = findContractInfo("dcamulti");

import { useDCA } from "@/app/Hooks/useDCA";

export type Props = {
  storage?: bigint;
};

const DCAUserOrders: React.FC = (props: Props) => {
  const [orderId, setOrderId] = useState<bigint>();

  const [orderIds, setOrderIds] = useState<bigint[]>();

  //  If No Pairname, Don't render a Label for the StorageID
  const [pairName, setPairName] = useState<string>();

  //wagmi
  const { address, isConnected, chain } = useAccount();
  const { chains, switchChain } = useSwitchChain();
  const { data: hash, writeContract } = useWriteContract();
  const { data: contractCallDataConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const user_orders_storage_0 = useDCA("GetAllOrders", [
    props?.props?.storage,
    address,
  ]);

  const quote = useDCA("GetTokenQuoteUsingIndex", [props?.props?.storage]);

  const base = useDCA("GetTokenBaseUsingIndex", [props?.props?.storage]);

  useEffect(() => {
    if (address && isConnected && user_orders_storage_0?.data) {
      // this can be an array
      if (user_orders_storage_0?.data.length > 1) {
        setOrderIds(user_orders_storage_0?.data);
      } else if (user_orders_storage_0?.data.length == 1) {
        setOrderId(user_orders_storage_0?.data);
      }
    }
    if (
      base?.data &&
      quote?.data &&
      user_orders_storage_0?.data &&
      user_orders_storage_0?.data.length >= 1
    ) {
      const q = findTokenFromAddress(quote?.data)?.symbol;
      const b = findTokenFromAddress(base?.data)?.symbol;

      setPairName(`${q}/${b}`);
    }
  }, [
    address,
    isConnected,
    user_orders_storage_0?.data,
    base?.data,
    quote?.data,
  ]);

  useEffect(() => {
    if (contractCallDataConfirmed) {
      const isLink = `https://elated-tan-skat.explorer.mainnet.skalenodes.com/tx/${hash}`;
      notify(isLink);
    }
  }, [contractCallDataConfirmed, hash]);

  const CustomToastWithLink = (_url: string) => (
    <div>
      <Link href={_url} target="_blank">
        DCA Order Deleted Tx Hash on 🌊 AquasTrade
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

  const submitDeleteOrder = (_id: bigint) => {
    const data = [props?.props?.storage, _id];

    console.log("Delete DCA Order ", data);

    writeContract({
      abi: DCA_ABI,
      address: DCA?.address,
      functionName: "DeleteOrder",
      args: data,
    });
  };

  console.log("DCA USER RENDER", pairName);

  if (pairName) {
    return (
      <div>
        {pairName && (
          <span>
            <span className={styles.text_center_sm}> Storage: {pairName}</span>
            <span>
              {" "}
              {orderIds && orderIds?.length > 1 ? (
                orderIds.map((_value, index) => (
                  <p key={index} className={styles.text_center}>
                    <button
                      className={styles.button_field}
                      onClick={() => submitDeleteOrder(_value)}
                    >
                      Delete : {formatUnits(_value, 0)}{" "}
                    </button>
                  </p>
                ))
              ) : (
                <p className={styles.text_center}>
                  {/** No Mapping here . Just One order exists */}
                  {orderId && (
                    <button
                      className={styles.button_field}
                      onClick={() => submitDeleteOrder(orderId)}
                    >
                      Delete :{orderId && formatUnits(orderId, 0)}{" "}
                    </button>
                  )}{" "}
                </p>
              )}
            </span>
          </span>
        )}
      </div>
    );
  } else {
    return <></>;
  }
};

export default memo(DCAUserOrders);
