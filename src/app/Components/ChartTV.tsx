// not using 
// @ts-nocheck
import { createChart } from "lightweight-charts";

export function initChart() {
  const chart = createChart(document.body, { width: 400, height: 300 });

  const candlestickSeries = chart.addCandlestickSeries({
    upColor: "#26a69a",
    downColor: "#ef5350",
    borderVisible: false,
    wickUpColor: "#26a69a",
    wickDownColor: "#ef5350",
  });

  /*
    candlestickSeries = chart.addCandlestickSeries({
        upColor: '#00C805',
        downColor: '#FF5000',
        wickUpColor: '#00C805',
        wickDownColor: '#FF5000',
    });
    */

  candlestickSeries.setData([
    { time: "2018-12-22", open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
    { time: "2018-12-23", open: 45.12, high: 53.9, low: 45.12, close: 48.09 },
    { time: "2018-12-24", open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
    { time: "2018-12-25", open: 68.26, high: 68.26, low: 59.04, close: 60.5 },
    { time: "2018-12-26", open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
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
    { time: "2018-12-30", open: 106.33, high: 110.2, low: 90.39, close: 98.1 },
    {
      time: "2018-12-31",
      open: 109.87,
      high: 114.69,
      low: 85.66,
      close: 111.26,
    },
  ]);

  chart.timeScale().fitContent();

  // then fetch data on Min 1 intervals
  candlestickSeries.update({
    time: "2018-12-31",
    open: 109.87,
    high: 114.69,
    low: 85.66,
    close: 112,
  });

  chart.applyOptions({
    layout: {
      background: {
        type: LightweightCharts.ColorType.Solid,
        color: "#1A1A1A",
      },
      textColor: "#707070",
    },
    grid: {
      vertLines: {
        color: "#292929",
        style: 1,
        visible: true,
      },
      horzLines: {
        color: "#292929",
        style: 1,
        visible: true,
      },
    },
    timeScale: {
      timeVisible: true,
    },
    crosshair: {
      mode: 0,
      vertLine: {
        width: 0.5,
        labelBackgroundColor: "#3D3D3D",
      },
      horzLine: {
        width: 0.5,
        labelBackgroundColor: "#3D3D3D",
      },
    },
  });

  async function onVisibleLogicalRangeChanged(newVisibleLogicalRange) {
    //console.log('lvc', newVisibleLogicalRange);
    // returns bars info in current visible range
    const barsInfo = candlestickSeries.barsInLogicalRange(
      newVisibleLogicalRange,
    );
    //console.log(barsInfo);
    if (barsInfo !== null && barsInfo.barsBefore < 5) {
      // try to load additional historical data and prepend it to the series data
      // use setData with additional data prepended
      if (isLoadingCandles) return;
      const resolution = get(chartResolution);
      // console.log('load left resolution', resolution);
      // console.log('load additional data to the left');
      isLoadingCandles = true;
      await loadCandles(
        resolution,
        start - lookbacks[resolution],
        end - lookbacks[resolution],
        true,
      );
      isLoadingCandles = false;
    }
  }

  function onVisibleTimeRangeChanged(newVisibleTimeRange) {
    //console.log('vc', newVisibleTimeRange);
  }

  chart.timeScale().subscribeVisibleTimeRangeChange(onVisibleTimeRangeChanged);

  chart
    .timeScale()
    .subscribeVisibleLogicalRangeChange(onVisibleLogicalRangeChanged);

  loadPositionLines();

  applyWatermark();
}

// timezone corrected time in seconds
function correctedTime(time) {
  const timezoneOffsetMinutes = new Date().getTimezoneOffset();
  //console.log('timezoneOffsetMinutes', timezoneOffsetMinutes);
  return time - timezoneOffsetMinutes * 60;
}

export function applyWatermark() {
  const _product = get(product).symbol;
  if (!_product) return;
  chart &&
    chart.applyOptions({
      watermark: {
        color: "#292929",
        visible: true,
        text: _product,
        fontSize: 48,
        horzAlign: "center",
        vertAlign: "center",
      },
    });
}

export async function setResolution(_resolution) {
  chartResolution.set(_resolution);
  localStorage.setItem("chartResolution", _resolution);
  chartLoading.set(true);
  await loadCandles(_resolution);
  chartLoading.set(false);
}

export async function loadCandles(
  _resolution,
  _start,
  _end,
  prepend,
  productOverride,
) {
  _resolution = get(chartResolution);

  // console.log('called loadCandles', _resolution, _start, _end, prepend);

  let _product = productOverride || get(product).symbol;

  // console.log('candlestickSeries', Boolean(candlestickSeries));
  // console.log('_product', _product);

  if (!candlestickSeries || !_product) {
    // try again
    // console.log('attempting chart again...');
    setTimeout(() => {
      loadCandles(
        _resolution,
        _start,
        _end,
        false,
        !_product ? "ETH-USD" : false,
      );
    }, 2000);
    return;
  }

  _resolution = get(chartResolution);

  //console.log('_product', _product);
  //console.log('resolution', _resolution, lookbacks[_resolution]);

  if (!_start || !_end) {
    // test
    _start = Date.now() - lookbacks[_resolution];
    _end = Date.now();
  }

  start = _start;
  end = _end;

  // console.log('start, end', start, end, new Date(start).toString(), new Date(end).toString());

  const url_start = encodeURIComponent(new Date(start).toUTCString());
  const url_end = encodeURIComponent(new Date(end).toUTCString());

  const response = await fetch(
    `https://api.exchange.coinbase.com/products/${_product}/candles?granularity=${_resolution}&start=${url_start}&end=${url_end}`,
  );
  const json = await response.json();

  if (!json || !Array.isArray(json)) {
    return console.log("json invalid", json);
  }

  if (prepend) {
    // prepend candles to existing set
    let prepend_set = [];
    for (const item of json) {
      prepend_set.push({
        time: correctedTime(item[0]),
        low: item[1],
        high: item[2],
        open: item[3],
        close: item[4],
      });
    }
    prepend_set.reverse();
    candles = prepend_set.concat(candles);
  } else {
    candles = [];
    for (const item of json) {
      candles.push({
        time: correctedTime(item[0]),
        low: item[1],
        high: item[2],
        open: item[3],
        close: item[4],
      });
    }
    candles.reverse();
  }

  //console.log('data', data);

  // set data
  candlestickSeries.setData(candles);

  //chart.timeScale().fitContent();
}

export function onNewPrice(price, timestamp, _product) {
  // add data point to current candle set
  // use update with time = last time for this resolution
  // get last data point to update ohlc values based on given data point

  //candlestickSeries.update({ time: '2019-01-01', open: 60.71, high: 60.71, low: 53.39, close: 59.29 });

  const symbol = get(product).symbol;

  if (_product != symbol) return;

  let lastCandle = candles[candles.length - 1];

  if (!lastCandle) return;

  timestamp = correctedTime(timestamp / 1000);

  const resolution = get(chartResolution);

  if (timestamp >= lastCandle.time + resolution) {
    // new candle
    let candle = {
      time: parseInt(resolution * parseInt(timestamp / resolution)),
      low: price,
      high: price,
      open: price,
      close: price,
    };
    candles.push(candle);
    candlestickSeries.update(candle);
  } else {
    // update existing candle
    if (lastCandle.low > price) lastCandle.low = price;
    if (lastCandle.high < price) lastCandle.high = price;
    lastCandle.close = price;

    candles[candles.length - 1] = lastCandle;
    candlestickSeries.update(lastCandle);
  }
}

let pricelines = [];

export function loadPositionLines() {
  return; // disabled for now

  //console.log('loadPositionLines');

  if (!candlestickSeries) {
    //console.log('nope2');
    setTimeout(loadPositionLines, 2000);
    return;
  }

  clearPositionLines();

  const _positions = get(positions);

  //console.log('_positions', _positions);

  for (const _pos of _positions) {
    //if (!_pos.price) continue;

    pricelines.push(
      candlestickSeries.createPriceLine({
        price: _pos.price * 1 + 4280,
        color: "green",
        lineWidth: 2,
        lineStyle: LightweightCharts.LineStyle.Dotted,
        axisLabelVisible: true,
        title: _pos.amount,
      }),
    );
  }
}

function clearPositionLines() {
  for (const priceline of pricelines) {
    candlestickSeries.removePriceLine(priceline);
  }
  pricelines = [];
}
