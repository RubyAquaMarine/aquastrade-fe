# Double check everything

- sfuel - ok
- amm - everything worked (better UX : after tx : reset UI values to 0 :retrigger approvals)
- coinflip : ui doesn't update after flip : win/loss
- nft marketplace needs mockup :
- ido
- airdrop
- etc

- - Improvements :

snake_case all css

# amm

if pool reserves exist, don't do multi hop swap : allow the trader to swap on that pool. but offer the multi hop if better liquidity.

---

Token List

- scrollable list
- search

---

---

---

---

---

---

---

# add new tokens automatically

- `createTokenList.ts` : creates a token list based on the AquasFeed DB, which means , new tokens are added automatically. to ui ( almost done :)
- todo : redeploy to aquasFeed and memeCreator smartContracts
- todo : fetch explorer for new token details `useSkaleExplorer`

- memeCreator : as tokens are created, amm pool and datafeed will be created.
- - the frontend relies on the SC data and not on outside/centralized DB , Frontend will be responsive to any latest information

how to update the tokenList ( must enable any token listing: how to handle logos? ). or get the available symbols via the AquasFeed

- - `PoolAssetQuote` and `PoolAssetBase`
- new `getAllBaseAssets` , and then filter out duplicates. Fetch this data everytime user connects wallet :
- - can I still use the const tokenList information as a base, then add on top (if any new pools/assets were created)

# Load Data when user connects

- TokenList -rpc 2 calls
- sFuel - rpc - 1 call
- Token Balances ( block explorer api ) - 1 call

amm UI relies on the tokenList assets : not the Pool:Addresses

need to redesign stuff `poolsAtAqua` : hardcoded , but can be loaded via consumeFeeds from `AquasFeed`

- actually everything that the frontend needs is alread within this 1 function call ^^^^^^

# CoinGecko listing

- requires api for coin circulating amounts

# any button can POST to DB

- `swap_button` : trading volume, # of swaps, number for users : good db to have
- - how would the db work : just POST info on swap, then fetch and manipulate data as needed in UI

- `buy_nft` : available data would be users_wallet : eth_amount (figure out the nft collection via amount)
- - can show NFT sales volume , total number of nfts sold

- `flip_aqua` : log the user_wallet , how_many_flips
- - show number of game users within 24 hours in ui

- `airdrop` : log the token and Total amount
- - show number of game users within 24 hours in ui

- `deploy_token` : log the token name, token symbol , and time
- - this creates a new AMM pool, so this function should also update the DB_POOLS
- - show number Token Launch {Pads
