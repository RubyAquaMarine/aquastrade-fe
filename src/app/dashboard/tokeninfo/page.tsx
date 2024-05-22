"use client";

import React, { useEffect, useState, useRef } from "react";

import styles from "@/app/Styles/Container.module.css";

import TokenCards from "@/app/Components/TokenCards";

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TokenCards></TokenCards>
    </main>
  );
};
export default Home;
