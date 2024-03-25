"use client";
import { ThemeProvider } from "next-themes";
import React, { useEffect, useState } from "react";
import { useAccount, useSwitchChain } from "wagmi";

export default function useHandleNetworkSwitch() {
  const { chains, switchChain } = useSwitchChain();
  const { address, chain: activeChain } = useAccount();

  useEffect(() => {
    const handleLinkClickRubySwap = () => {
      if (activeChain) {
        if (activeChain.id !== 2046399126) {
          switchChain({
            chainId: 2046399126,
          });
        }
      }
    };

    if (address && activeChain) {
      handleLinkClickRubySwap();
    }
  }, [address, activeChain, switchChain]);
}
