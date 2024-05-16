"use client";
import { ThemeProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

import React, { useEffect, useState } from "react";

export default function HandleThemes({
  children,
  ...props
}: ThemeProviderProps) {
  const [isMounted, setIsMounted] = useState(false);
  // This useEffect hook ensures that the component is only mounted on the client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <>{children}</>;
  }

  return <ThemeProvider {...props}>{children}</ThemeProvider>;
}
