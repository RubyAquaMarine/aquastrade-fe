// @ts-nocheck
"use client";
import {
    useAccount
} from "wagmi";
import React, { useState, useRef } from "react";
import { formatUnits } from "viem";

import { useERC20Token } from "@/app/Hooks/useAMM";

import styles from "@/app/Styles/AMM.module.css";

interface Props {
    tokenAddress: string;
    decimals: bigint;
}

const TokenBalance = (params: Props) => {

    const { address, isConnected, chain } = useAccount();

    const { data: token_balance } = useERC20Token(params.props[0], "balanceOf", [
        address,
    ]);

    return (
        <main>
            <div className={styles.container}>

                {address ? <div>
                    <p className={styles.amount_balance_small}>
                        {!token_balance
                            ? "0.0"
                            : typeof token_balance === "bigint" &&
                            formatUnits(token_balance, params.props[1])}
                    </p>
                </div> : <div></div>

                }
            </div>
        </main>
    );
};

export default TokenBalance;
