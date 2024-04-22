- btc halving

- .babelrc file added , some build issues, then removed \_.babelrc

# Mobile Version

- https://tailwindcss.com/docs/max-width
- https://v1.tailwindcss.com/docs/top-right-bottom-left#class-reference
- remove the header links and default to Menu bar only
- amm trading panel could look better on mobile iphone (make container smaller)
- dashboard text too wide : use same css as marketplace page

# Perps

working chart with historical data and ws: but renders two charts in `yarn dev` and only 1 chart in `prod` => good

- /ComponentsChartTV2.1 (/perp/ethusdt)
- /ComponentsChartTV2.2 (/perpws/ethusdt)
- work on this one
- - loads static data then gets over written with ws data : timestamps?

timestamps are correct. Now the kline 1m wss is matched with 1m kline historical data. timestamps match is bar[999] : where is logic to compare or make a new bar?

- - - build function that gets the symbol - ethusdt ; substract "usdt" and toUpperCase
- - - get logo by ^^ Symbol ETH , BTC , etc automatically
