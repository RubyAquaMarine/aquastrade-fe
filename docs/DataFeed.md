A simple datafeed to power the defi ecosystem. All prices are in form of selling 1 Quote asset for the Base asset.

An example

Sell 1 BTC (QUOTE) = 70,000 USD (BASE)

## Functions

- `FeedID` : total number of live datafeeds available now
- `FeedMaximum` : Total number of AMM pools available for price feed creations (Tokens on Europa must exist to create a datafeed)
- `Feeds[i]` : enter an index to fetch the feed
- `consumeFeed[i]` : enter an index to fetch the feed (same as above)

```
[
  id (uint256) : 9
  router (address) : 0x698ea133cba3bacd4aa6405411d8e8c1726d5f61
  pool (address) : 0xe9891205b75b5ebea07ede0f11b6ef58a1d8e3b1 (SKL-USDC)
  quote (address) : 0xe0595a049d02b7674572b0d59cd4880db60edc50 (SKL)
  base (address) : 0x5f795bb52dac3085f578f4877d450e2929d2f13d (USDC)
  priceFeed (uint256) : 999999111
  pricePool (uint256) : 99000
]
```

# Pools

First 4 pools are allocated for Stable - AQUA

- usdc
- usdt
- usdp
- dai

Next we have some majors paired with usdc

- btc
- eth
- skl

Then with usdt

- btc
- eth
- skl

Together there are 10 datafeeds used to normalize the prices within the skale Europa Liquidity Hub DEX ecosystem.

- Multi-Stable : pegged assets to USD
