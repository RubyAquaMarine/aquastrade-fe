// import { createChart, ColorType } from 'lightweight-charts';
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { createChart } from "lightweight-charts";
import { CandlestickSeriesPartialOptions } from "lightweight-charts";

interface CandlestickData {
  time: string;
  /** Opening price */
  open: number;
  /** High price */
  high: number;
  /** Low price */
  low: number;
  /** Closing price */
  close: number;
}

export const candleStickOptions: CandlestickSeriesPartialOptions = {
  upColor: "#26a69a",
  downColor: "#26a69a",
  wickVisible: true,
  borderVisible: true,
  borderColor: "#26a69a",

  borderUpColor: "rgb(0, 150, 108)", // #00966c
  borderDownColor: "rgb(220, 60, 70)", // #dc3c46

  wickColor: "#737375",
  wickUpColor: "rgb(0, 150, 108)",
  wickDownColor: "rgb(220, 60, 70)",
};

const ChartComponent: React.FC<{
  children: JSX.Element;
  colors: any;
  data: CandlestickData[];
}> = ({ colors, data, children }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const handleResize = () => {
      chart?.applyOptions({
        width: window.innerWidth,
        height: window.innerHeight <= 800 ? 800 : window.innerHeight,
      });
    };

    var chart = createChart(chartContainerRef.current!, {
      width: window.innerWidth,
      height: window.innerHeight,
      rightPriceScale: {
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
        borderVisible: true,
      },
      layout: {
        textColor: "rgba(42, 46, 57, 0.6)",
      },
      grid: {
        vertLines: {
          color: "rgba(42, 46, 57, 0.6)",
        },
        horzLines: {
          color: "rgba(42, 46, 57, 0.6)",
        },
      },
    });

    var candlestick = chart.addCandlestickSeries(candleStickOptions);
    /*
    var volumeSeries = chart.addHistogramSeries({
      color: "#26a69a",
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "",
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    })
    */

    console.log(" ChartTV3 : SetData now ", data);
    // @ts-ignore: Unreachable code error
    candlestick.setData(data);

    //  volumeSeries.setData(mockVolumeData)

    chart.applyOptions({
      handleScroll: {
        horzTouchDrag: false,
        mouseWheel: false,
        pressedMouseMove: false,
        vertTouchDrag: false,
      },
      handleScale: {
        mouseWheel: false,
      },
    });

    //  chart?.timeScale().setVisibleLogicalRange({ from: 23, to: 155 })
    chart?.timeScale().fitContent();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);

      chart?.remove();
    };
  }, [data]);

  return (
    <>
      <div ref={chartContainerRef}></div>
      {children}
    </>
  );
};
export default ChartComponent;
