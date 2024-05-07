# How to add your erc20 token

- A. deploy token on ETH (Bridge to SKALE).
- B. deploy on SKALE with Aquas.Trade [Launch Pad](https://aquas.trade/dashboard/create).

## Step 1

- `aquastrade-fe/src/app/Utils/config.ts`

- find `tokenSymbols` and `tokenAddresses` then add your Token Name with Symbol, Address, Decimal, Logo info.

- add Logo.svg or .png to `aquastrade-fe/public`: or share via github/email/telegram.

## Step 2 (if deployed via type A)

https://aquas.trade/swap/amm

- add liquidity

# How to add your erc20 token to Metaport (bridge)

- A. Deploy [wrapper contract](https://github.com/RubyAquaMarine/skale-token-deployer/blob/main/contracts/ERC20Wrapper.sol) " Reach out to us, we can deploy the wrapper for you. You will need to proceed with step B (contact other chain owners).

- B. If you deployed your token through Aquas.Trade, your token is ready to go ( all Token Roles were granted at deployment and you can reach out to any SKALE Chain owner to whitelist your token on their chain to complete the metaport configuration).
