# refactor

what is the Remove Liq comp. depend. on ??

make PROPS

- fetches explorer for the token balances aka LP tokens =: `walletTokenList`
- LP address ,
- amount to remove
- math function for 100% removal of LP tokens : `setAmountLPRemove`
- set two tokens via SYMBOL

# Overivew

page (useAquaFeed) -> OverView => TableDataFeed

- adding datafeeds only for AQUA DEX to public: We can't create new pools on Ruby, so no point in offering this feature

# metaport and node versions

"engines": {
"node": ">=18.18.0 <19.0.0"
},
