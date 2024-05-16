# Home

- regEx on all inputs : prevent ui crash from entering non number

# Token Approve

- doesn't reset after successful tx. user needs to switch assets ( toggle), or menu toggle to reset the TokenApprove componment

# Cast : UX

- Cast : approve token B logic doesn't work correctly. should use the GetAmountsOut value
- after adding liquidity, the tokenB approved amount is asking for approval again even though its already been approved
- after adding LP : refetch the Balances
- size of users position compared to the reserves : % whale_size
- AmmPools component. work on this. if no pool exists, notify user to create a pool "loading pool data..."
- new feature: click on the wallet-balance to insert `max` balance amount

# DCA

- get the same LastPoolPrice calculations within the UI
- after selecting the POOL : show the POOL price below the input
- - ( no styling: Price: 123.00 )


# Wallet Address switching on Token List page

# AMM :

- <TokenBalance> remove all and use the api explorer to speed up ui
- - remove the onchain fetch for token balances and use the direct api from explorer

- tokens out when removing liquidity " user amount in relation to whole pool " reserves and total lp token amounts
- BUYING TOKEN QUOTE means you are using the decimals from token B for the input amount
