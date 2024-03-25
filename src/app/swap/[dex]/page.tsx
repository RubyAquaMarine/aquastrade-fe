"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import SwapPanel from "../../Components/SwapPanel";

//  {params} : {params: {id : string}}
const SwapAMMV2 = ({ params }: any) => {
  const path = usePathname();

  console.error(" Routing url", path);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <SwapPanel />
      </div>
    </main>
  );
};

export default SwapAMMV2;
