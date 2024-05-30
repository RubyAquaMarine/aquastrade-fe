import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

// validation before formatting input strings
export const isNumber = (s: string): boolean => {
  // const reg = /^-?\d+\.?\d*$/
  // const regb =/^[0-9]+\.?[0-9]+.*$/
  const regc = /^[0-9]+\.?\d*$/;
  return regc.test(s) && !isNaN(parseFloat(s)) && isFinite(parseFloat(s));
};

1.0;
