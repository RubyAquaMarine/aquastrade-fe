import { useRef, useLayoutEffect } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";

const ChartComponent: React.FC<{
  colors: any;
  children: JSX.Element;
  data: any;
  stream: any;
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

  useLayoutEffect(() => {
    const handleResize = () => {
      chart?.applyOptions({
        width: window.innerWidth - 48,
        height: window.innerHeight - 300,
      });
    };
    var chart = createChart(chartContainerRef.current!, {
      width: window.innerWidth - 48,
      height: window.innerHeight - 300,
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
    });

    // True : live data 
    // false : historical works 
    // 55555

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

    // input historical data
    if (!props?.stream) {

      console.error("TV (set up) historical data ++++++++++++++++++++");

      if (props?.data[0] && props?.data[0].length > 1) {
        console.error("TV set Historical data Candles", props?.data[0]);
        candlestick.setData(props.data[0]);
      }

      if (props?.data[1] && props?.data[1].length > 1) {
        console.error("TV set Historical data Volume ", props?.data[1]);
        volumeSeries.setData(props.data[1]);
      }

      chart.applyOptions({
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


      volumeSeries.priceScale().applyOptions({
        scaleMargins: {
          top: 0.75, // highest point of the series will be 70% away from the top
          bottom: 0,
        },
      });

      candlestick.priceScale().applyOptions({
        scaleMargins: {
          top: 0.02,
          bottom: 0.02,
        },
      });

      console.error("TV (set up) done ");

    }

    // input stream data
    if (props?.stream && props?.stream?.time) {
      console.error("TV (container) update  stream", props?.stream, " ContainerID: ", chartContainerRef?.current);

      candlestick.update(props?.stream);
    }





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
    props?.stream,
  ]);

  return (
    <>
      <div ref={chartContainerRef}></div>
      {props.children}
    </>
  );
};
export default ChartComponent;
