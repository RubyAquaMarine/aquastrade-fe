"use client";

import React, { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import styles from "@/app/Styles/PerpCenterPanel.module.css";

type PanelProps = {
  data: string;
};

export const OrderTypePanel = (props: PanelProps) => {
  const [inputs, setInputs] = useState([""]);

  function getInputValue(index: number) {
    return inputs[index];
  }

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  return (
    <>
      <span className={styles.panel_order_type}>
        <button className={styles.button_order_type} type="button">
          LMT
        </button>{" "}
        <button className={styles.button_order_type} type="button">
          STP
        </button>
        <button className={styles.button_order_type_TP} type="button">
          TP
        </button>
        <button className={styles.button_order_type_SL} type="button">
          SL
        </button>
      </span>
    </>
  );
};
