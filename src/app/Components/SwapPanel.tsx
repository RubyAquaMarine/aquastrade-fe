"use client";

import React from "react";
import { usePathname } from "next/navigation";

/* Test different Swap Widget UIs */
import SwapLifi from "./SwapLifi";
import SwapAmm from "./SwapAmm";

const SwapPanel = () => {
  const path = usePathname();
  const dappType = path;

  return (
    <>
      {dappType == "/swap/lifi" ? <SwapLifi /> : <p></p>}
      {dappType == "/swap/amm" ? <SwapAmm /> : <p></p>}
    </>
  );
};

export default SwapPanel;
