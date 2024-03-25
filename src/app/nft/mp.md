http://localhost:3000/marketplace

- when click of button, rerenders : fetching sc data again...... not good.
- after MM tx : fetches data again?
- after buying nft : doesn't fetch the next nft listing. still stuck on the present one
- refreshing page fetching the correct data
- - network switching and what to display when not on europa

- must approve token to Smart Contract ( ui doesn't handle any token approve as of yet)

- useCallback

# smart contract

Sold NFT become

```
[[147]]

(bool) : false
(address) : 0x0000000000000000000000000000000000000000
(uint256) : 0
(uint256) : 0
(address) : 0x0000000000000000000000000000000000000000
```

# pay token

-> useer wallet #1
---> get pay token (read) #2
------> token approvals on the pay token (read) #3

# nfts

--> collection of 3 ( different addresses)
---> getListedItems() returns every nft

# button flow

- user clicks on button -> functionList(READ/WRITE: is approved(read): if not, fire approval write popup(write) : if ok, fire nft but(write) )
