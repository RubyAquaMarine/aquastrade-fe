"use client";

import { http, createConfig, webSocket, fallback } from "wagmi";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors"; // todo add more wallets here
// todo add chains here
import {
  mainnet,
  skaleEuropa,
  skaleBlockBrawlers,
  skaleCalypso,
  skaleCryptoBlades,
  skaleCryptoColosseum,
  skaleExorde,
  skaleHumanProtocol,
  skaleNebula,
  skaleRazor,
  skaleTitan,
} from "wagmi/chains";

export const config = createConfig({
  chains: [
    mainnet,
    skaleEuropa,
    skaleBlockBrawlers,
    skaleCalypso,
    skaleCryptoBlades,
    skaleCryptoColosseum,
    skaleExorde,
    skaleHumanProtocol,
    skaleNebula,
    skaleRazor,
    skaleTitan,
  ],

  connectors: [
    injected(),
    coinbaseWallet({ appName: "Aquas.Trade" }),
    walletConnect({
      isNewChainsStale: true,
      projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID
        ? process.env.NEXT_PUBLIC_WC_PROJECT_ID
        : "",
      metadata: {
        icons: [""],
        name: "Aquas.Trade",
        description: "Skale DEX Trading",
        url: "https://aquas.trade",
      },
      qrModalOptions: {
        themeMode: "dark",
      },
    }),
  ],
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [skaleEuropa.id]: http(),
    [skaleBlockBrawlers.id]: http(),
    [skaleCalypso.id]: http(),
    [skaleCryptoBlades.id]: http(),
    [skaleCryptoColosseum.id]: http(),
    [skaleExorde.id]: http(),
    [skaleHumanProtocol.id]: http(),
    [skaleNebula.id]: http(),
    [skaleRazor.id]: http(),
    [skaleTitan.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

/*
fallback([
      webSocket("wss://mainnet.skalenodes.com/v1/ws/elated-tan-skat", {
        retryCount: 10,
        retryDelay: 500,
      }),
      http("https://mainnet.skalenodes.com/v1/elated-tan-skat"),
    ]),


*/
