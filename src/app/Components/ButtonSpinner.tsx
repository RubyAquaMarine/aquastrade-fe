"use client";

import Link from "next/link";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import React, { useState, useEffect, memo, useRef } from "react";
import { formatUnits } from "viem";

import { Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaSpinner } from "react-icons/fa6";

import styles from "@/app/Styles/TokenApprove.module.css";

export interface Props {
  buttonText: string;
  name: string;
  address: `0x${string}`; // 1
  abi: any;
  args: any;
}

export const ButtonSpinner = (params: Props) => {
  console.log(" BUTTON SPINNER Function name", params?.name);

  console.log(" BUTTON SPINNER Function arg", params?.args);

  // spinner

  const spinTimer = useRef(false);

  const [inputTrigger, setTrigger] = useState<boolean>(false); // todo : only triggers once and doesn't reset :

  const { data: hash, isError, writeContract } = useWriteContract();
  const { data: contractCallDataConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (contractCallDataConfirmed) {
      const isLink = `https://elated-tan-skat.explorer.mainnet.skalenodes.com/tx/${hash}`;
      notify(isLink);
      setTrigger(true);
      spinTimer.current = false; // turn off the spinner
    }
  }, [contractCallDataConfirmed, hash]);

  useEffect(() => {
    if (inputTrigger === true) {
      console.log("RENDER AFTER TX TEST ++++++++++");
    }
    console.log("RENDER AFTER TX TEST ----------");
  }, [inputTrigger]);

  const CustomToastWithLink = (_url: string) => (
    <div>
      <Link href={_url} target="_blank">
        {params.name.toUpperCase()} Tx Hash on 🌊 AquasTrade
      </Link>
    </div>
  );
  // `${_message} on 🌊 AquasTrade! [tx] Hash: ${_link}`
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

  const handleOnClick = () => {
    spinTimer.current = true;

    console.log(" WRITE Function ", params);

    writeContract({
      abi: params.abi,
      address: params.address,
      functionName: params.name,
      args: params.args,
    });
  };

  console.log(" WRITE Function is Error? ", isError);

  return (
    <div>
      <button onClick={handleOnClick}>
        <span className={styles.add_spinner}>
          {" "}
          <span className={styles.spinner_padding}>
            {" "}
            {spinTimer && spinTimer.current === true ? (
              <FaSpinner className={styles.spinner_icon} />
            ) : (
              ""
            )}{" "}
          </span>
          <span> {params.buttonText} </span>
        </span>
      </button>
    </div>
  );
};
