# DCA

Welcome to [Aquas.Trade](https://aquas.trade/)

# on-chain DCA on any DEX

New Utilities for NFT holders and deflationary tokenomics for the AQUA token

- Cost 1 AQUA to submit orders through DCA protocol.
- - 100% of the collected AQUA is burned.
- - Functionality is `public` to burn.
- [Gold NFT](https://aquas.trade/nft) Holders are granted free access to use DCA functionality on any DEX protocol.

## Fee

- 1 AQUA token
- - approval is required before submitting DCA order

## Submit DCA Order

For now, use these defaults within the UI:

- input amount should be 0.1 or more
- intervalMinutes : 1
- durationHours : 24 (set min to 1 for button and add :number)
- minPrice : 0.000000000000000001
- maxPrice : 987654321

## Report bugs

[Github: issues ](https://github.com/RubyAquaMarine/aquastrade-fe/issues)

### WIP

- add number of swaps and the expected amount size per swap in UI to check for errors, swap_minimums_getAmountsOut,etc
- bug in approval amounts , the 1 AQUA about is being added to usdt, etc and messes up the amounts by \*\*12

# tldr

- `executeOrders` (storageID, isBuying) : Starts at index 1 (not zero)
- `GetOrderDetails`(storageID, and matching `globalID`) : the globalID is retreivable from the factory using `GetAllOrders` .
- `globalID` : Increments ++ only from each new `SubmitDCAOrder`
- `GetAllOrders` (storageID, traderWallet) : this returns an array of the globalIDs that are recorded within this storageID for that trader. Therefore to fetch, loop storageID, traderWallet if StorageID has orders. `GetOrderLength` : input the storageID to get the number of orders, if zero dont fetch
- `index` : the Incrementor value : globalID : you can determine your ID by fetching this value before placing order.
- To delete an order, you will need the globalID and the storageID

- `GetTokenBaseUsingIndex` : returns the token address assigned to base asset

- `GetTokenQuoteUsingIndex` : returns the token address assigned to quote asset

# Advanced Traders

At AquasTrade we enjoy trading as much as a trading bot, but we're human and get tired.
