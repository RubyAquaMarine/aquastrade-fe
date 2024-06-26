# LaunchPad: Create Tokens

https://aquas.trade/dashboard/create

Tokens are automatically listed on the exchange and are ready for trading. A datafeed is created when new tokens are deployed through Aquas.Trade Token Launch Pad

## Access

You will need (1) NFT from Aquas.Trade [nft-collection](./NFT.md)

- gold , silver, bronze

## How to pull off a successful Token Creation

At Aquas.Trade its easy, so let's LFG!

- Launch the token
- Buy up most of the tokens in 1 tx
- Presale - IDO 50% to 80%
- Use Token [Airdrop](./Airdrop.md) (Gold Members have access only) and airdrop 20-50% tokens to your selected audience/target/community

# IDO : Initial DEX Offering : Token Presales

https://aquas.trade/dashboard/presale

- CA: [presale](../src/app/Utils/config.ts#88)
- Purchase Presale Tokens with `USDC, USDT, USDP, and DAI`
- No whitelisting, No expiration, buy what you can, when you can, and without slippage.
- 0.3% of proceeds are automatically used to purchase AQUA and sent to BURNER

## Public Functions

To create a new IDO

- 1. pause and withdraw tokens from the current IDO with function call: `withdrawTokens` (current IDO owner)
- 2. `setToken` : Enter Token address : `isPaused` becomes false: and New IDO Owner exists
- 3. `setTokenPrice` : Enter Token price in wei ( if using block explorer ) or Human amount (Website UI, TelegramBot)
- 4. `setMaxAllocation` : Enter Max Amount of Tokens a user can buy at once in wei ( if using block explorer ) or Human amount (Website UI, TelegramBot)

Pause and Restart IDO:

- 1. `withdrawlTokens`: pauses the IDO and sends tokens back to IDO owner.
- 2. transfer tokens back to Smart Contract.
- 3. `startSale` : `token-price` and `token-max-allocation` are saved in state. Adjust if neccasry.

## Admin Functions:

- 1. `restartSale` : returns the remaining tokens to the presaleOwner , resets presale owner to admin
- 2. `pauseSale` : make listing available to public.
