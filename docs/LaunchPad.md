# Token Create

https://aquas.trade/dashboard/create

## todo

show the balance
available tokens to mint based on the available AQUA Balance: Balance will be refilled periododicly

- gold , silver, bronze

# How to pull off a successful Token Creation

- Launch the token
- buy up most of the tokens in 1 tx
- Presale - IDO 50% to 80%
- Use Token [Airdrop](./Airdrop.md) (Gold Members have access only) and airdrop 20-50% tokens to your selected audience/target/community

# Initial DEX Offering (IDO)

https://aquas.trade/dashboard/presale

- CA: `0xA88b25EBb3cb5B0f08124e8FFBc6249aE026cB07`
- Purchase Presale Tokens with `USDC, USDT, USDP, and DAI`
- No whitelisting, No expiration, Just Ape what you can, when you can, and without slippage.

Functions:

- `setToken` : can be called by public when `isPaused` is true
- `isPaused` : is true when the presale owner removes the tokens or the admin restarts the presale contract.
- `restartPresale` : returns the remaining tokens to the presaleOwner and makes the next listing available to public.
