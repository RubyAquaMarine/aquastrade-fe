# AquasTrade

APP ROUTER Project

- scr/app/pages (all lowercase)
- - /Components
- - /api (reserved specifically for nextjs) : fetch data, manipulate and return to Components
- - /Hooks : <b> use</b>HookFuntionName , make custom useEffect for example [useHandleWrongNetwork](/src/app/Hooks/useHandleWrongNetwork.ts)


## Project List 

- DappRadar integration
- DexTools : Also you can add a brief description of your project, explaining the main uses and advantages of your token and you can add your circulating supply too.
- - https://docs.google.com/forms/d/e/1FAIpQLSd1BAqjAl9nntlS2mOk76tE0Q-dEf-AT1bUblDXikjZ-PNP1Q/viewform


## Branch

branch: `fix-build`

# prettier

npx prettier . --write

- added // @ts-nocheck to coinflip , swap/amm
- skale needs to update MetaPort : required @rainbow-me/rainbowkit@"^1.1.1" from skale_metaport@2.0.3-develop.8
- - peer viem@"~0.3.19 || ^1.0.0" from @rainbow-me/rainbowkit@1.3.6
- - tested with node v20.xx. today : Metaport requires v18

## main 

- walletConnect ID
- gas Wallet Balance : for the skale bridge. does user have funds within the gasWallet: show this in the navigator

- slider for leverage adjustments ( default white themed)
- dropdown-menu for navigation (default white themed)



# api : database

- what data would be userful to others : AQUA circulating supply
- POST : when user buys nft to add to whitelist of $AQUA airdrops



## amm

(working)

http://localhost:3000/swap/amm

- getAmountsOut : display to user + slippage stats
- addLiqudity tokenB Amount : Auto-fill amounts
- add liquidity doesn't work for WriteContract
- gear icon has no functionality yet


## coinflip 

(working)

http://localhost:3000/dashboard/coinflip


- show Contract Balance as the Max Prize aka = MAX BET
- balance returns a huge value ...
- fetches on each input change : change this to useRef
- websocket does retrieve latest info, must disconnect and reconnect
- - promiseALL : multiCall read ^^
- `write:` approve erc20, flip , withdraw ,
- `read:` wins, losses, balance <"Component">
- coinflip still returns `115792089237316195423570985008687907853269984665640564039057.584007913129639936`
- coinflip : userAllowance move into a components ( atm button click fetches allowance twice )
- this `typeof token_balance === 'bigint' ? (` fixes the issue with showing the MAX_INT when object is undefined (coinFlip)
- <TokenApprove> click to revoke (if value is shown) : else approve


## nft

(working)

http://localhost:3000/nft

- nft ( `read:` marketplace contract , eth allowance, `write:` approve, write buy nft)
- market place is working but the readContract isn't smooth : fetches : renders too often

### NFT Market Place

The marketplace will use $AQUA as the asset with router swapping to allow user to buy any nft with any asset within their wallet.


## perps

(working)

http://localhost:3000/perp

- Perps Landing Page
- begin trading button ( POW : faucet : sfuel and 0.000001 USDC)

## user

(working)

http://localhost:3000/user/0xCDeb7F7974D89Fd71089487D65AA9731d7E846F5

- tokenList page with chainID 1 providers?
- show supported chains near header for easy switching to check balances ( skale chains only for now : rpc providers for other chains ....)

# Metaport 2.0

its working again : before there were issues with rainbowkit connection ( clicking on browserWallet button didn't connect)

- css preload errors : https://stackoverflow.com/questions/76219016/how-to-fix-link-preload-warning-in-next-js-app
  -- WalletLinkWebSocket.js:98 WebSocket connection to 'wss://www.walletlink.org/rpc' failed: WebSocket is closed before the connection is established.

## Charts

- https://tradingview.github.io/lightweight-charts/docs/api/interfaces/ISeriesApi#setdata
- websocket live data for perps using binance
- timeframe toggle
- asset/market/ section drop down menu , needs to import a list of markets , need to fetch markets , need to design how to layout the markets : is this spot or futures api data?

### chart plugins

- https://github.com/tradingview/lightweight-charts/tree/0eef9d7dcc4c0ab67234003ab23f0880f82fa518/plugin-examples
- https://tradingview.github.io/lightweight-charts/plugin-examples/
- https://github.com/tradingview/lightweight-charts/tree/master/plugin-examples/src/plugins/trend-line/example

 
## Type-script

// @ts-nocheck
{/_ @ts-ignore: Unreachable code error_/}

### Errors

1. ./node_modules/@metamask/sdk/dist/node/es/metamask-sdk.js
   Module not found: Can't resolve 'encoding'

solution :

- Deleting .next folder
- yarn add -D encoding
