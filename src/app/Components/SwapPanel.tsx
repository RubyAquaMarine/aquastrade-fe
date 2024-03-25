"use client";
import { useAccount, usePublicClient } from "wagmi";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { DAppProvider } from "@usedapp/core";
import { DAPP_CONFIG } from "../Utils/config";

/* Test different Swap Widget UIs */
import SwapLifi from "./SwapLifi";
import SwapAqua from "./SwapAqua";
import SwapRuby from "./SwapRuby";

const SwapPanel = () => {
  const path = usePathname();
  const dappType = path;
  /*
  const { address, chain } = useAccount();
  
  const addressWallet = address;
  

  const publicClient = usePublicClient({
    chainId: chain?.id || 1,
  });

  const [chainName, setChainName] = useState<any>(null);
  const [signer, setSigner] = useState<any>(null);

  useEffect(() => {
    const getSigner = async () => {
      console.error("useEffect: Chain or address changed");
      if (chain) {
        const signer = await getEthersSigner({ chainId: Number(chain?.id) }); // todo
        setSigner(signer);
        setChainName(chain.name);
      }
    };

    if (addressWallet && chain) {
      getSigner();
    }
  }, [addressWallet, chain]);

  */

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <p>
          {" "}
          <Link href="/dashboard"> Back </Link>
        </p>

        {dappType == "/swap/rubyexchange" ? (
          <DAppProvider config={DAPP_CONFIG}>
            <SwapRuby />
          </DAppProvider>
        ) : (
          <p></p>
        )}

        {dappType == "/swap/aquadex" ? (
          <DAppProvider config={DAPP_CONFIG}>
            <SwapAqua />
          </DAppProvider>
        ) : (
          <p></p>
        )}

        {dappType == "/swap/lifi" ? <SwapLifi /> : <p></p>}
      </div>
    </main>
  );
};

export default SwapPanel;
