"use client";
import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

import { CenterPanel } from "@/app/Components/perp/CenterPanel";

const TokenList = ({ params }: any) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CenterPanel {...{ data: "ok" }}></CenterPanel>
    </main>
  );
};

export default TokenList;
