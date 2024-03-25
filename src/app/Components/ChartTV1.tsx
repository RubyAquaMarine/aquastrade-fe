// renders millions of iframes  llll does not work

// @ts-nocheck
"use client";

import React, { useEffect, useRef } from "react";

//import { priceData } from "~/routes/charts/market/priceData.js";
// import { areaData } from './areaData';
//import { volumeData } from "~/routes/charts/market/volumeData.js";

import { createChart, CrosshairMode } from "lightweight-charts";

function Chart() {
  const chartContainerRef = useRef<any>();
  const chart = useRef<any>();
  const resizeObserver = useRef<any>();

  useEffect(() => {
    chart.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 500, //"300px", //chartContainerRef.current.clientHeight,
      layout: {
        backgroundColor: "#1A1A1A",
        textColor: "#757575",
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          color: "#363636",
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      // priceScale: {
      //     borderColor: "#485c7b"
      // },
      priceScale: {
        borderColor: "#363636",
      },
      timeScale: {
        borderColor: "#363636",
      },
    });

    console.log(chart.current);

    const candleSeries = chart.current.addCandlestickSeries({
      upColor: "#0ECB81",
      downColor: "#F6465D",
      borderDownColor: "#F6465D",
      borderUpColor: "#0ECB81",
      wickDownColor: "#F6465D",
      wickUpColor: "#0ECB81",
    });

    candleSeries.setData([
      {
        time: "2018-12-22",
        open: 75.16,
        high: 82.84,
        low: 36.16,
        close: 45.72,
      },
      { time: "2018-12-23", open: 45.12, high: 53.9, low: 45.12, close: 48.09 },
      {
        time: "2018-12-24",
        open: 60.71,
        high: 60.71,
        low: 53.39,
        close: 59.29,
      },
      { time: "2018-12-25", open: 68.26, high: 68.26, low: 59.04, close: 60.5 },
      {
        time: "2018-12-26",
        open: 67.71,
        high: 105.85,
        low: 66.67,
        close: 91.04,
      },
      { time: "2018-12-27", open: 91.04, high: 121.4, low: 82.7, close: 111.4 },
      {
        time: "2018-12-28",
        open: 111.51,
        high: 142.83,
        low: 103.34,
        close: 131.25,
      },
      {
        time: "2018-12-29",
        open: 131.33,
        high: 151.17,
        low: 77.68,
        close: 96.43,
      },
      {
        time: "2018-12-30",
        open: 106.33,
        high: 110.2,
        low: 90.39,
        close: 98.1,
      },
      {
        time: "2018-12-31",
        open: 109.87,
        high: 114.69,
        low: 85.66,
        close: 111.26,
      },
    ]);

    // const areaSeries = chart.current.addAreaSeries({
    //   topColor: 'rgba(38,198,218, 0.56)',
    //   bottomColor: 'rgba(38,198,218, 0.04)',
    //   lineColor: 'rgba(38,198,218, 1)',
    //   lineWidth: 2
    // });

    // areaSeries.setData(areaData);
    /*
        const volumeSeries = chart.current.addHistogramSeries({
            color: "#485c7b",
            lineWidth: 2,
            priceFormat: {
                type: "volume"
            },
            overlay: true,
            scaleMargins: {
                top: 0.8,
                bottom: 0
            },
            priceLineVisible: false,
            grid: {
                vertLines: {
                    visible: false,
                },
                horzLines: {
                    color: "#363636"
                }
            },
        });
        volumeSeries.setData(volumeData);
        */
  }, []);

  // Resize chart on container resizes.
  useEffect(() => {
    resizeObserver.current = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      chart.current.applyOptions({ width, height });
      setTimeout(() => {
        chart.current.timeScale().fitContent();
      }, 0);
    });

    resizeObserver.current.observe(chartContainerRef.current);

    return () => resizeObserver.current.disconnect();
  }, []);

  return (
    <>
      <div
        ref={chartContainerRef}
        className="chart-container"
        // style={{ height: "100%" }}
      />
    </>
  );
}

export default Chart;
