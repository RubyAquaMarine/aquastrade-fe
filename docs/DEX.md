# AMM

Welcome to [Aquas.Trade](https://aquas.trade/)

- When you connect your wallet to Aquas.Trade, your wallet will be transfered 0.0001 sfuel and topped up automatically on each login.

- [free sFuel: FaucetEuropa](https://elated-tan-skat.explorer.mainnet.skalenodes.com/address/0x453495a7bD8943530FdcBAEE6749795F1f07dBD3?tab=write_contract)

# Uniswap v2 AMM

AMM : Automated Market Maker provides equal amounts of liquidity for both the Quote and Base Asset.

- Mostly a simple `single hop` (ANY->AQUA and AQUA->ANY) or `multi hop` (ANY -> AQUA -> ANY)
  \*\* `ANY` represents all tokens within the `token-list`
- Alpha: UI and UX rapidly changing.
- Better liquidity routing and liquidity aggregation coming soon.

## Contract Adresses

- Uniswap Factory CA: `0xc318a82CB7c2B0faf7e355BB8F285016956aBF55`
  - - https://elated-tan-skat.explorer.mainnet.skalenodes.com/address/0xc318a82CB7c2B0faf7e355BB8F285016956aBF55

# How to guide

## Trade => swap tokens

0. Select `top-input-token` (you are selling this token) and select `bottom-input-token` ( you will receive this token).
1. The `top-input-amount` is the amount of tokens that you want to trade for `token b`
2. Approve Button will appear: click to approve the token transfer
3. Click the `Swap` button and complete the request within your web3 wallet.

###

- The `wallet-balance` shows the `top-input-token` balance within your wallet.

- The `approved` shows a button `Approve` or the `approved-amount` if an amount has been approved to the smart contract (Uniswap Router: Aggregation Router).

- The `receive` amount is automatically calculated based on a single or multi hop route. This means that more than one amm pool may be used to route your orders.

- `Loading Pool Data` : waiting on rpc api
- `Multi ` : this is a `multi hop` route

## Cast => add liquidity

0. Select `top-input-token` and select `bottom-input-token`
1. The `top-input-amount` is the amount of tokens that you to allocate to the AMM pool. The `bottom-input-amount` is automatically calculated based on the `token-a` input amount.
2. Approve Buttons will appear for both assets: click to approve the token transfers.
3. Click the `Cast Line` button and complete the request within your web3 wallet.

- - Click the `Build Boat` button to create a new liquidity pool.

###

- The `bottom-input-amount` is `0.0` : You are about to create a new liquidity pool. Calculating the pool price can be tricky.

## Ship => remove liquidity

0. Select `top-input-token` and select `bottom-input-token`
1. The `top-input-amount` is the `%` amount of liquidity that you want to remove from the pool.
2. Click the `Set Sail` button and complete the request within your web3 wallet.

# Fees

- Max fee trader pays is 0.30% from input token.
- 75% of fee goes to you (Liquidity Provider)
- 25% of fee goes to AquasDevFund : [Treasury](./AQUA.md#treasury)

DCA Orders:

- 1 [$AQUA](/docs/AQUA.md)

# Admin Core

- Public key that calls the `AquasFeed` : 0x7256Bfa487B3A259849E4DAa6364652f8555e6a3

- Public key that calls the `AqiasDCAMulti` : 0x6441BA5Ae36BcC9094bb85D50f3d1e08C2b0D887

- Public key that calls the `FaucetEuropa` : 0xb0e40A08c28b8BDF09AA2b1c5A17cb5230f42Eed
