## DCA config

- `executeOrders` (storageID, isBuying) : Starts at index 1 (not zero)
- `GetOrderDetails`(storageID, and matching `globalID`) : the globalID is retreivable from the factory using `GetAllOrders` .

### getAllOrders

- - `globalID` : Increments ++ only from each new `SubmitDCAOrder`
- - `GetAllOrders` (storageID, traderWallet) : this returns an array of the globalIDs that are recorded within this storageID for that trader. Therefore to fetch, loop storageID, traderWallet if StorageID has orders. `GetOrderLength` : input the storageID to get the number of orders, if zero dont fetch
- `index` : the Incrementor value : globalID : you can determine your ID by fetching this value before placing order.
- To delete an order, you will need the globalID and the storageID

### GetTokenBaseUsingIndex

returns the token address assigned to base asset

### GetTokenQuoteUsingIndex

returns the token address assigned to base asset

# dev

- toast notify should have explorer link
- advanced tab ( shows the inputs) : setup default inputs otherwise
- make new component for the user orders
- add number of swaps and the expected amount size per swap in UI

# Storage ID's

- 1 : AQUA : USDP-AQUA : pool price : 187244539649409200000 => 187 244 53964 94092 00000 : meaning 1 USDP = 187 AQUA : so buying USDP (yes) min price is 99 , and max is 200 : should mean that the bot will sell aqua for usdp until pool price is 99e18

- 3 : AQUA : ETH-AQUA : pool price : 260009 011 70238 88600 00000 : 1 ETH => 260009 AQUA

- 8 : AQUA : DAI-AQUA : pool price : 103429804652244680000 : bidding 100.0

- 17: RUBY : SKL-USDP : pool price : 76 68914 75355 32000 = 0.076 68914 75355 32000 : 1 SKL = 0.076 USDP

# LastPricePrice

- Bug in LastPoolPrice : In fact decimals will be required. test on another contract before modifying AquasDCAMulti.sol

- If the Pool is USDP - AQUA , and you see a price of 187431216359569650000 , this means that 1 USDP returns 187.43 AQUA

- The pool price is always 1 Quote Asset = How many of Base Asset

- Base Asset on Aquas.Trade is AQUA in most cases.

- Base Asset on Ruby.Exchange is USDP in most cases. (double check, USDP-RUBY could be a unique test case)

# testing notes : confusing because AQUA is the base asset

- Test One

the Pool price is going up .
( is buying USDP : yes ) : use aqua to buy USDP
i am adding AQUA and removing USDP from the pool,

92642328024749950000
92683357217069610000

- Test Two

This makes price go down:
( is buying USDP : no ) : use USDP to buy AQUA
minPrice : 0.000000000000000001
max 100
