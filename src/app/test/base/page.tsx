"use client";
import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

import BasicTable from "@/app/Components/table/BasicTable";

const TokenList = ({ params }: any) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <BasicTable></BasicTable>
    </main>
  );
};

export default TokenList;
