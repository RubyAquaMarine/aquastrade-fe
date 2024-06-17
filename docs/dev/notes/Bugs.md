# Debugging

- Did abi change?
- did data types change?

# add Liq

- tokenB approval amount not correct

# buttons

<button type="button"> - fixed the issue : didn't fix the issue on in Wallet broswers

# screen height on mobile

.body {
flex-direction:column;
flex: 1;
height: -webkit-fill-available
overflow: scroll
}

## Metaport

AQUA => "@emotion/react": "^11.11.4",

MP => "@emotion/react": "^11.11.1",

## AMM routing

- USDC / BTC pool exists , but trad is being routed through AQUA : Turn Off MultiHop : within the settings
- Recommended route will always be with AQUA as the MultiHop if swapping non AQUA base pools. ok this should be ok for UX design.
- How to show the best routing? Or default to multihop 100% of time, or check for what Pool has the best rates (liquidity amounts, getAmountsOut logic)
- maybe make a smart contract routing for the frontend to do computations ^^

## Cast : UX

- Cast : approve token B logic doesn't work correctly. should use the GetAmountsOut value
- after adding liquidity, the tokenB approved amount is asking for approval again even though its already been approved
- after adding LP : refetch the Balances
- `% whale_size` size of users position compared to the reserves :

## AMM :

- <TokenBalance> remove all and use the api explorer to speed up ui
- - remove the onchain fetch for token balances and use the direct api from explorer

- tokens out when removing liquidity " user amount in relation to whole pool " reserves and total lp token amounts
- BUYING TOKEN QUOTE means you are using the decimals from token B for the input amount
