- bug : token approve now uses the hardcoded tokenList which doesn't have any lp tokens.

# DCA on Multiple DEX

New Utilities for NFT holders and deflationary tokenomics for the AQUA token

- Cost 1 AQUA to submit orders through DCA protocol. 
- - 100% of the collected AQUA is burned. 
- - Functionality is `public` to burn.
- Gold NFT Holders are granted free access to use DCA functionality on any DEX protocol. 


## Fee 


1 AQUA token : approval is required before submitting DCA order


## Submit DCA Order

For now, use these defaults

- intervalSeconds : 60
- durationHours : 24
- minPrice : 0.000000000000000001
- maxPrice : 987654321


## DCA config

- `executeOrders` (storageID, isBuying) : Starts at index 1 (not zero)
- `GetOrderDetails`(storageID, and matching `globalID`) : the globalID is retreivable from the factory using `GetAllOrders` .

### getAllOrders

- - `globalID` : Increments ++ only from each new `SubmitDCAOrder`
- - `GetAllOrders` (storageID, traderWallet) : this returns an array of the globalIDs that are recorded within this storageID for that trader. Therefore to fetch, loop storageID, traderWallet if StorageID has orders. `GetOrderLength` : input the storageID to get the number of orders, if zero dont fetch
- `index` : the Incrementor value : globalID : you can determine your ID by fetching this value before placing order.
- To delete an order, you will need the globalID and the storageID

# WIP 
- if using AQUA to buy ASSET B, then add fee (1 aqua) to approval amount
- fetch user orders : delete orders 