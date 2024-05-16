# AquasFeed

Not an Oracle, since there's only one relayer. Therefore, on-chain DataFeed is more appropiate.

## ConsumeFeed

read contract function call below:

- `Feeds` or `consumeFeed` : input `_FeedID` : returns `index, router, pooladdress, tokenQoute, tokenBase,DataFeedprice, AmmPoolPrice`

- `consumeFeeds` : returns `index, router, pooladdress, tokenQoute, tokenBase,DataFeedprice, AmmPoolPrice`

- `getPriceWithAddress` : returns `DataFeedprice`
- `getPoolPriceWithAddress` : returns `AmmPoolPrice`

## Solidity

```solidity
struct Feed {
        uint256 id;
        address router;
        address pool;// LP Token Address
        address quote;
        address base;
        uint256 priceFeed;
        uint256 pricePool;
    }
```

## Read

- `FeedID` = Total feeds available
- `FeedMaximum` = Total feeds available

## addDataFeed

Must be NFT Holder : Gold : `0xcEcd42ff7eCC7b0BfF7a9CF95C6e7ce9aA052d8C`

Example

- `addDataFeed` : call function with input `params` : (lp, tokenQuote, tokenBase)
- LP : `0x8A8F3eb590Cf06260c5A220837156B19189C4233`
- USDP : `0x73d22d8a2D1f59Bf5Bcf62cA382481a2073FAF58`
- AQUA : `0xF7F957D88768126916dAF3C1705D13C291d2B7D8`

# USDC-AQUA (lp, usdc, aqua)

```
0x7CE47dA2789267B254e243e45A216Ef6897E5840
```

```
0x5F795bb52dAC3085f578f4877D450e2929D2F13d
```

```
0xF7F957D88768126916dAF3C1705D13C291d2B7D8
```

# USDT-AQUA (lp, usdt, aqua)

```
0x63dbf029c2D21b5686bd2E855D4befa71aaB8c41
```

```
0x1c0491E3396AD6a35f061c62387a95d7218FC515
```

```
0xF7F957D88768126916dAF3C1705D13C291d2B7D8
```

# USDP-AQUA (lp, usdp, aqua)

```
0x8A8F3eb590Cf06260c5A220837156B19189C4233
```

```
0x73d22d8a2D1f59Bf5Bcf62cA382481a2073FAF58
```

```
0xF7F957D88768126916dAF3C1705D13C291d2B7D8
```

# DAI-AQUA (lp, usdp, aqua)

```
0xE3079C9Dcd700d6736f80fd83D603877f05cc6d3
```

```
0xD05C4be5f3be302d376518c9492EC0147Fa5A718
```

```
0xF7F957D88768126916dAF3C1705D13C291d2B7D8
```
