"use client";

import React from "react";
import SwapPanel from "../../Components/SwapPanel";

//  {params} : {params: {id : string}}
const SwapAMMV2 = ({ params }: any) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <SwapPanel />
      </div>
    </main>
  );
};

export default SwapAMMV2;
