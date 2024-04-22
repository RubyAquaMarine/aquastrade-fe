// @ts-nocheck
"use client";
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { time } from "console";

/*

Current status 


- props[0 aka symbol is being used to assign the asset to ws and fetch api url]
 no other props are being used. Current props are from ws from another connection
 yes thats right there's two of the same sockets running atm. 
 not sure what design path to go ....current design is simple... lets try on more pages. 

Thoughts 
- connects to socket within component : actually maybe a good idea. 
- - this could allow showing multi assets within the same viewport
- lets test that 

Ideas 
- passing down props from the binance ws : plans are to move the ws.onconnect 
outside of this component and only pass the data to props. 


*/

interface CandleConfig {
  symbol?: string;
  timeframe?: string;

  time?: number;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  value?: number;
}

const Chart = (props: CandleConfig) => {
  const ref = useRef();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartProperties = {
    width: 600,
    height: 600,
    timeScale: {
      timeVisible: true,
      secondsVisible: false,
    },
    crosshair: {
      mode: CrosshairMode.Normal,
      vertLine: {
        visible: false,
        labelVisible: true,
        labelBackgroundColor: "#222224",
      },
      horzLine: {
        visible: true,
        labelVisible: true,
        color: "#475384",
        labelBackgroundColor: "#9B7DFF",
      },
    },
    rightPriceScale: {
      borderColor: "#222224",
      scaleMargins: {
        top: 0.3,
        bottom: 0.25,
      },
      borderVisible: true,
    },
    timeScale: {
      borderColor: "#222224",
    },
    layout: {
      background: { color: "#181a1d" },

      textColor: "#d9d9d9",
    },
    grid: {
      vertLines: {
        color: "#181a1d",
      },
      horzLines: {
        color: "#181a1d",
      },
    },
  };

  console.log(
    "Chart6 Component : Test all props : ",
    props.props?.[0],
    props.props?.[1],
    props.props?.[2],
    props.props?.[3],
    props.props?.[4],
    props.props?.[4],
    props.props?.[5],
    props.props?.[6],
    props.props?.[7],
  );

  const [chartData, setChartData] = useState([]);
  const [chartVolumeData, setChartVolumeData] = useState([]);

  const ws = new WebSocket(
    `wss://stream.binance.com:9443/ws/${props.props?.[0].toLowerCase()}@kline_1m`,
  );

  const prepareChart = (chart, ws) => {
    //  const candlestickSeries = chart.addCandlestickSeries();
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "rgba(38,198,218, 0.56)",
      downColor: "rgba(239,83,80, 0.4)",
    });

    const volumeSeries = chart.addHistogramSeries({
      color: "rgba(38,198,218, 0.56)",
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "",
    });

    candlestickSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.02,
        bottom: 0.02,
      },
    });

    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.85, // highest point of the series will be 70% away from the top
        bottom: 0,
      },
    });

    chart?.applyOptions({
      handleScroll: {
        horzTouchDrag: true,
        mouseWheel: true,
        pressedMouseMove: true,
        vertTouchDrag: true,
      },
      handleScale: {
        mouseWheel: true,
      },
    });

    // binance static chart REST API
    fetch(
      `https://api.binance.com/api/v3/klines?symbol=${props.props?.[0].toUpperCase()}&interval=${props.props?.[1]}&limit=1000`,
    )
      .then((res) => res.json())
      .then((data) => {
        const cdata = data.map((d) => {
          return {
            time: d[0] / 1000,
            open: parseFloat(d[1]),
            high: parseFloat(d[2]),
            low: parseFloat(d[3]),
            close: parseFloat(d[4]),
          };
        });

        const vdata = data.map((d) => {
          return {
            time: d[0] / 1000,

            value: parseFloat(d[5]),
          };
        });

        candlestickSeries.setData(cdata);
        volumeSeries.setData(vdata);
        console.log("Binance Static Kline REST API called: output", cdata);
      })
      .catch((err) => console.error(err));

    ws.onmessage = (event) => {
      const responseObject = JSON.parse(event.data);

      console.log("Chart6,1 ws.data: ", responseObject);

      const { t, o, h, l, c, v } = responseObject.k;
      const kData = {
        time: t / 1000,
        open: parseFloat(o),
        high: parseFloat(h),
        low: parseFloat(l),
        close: parseFloat(c),
      };
      // format volume to 0.00  decimals
      const vData = {
        time: t / 1000,
        value: parseFloat(parseFloat(v).toFixed(2)),
      };
      // update db and chart
      setChartData(chartData.push(kData));
      setChartVolumeData(chartVolumeData.push(vData));
      candlestickSeries.update(kData);
      volumeSeries.update(vData);
    };
  };

  //todo: renders twice
  useEffect(() => {
    console.log("Render Ref: is ", ref.current);
    console.log("Render chartContainerRef: is ", chartContainerRef);

    const chart = createChart(ref.current, chartProperties);
    prepareChart(chart, ws);
  }, []);

  return (
    <>
      <div ref={ref} />
      ID:
    </>
  );
};

export default Chart;
