"use client";

import React, { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import styles from "@/app/Styles/PerpCenterPanel.module.css";

import { OrderTypePanel } from "@/app/Components/perp/OrderTypePanel";

type PanelProps = {
  data: string;
};

export const CenterPanel = (props: PanelProps) => {
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
    <div className={styles.panel_container}>
      <ul className={styles.panel_trading}>
        <li className={styles.tradeButtonSell}>
          <button>SELL</button>
        </li>
        {/** Recode  */}
        {/** Note: This should maintain center viewport  */}
        <li className={styles.panel_center}>
          <div className="mb-4">
            <p>
              <span className={styles.panel_balance}>
                <Link href={`/user/${`address`}`}>
                  {" "}
                  {/* add balance input here */} Balance: $94.0493{" "}
                </Link>
                <span className={styles.panel_text}>
                  {" "}
                  <button type="button">Deposit</button>{" "}
                  <button type="button">Withdraw</button>
                </span>
              </span>
            </p>

            <p>
              <span className={styles.panel_risk}>
                <Link href={`/user/${`address`}`}>
                  {" "}
                  {/* add liq price input here */} Liq Price: 3567.76{" "}
                </Link>
                <span>
                  <OrderTypePanel {...{ data: "data" }}></OrderTypePanel>
                </span>
              </span>
            </p>

            <span>
              <input
                className={styles.trade_input}
                type="text"
                value={getInputValue(0)} // Call a function to get the appropriate value
                onChange={(e) => handleInputChange(0, e.target.value)}
                placeholder={` Enter USD Amount`}
              />
            </span>
          </div>
        </li>
        {/** Note: This should maintain center viewport  */}

        <li className={styles.tradeButtonBuy}>
          <button>BUY</button>
        </li>
      </ul>
    </div>
  );
};
