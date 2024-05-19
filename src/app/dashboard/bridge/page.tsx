"use client";
import React, { useEffect } from "react";
import SwapMeson from "@/app/Components/Meson";

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-14">
      <div className="max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div>
          <SwapMeson />
        </div>
      </div>
    </main>
  );
};

export default Home;
