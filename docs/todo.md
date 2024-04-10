# AquasTrade
APP ROUTER Project

- scr/app/pages (all lowercase)
- - /Components
- - /api (reserved specifically for nextjs) : fetch data, manipulate and return to Components
- - /Hooks : <b> use</b>HookFuntionName , make custom useEffect for example [useHandleWrongNetwork](/src/app/Hooks/useHandleWrongNetwork.ts)

# prettier

npx prettier . --write [docs](https://prettier.io/docs/en/install)


# dependencies

- https://redux.js.org/usage/nextjs
- https://github.com/kirill-konshin/next-redux-wrapper

# Very Important

- DappRadar integration
- DexTools : Also you can add a brief description of your project, explaining the main uses and advantages of your token and you can add your circulating supply too.
- - https://docs.google.com/forms/d/e/1FAIpQLSd1BAqjAl9nntlS2mOk76tE0Q-dEf-AT1bUblDXikjZ-PNP1Q/viewform

# todo

- walletConnect ID
- gas Wallet Balance : for the skale bridge. does user have funds within the gasWallet: show this in the navigator
- slider for leverage adjustments ( default white themed)
- dropdown-menu for navigation (default white themed)

## redesign

- "styled-components": "5.3.11",
- https://www.npmjs.com/package/styled-components

# App

- ui : loading page for home page
- fetches data twice : server and client: double check, client seems to render 2 times

# AQUA token

Ideas

- - airdrop $AQUA to all nft holders quarterly for the next 10 years : bullish for nft holders/marketPlace 
- - after NFTS are sold out, make new Market       Place SC for AQUA token instead of ETH => Bullish for AQUA
- - Aqua powers AquasTrade by being the base asset on major AMM pools, marketplace utility token,

## NFT Holders: 
The plan is to airdrop 10% of the token supply over 10 year period. This will result in an one percent inflation for the next 10 years. 
### airdrop 
- Jan, April, July, Oct
- - 20 million released over 10 years 
- - 2 million per year 
- - - 500k released Quarterly (5k USD @ 0.01 per AQUA)

## NFT Market Place 
The marketplace will use $AQUA as the asset with router swapping to allow user to buy any nft with any asset within their wallet. 

# api : database

- what data would be userful to others : AQUA circulating supply
- POST : when user buys nft to add to whitelist of $AQUA airdrops



# Coinflipper - wagmin - viem - read contracts - write contracts

- [CoinFlip Dev](src/app/dashboard/coinflip)
- show Contract Balance as the Max Prize aka = MAX BET
- balance returns a huge value ...
- fetches on each input change : change this to useRef
- websocket does retrieve latest info, must disconnect and reconnect

# Dashboard

- ok

# drop down menu options

- https://nextui.org/docs/components/dropdown

# Games

- ok

# Images

- must add, style={{ width: "66px", height: "36px" }} along with the width and height tags in next 14.0

# Marketplace

- market place is working but the readContract isn't smooth : fetches : renders too often
- VM29501:12 Warning: You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.

# Metaport 2.0

its working again : before there were issues with rainbowkit connection ( clicking on browserWallet button didn't connect)

- css preload errors : https://stackoverflow.com/questions/76219016/how-to-fix-link-preload-warning-in-next-js-app
  -- WalletLinkWebSocket.js:98 WebSocket connection to 'wss://www.walletlink.org/rpc' failed: WebSocket is closed before the connection is established.

# NFT

- ok

# network switching

- ok

# Perps

- renders two times on refresh =/
- slider dark mode theming
-

## charts

- https://tradingview.github.io/lightweight-charts/docs/api/interfaces/ISeriesApi#setdata
- websocket live data for perps using binance
- timeframe toggle
- asset/market/ section drop down menu , needs to import a list of markets , need to fetch markets , need to design how to layout the markets : is this spot or futures api data?
### chart plugins

- https://github.com/tradingview/lightweight-charts/tree/0eef9d7dcc4c0ab67234003ab23f0880f82fa518/plugin-examples
- https://tradingview.github.io/lightweight-charts/plugin-examples/
- https://github.com/tradingview/lightweight-charts/tree/master/plugin-examples/src/plugins/trend-line/example

# Token List

- show supported chains near header for easy switching to check balances ( skale chains only for now : rpc providers for other chains ....)

# type-script

// @ts-nocheck
{/_ @ts-ignore: Unreachable code error_/}

# useRouter()

import next/nagivation with router.push('/home/')


# web socket

wss://stream.binance.com:9443/ws/btcusdt@kline_5m

https://www.slingacademy.com/article/use-websockets-for-real-time-communication-in-node-js/

https://socket.io/docs/v4/client-initialization/

multiplex connection
data flows both ways
both are listening for incoming connection

websocket

- Request--> <-- Handshake(server) <--> WebSocket

Rooms - NameSpaces :

- group clients together : target broadcasting

- NameSpaces can use the same connection across all pages and all clients ( target a specific client: nameSpace : good for notifications)

### Errors

1. ./node_modules/@metamask/sdk/dist/node/es/metamask-sdk.js
   Module not found: Can't resolve 'encoding'

solution :

- Deleting .next folder
- yarn add -D encoding
