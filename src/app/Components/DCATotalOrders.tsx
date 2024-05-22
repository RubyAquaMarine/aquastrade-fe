// @ts-nocheck
"use client";
import Link from "next/link";
import React, { memo } from "react";

import { useDCA } from "@/app/Hooks/useDCA";

import DCAUserOrders from "@/app/Components/DCAUserOrders";

type TotalOrders = {
  globalID: bigint;
};

const DCATotalOrders: React.FC = (props: TotalOrders) => {
  console.log("DCATotalOrders props ", props);

  const total_dca_storages = useDCA("StorageID");

  //// todo  : get the pool address and map a Pair to this DCAUserOrders , to display the Pair instead of the Index of the storage

  const loopOrders = () => {
    console.log("DCATotalOrders loop orders ");
    let element = [];
    if (total_dca_storages) {
      const loop = BigInt(total_dca_storages?.data);
      console.log("DCATotalOrders loop orders ", loop);
      for (let index = 1; index <= loop; index++) {
        element.push(
          <DCAUserOrders key={index} props={{ storage: index }}>
            {" "}
          </DCAUserOrders>,
        );
      }
    }
    console.log("DCATotalOrders loop orders length ", element?.length);
    return element;
  };

  return (
    <div>
      {/** map over all storages based on the storage length : return buttons  */}

      {total_dca_storages && total_dca_storages?.data ? (
        loopOrders()
      ) : (
        <span> looping orders</span>
      )}
    </div>
  );
};

export default memo(DCATotalOrders);
