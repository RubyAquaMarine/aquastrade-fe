// @ts-nocheck
"use client";
import Link from "next/link";
import React, { useState, ChangeEvent, useEffect, useRef } from "react";

import "react-toastify/dist/ReactToastify.css";

import { formatUnits, parseUnits, parseEther } from "viem";

import styles from "@/app/Styles/DCA.module.css";

import { useDCA } from "@/app/Hooks/useDCA";

import DCAUserOrders from "@/app/Components/DCAUserOrders";

const DCATotalOrders: React.FC = () => {
  //  const total_dca_orders = useDCA('index');

  const total_dca_storages = useDCA("StorageID");

  const loopOrders = () => {
    console.log(" loop orders ");

    const loop = BigInt(total_dca_storages?.data);
    let element = [];
    console.log(" loop orders ", loop);
    for (let index = 1; index <= loop; index++) {
      element.push(
        <DCAUserOrders key={index} props={{ storage: index }}>
          {" "}
        </DCAUserOrders>,
      );
    }

    console.log(" loop orders length ", element?.length);

    return element;
  };

  return (
    <div>
      {/** map over all storages based on the storage length : return buttons  */}

      {total_dca_storages?.data ? loopOrders() : <span> looping orders</span>}
    </div>
  );
};

export default DCATotalOrders;

/*
 <span> Global Order Id </span>
          {total_dca_orders?.data && formatUnits(total_dca_orders?.data, 0)}

           {total_dca_storages?.data && total_dca_storages?.data ? <DCAUserOrders props={{storage: total_dca_storages?.data}}> </DCAUserOrders> : <span></span>}


*/
