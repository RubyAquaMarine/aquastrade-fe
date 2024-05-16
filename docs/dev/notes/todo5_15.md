# UI

- https://ui.shadcn.com/
- - https://www.npmjs.com/package/tailwind-merge
- - https://www.npmjs.com/package/class-variance-authority
- - yarn add cmdk
- - yarn add @tanstack/react-table

- https://www.framer.com/motion/three-introduction/

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

# shadCN

- use this for the different Order types on the Perps page : https://ui.shadcn.com/docs/components/drawer

# UX : spinning buttons

```
 <span className={styles.spinner_padding}>
                      {isConnecting ? (
                        <span>
                          {" "}
                          {<FaSpinner className={styles.spinner_icon} />}
                        </span>
                      ) : (
                        <span> </span>
                      )}
                    </span>

```
