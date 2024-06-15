import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatUnits, parseUnits } from "viem";
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

// big to string
export const formatPriceBigToHuman = (_value: bigint) => {
  const one = parseUnits("1", 18);

  const oneM = parseUnits("1000000", 18);

  const onefourth = parseUnits("0.0001", 18);

  const oneeight = parseUnits("0.00000001", 18);

  const onetwelve = parseUnits("0.000000000001", 18);

  let value;

  if (_value >= oneM) {
    value = parseFloat(formatUnits(_value, 18)).toFixed(0);
  }

  if (_value >= one && _value < oneM) {
    value = parseFloat(formatUnits(_value, 18)).toFixed(2);
  }

  if (_value < one && _value >= onefourth) {
    value = parseFloat(formatUnits(_value, 18)).toFixed(4);
  }

  if (_value < onefourth && _value >= oneeight) {
    value = parseFloat(formatUnits(_value, 18)).toFixed(8);
  }

  if (_value < oneeight && _value >= onetwelve) {
    value = parseFloat(formatUnits(_value, 18)).toFixed(12);
  }

  if (_value < onetwelve) {
    value = parseFloat(formatUnits(_value, 18)).toFixed(18);
  }
  return value as string;
};
