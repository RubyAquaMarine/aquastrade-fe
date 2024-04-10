"use client";

import { http, createConfig, webSocket, fallback } from "wagmi";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";
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
    coinbaseWallet({ appName: "Create Wagmi" }),
    // walletConnect({ projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID }),
  ],
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [skaleEuropa.id]: fallback([
      webSocket("wss://mainnet.skalenodes.com/v1/ws/elated-tan-skat", {
        retryCount: 4,
        retryDelay: 1000,
      }),
      http("https://mainnet.skalenodes.com/v1/elated-tan-skat"),
    ]),
    [skaleBlockBrawlers.id]: http(),
    [skaleCalypso.id]: http(),
    [skaleCryptoBlades.id]: http(),
    //  [skaleCryptoColosseum.id]: http(),
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
