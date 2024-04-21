"use client";
import { useState, useEffect } from "react";

import {
  BinanceRestApiResponseTypeKline,
  Time,
  WsResponseTypeKline,
  WsResponseTypeDepth,
  WsResponseTypeTicker,
  WsStreamType,
  BinanceStreams,
  WsResponseTypeTrade,
  TdepthRestApi,
} from "../Types/types";

//---
type Candle = [
  number, // openTime: number;
  string, // open: string;
  string, // high: string;
  string, // low: string;
  string, // close: string;
  string, // volume: string;
  number, // closeTime: number;

  string, // quoteAssetVolume: string;
  number, // numberOfTrades: number;
  string, // takerBuyBaseAssetVolume: string;
  string, // takerBuyQuoteAssetVolume: string;
  string, // ignore: string;
];

export interface Bar {
  /** Bar time.
   * Amount of **milliseconds** since Unix epoch start in **UTC** timezone.
   * `time` for daily bars is expected to be a trading day (not session start day) at 00:00 UTC.
   * Charting Library adjusts time according to `session` from {@link LibrarySymbolInfo}.
   */
  time: number;
  /** Opening price */
  open: number;
  /** High price */
  high: number;
  /** Low price */
  low: number;
  /** Closing price */
  close: number;
  /** Trading Volume */
  volume?: number;
}

enum CandleKeysEnum {
  openTime = 0,
  open = 1,
  high = 2,
  low = 3,
  close = 4,
  volume = 5,

  closeTime = 6,
  quoteAssetVolume = 7,
  numberOfTrades = 8,
  takerBuyBaseAssetVolume = 9,
  takerBuyQuoteAssetVolume = 10,
  ignore = 11,
}
/*
converts Date string to unix  : not what i need 
*/
export function timeToLocal(originalTime: number) {
  const d = new Date(originalTime * 1000);
  const out =
    Date.UTC(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      d.getHours(),
      d.getMinutes(),
      d.getSeconds(),
      d.getMilliseconds(),
    ) / 1000;

  return out;
}

export function _formatEpochDate(safeTS: number) {
  return new Date(safeTS).toDateString();
}
// DONT USE ANY TIME FORMATTER
export function timeToTradingView(originalTime: number) {
  var date = new Date(originalTime);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getDate();
  const formattedTime = String(year + "-" + month + "-" + day);
  return formattedTime;
}

export async function getDataFromBinanceApiKline(
  market: BinanceStreams,
  interval: Time,
  abortController: AbortController,
): Promise<BinanceRestApiResponseTypeKline[]> {
  let data: BinanceRestApiResponseTypeKline[] = await fetch(
    `https://api.binance.com/api/v3/klines?symbol=${market.toUpperCase()}&interval=${interval}&limit=1000`,
    {
      signal: abortController.signal,
    },
  ).then((e) => e.json());

  return data;
}

export const wsController = (
  streams: BinanceStreams,
  SType: WsStreamType,
  interval?: Time,
) => {
  let url: string;

  if (SType === "@kline")
    url = `wss://stream.binance.com:9443/ws/${streams}@kline_${interval}`;
  else url = `wss://stream.binance.com:9443/ws/${streams}${SType}`;

  const ws = new WebSocket(url);

  type DataType =
    | WsResponseTypeKline
    | WsResponseTypeTrade
    | WsResponseTypeDepth
    | WsResponseTypeTicker
    | unknown;

  const message = (callback: (data__: DataType) => void) => {
    function messageHandler(Event: any) {
      let data: DataType = JSON.parse(Event.data);

      callback(data);
    }

    ws.addEventListener("message", messageHandler);

    function removeMessageListener() {
      return ws.removeEventListener("message", messageHandler);
    }

    return { removeMessageListener };
  };

  const wsClose = () => ws.close();

  return { message, wsClose };
};

const getDataCallBack = async (params: any) => {
  console.error("fetching ChartCandles data ", params);
  try {
    const dataKlines = fetch(
      `https://api.binance.com/api/v3/klines?symbol=${params}&interval=1m&limit=1000`,
    );
    const out = await dataKlines;
    if (out) {
      const ok = await out.json();
      if (ok) {
        const tv_data = ok.map((d: Candle) => ({
          //   time: timeToTradingView(d[CandleKeysEnum.openTime]),
          time: d[CandleKeysEnum.openTime] / 1000,
          open: Number(d[CandleKeysEnum.open]),
          high: Number(d[CandleKeysEnum.high]),
          low: Number(d[CandleKeysEnum.low]),
          close: Number(d[CandleKeysEnum.close]),
        }));

        const tv_volume = ok.map((d: Candle) => ({
          //    time: timeToTradingView(d[CandleKeysEnum.openTime]),
          time: d[CandleKeysEnum.openTime] / 1000,

          value: Number(d[CandleKeysEnum.volume]),
        }));

        return [tv_data, tv_volume];
      }
    }
  } catch (error) {
    console.error("data ", error);
  }
};

const ChartCandles = async (params: any) => {
  return await getDataCallBack(params);
};

export default ChartCandles;
