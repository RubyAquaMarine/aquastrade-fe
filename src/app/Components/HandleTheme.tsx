"use client";
import { ThemeProvider } from "next-themes";
import React, { useEffect, useState } from "react";
export default function HandleThemes({ children }: any) {
  const [isMounted, setIsMounted] = useState(false);
  // This useEffect hook ensures that the component is only mounted on the client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <>{children}</>;
  }

  return <ThemeProvider enableSystem={false}>{children}</ThemeProvider>;
}
