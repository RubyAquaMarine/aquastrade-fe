"use client";
import React, { useEffect, useState } from "react";
import { Metaport } from "skale_metaport";
import "skale_metaport/dist/style.css";
import { RubyConfig } from "../Utils/metaportNetworkConfigV2";

const MetaportWidgetV2 = () => {
  return (
    <div>
      <Metaport config={RubyConfig} />
    </div>
  );
};

export default MetaportWidgetV2;
/*
version 2.0.3 

  "dependencies": {
    "@mui/material": "^5.14.8",
    "@mui/lab": "^5.0.0-alpha.143",
    "@mui/icons-material": "^5.14.8",
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
    "@rainbow-me/rainbowkit": "^1.1.1",
    "@skalenetwork/ima-js": "2.0.0-beta.0",
    "coingecko-api-v3": "^0.0.29",
    "react-jazzicon": "^1.0.4",
    "viem": "^1.10.8",
    "wagmi": "^1.4.1",
    "zustand": "^4.4.1"
  },
  "peerDependencies": {
    "react": "18.2.0",
    "react-dom": "18.2.0"
  },
*/
