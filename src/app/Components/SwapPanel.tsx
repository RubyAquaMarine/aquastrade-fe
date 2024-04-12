"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

/* Test different Swap Widget UIs */
import SwapLifi from "./SwapLifi";

import SwapAmm from "./SwapAmm";

const SwapPanel = () => {
  const path = usePathname();
  const dappType = path;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {dappType == "/swap/lifi" ? <SwapLifi /> : <p></p>}
        {dappType == "/swap/amm" ? <SwapAmm /> : <p></p>}
      </div>
    </main>
  );
};

export default SwapPanel;
