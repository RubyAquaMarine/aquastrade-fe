// using this on the home page
// @ts-nocheck
"use client";

import { useRef, useLayoutEffect } from "react";
import { createChart } from "lightweight-charts";

const ChartComponent: React.FC<{
  colors: any;
  children: JSX.Element;
  data: any;
}> = (props) => {
  const {
    colors: {
      backgroundColor = "#462626",
      lineColor = "#2962FF",
      textColor = "white",
      areaTopColor = "#2962FF",
      areaBottomColor = "rgba(41, 98, 255, 0.28)",
    },
  } = props;
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const CHART_WIDTH_OFFSET = 0;
  const CHART_HEIGHT_OFFSET = 74; // removes the header height 52 for header :

  useLayoutEffect(() => {
    const handleResize = () => {
      chart?.applyOptions({
        width: window.innerWidth - CHART_WIDTH_OFFSET,
        height: window.innerHeight - CHART_HEIGHT_OFFSET,
        handleScroll: {
          horzTouchDrag: false,
          mouseWheel: false,
          pressedMouseMove: false,
          vertTouchDrag: false,
        },
        handleScale: {
          mouseWheel: false,
          axisPressedMouseMove: false,
        },
      });
    };

    const chart = createChart(chartContainerRef.current!, {
      width: window.innerWidth - CHART_WIDTH_OFFSET,
      height: window.innerHeight - CHART_HEIGHT_OFFSET,
      rightPriceScale: {
        scaleMargins: {
          top: 0.4,
          bottom: 0.4,
        },
        borderVisible: true,
      },
      layout: {
        background: { color: "#0d0d10" },
        textColor: "#d1d4dc",
      },
      grid: {
        vertLines: {
          color: "#0d0d10",
        },
        horzLines: {
          color: "#0d0d10",
        },
      },
    });

    var candlestick = chart.addCandlestickSeries({
      upColor: "rgba(38,198,218, 0.56)",
      downColor: "rgba(239,83,80, 0.4)",
    });

    var volumeSeries = chart.addHistogramSeries({
      color: "rgba(38,198,218, 0.56)",
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "",
    });

    candlestick.priceScale().applyOptions({
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

    const [candlestickData, volumeSeriesData] = props.data;

    candlestick.setData(candlestickData);

    volumeSeries.setData(volumeSeriesData);

    chart?.applyOptions({
      handleScroll: {
        horzTouchDrag: false,
        mouseWheel: false,
        pressedMouseMove: false,
        vertTouchDrag: false,
      },
      handleScale: {
        mouseWheel: false,
        axisPressedMouseMove: false,
      },
    });

    //  chart?.timeScale().setVisibleLogicalRange(null)

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);

      chart?.remove();
    };
  }, [
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
    props?.data,
  ]);

  return (
    <>
      <div ref={chartContainerRef}></div>
      {props.children && props.children}
    </>
  );
};
export default ChartComponent;
