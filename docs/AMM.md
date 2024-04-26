# Gas is free

When you connect your wallet to Aquas.Trade, your wallet will be transfered 0.0001 sfuel and topped up automatically on each login.

- [free sFuel: FaucetEuropa](https://elated-tan-skat.explorer.mainnet.skalenodes.com/address/0x453495a7bD8943530FdcBAEE6749795F1f07dBD3?tab=write_contract)

# Uniswap v2 AMM Pool type liquidity

- Alpha: UI and UX rapidly changing. Better liquidity routing and liquidity aggregation coming soon. Mostly a simple `single hop` (ANY->AQUA and AQUA->ANY) or `multi hop` (ANY -> AQUA -> ANY)
  \*\* `ANY` represents all tokens within the `token-list`

## Trade - swap

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

## Cast - add liquidity

0. Select `top-input-token` and select `bottom-input-token`
1. The `top-input-amount` is the amount of tokens that you to allocate to the AMM pool. The `bottom-input-amount` is automatically calculated based on the `token-a` input amount.
2. Approve Buttons will appear for both assets: click to approve the token transfers.
3. Click the `Cast Line` button and complete the request within your web3 wallet.

- - Click the `Build Boat` button to create a new liquidity pool.

###

- The `bottom-input-amount` is `0.0` : You are about to create a new liquidity pool. Calculating the pool price can be tricky.

## Ship = remove liquidity

0. Select `top-input-token` and select `bottom-input-token`
1. The `top-input-amount` is the `%` amount of liquidity that you want to remove from the pool.
2. Click the `Set Sail` button and complete the request within your web3 wallet.
