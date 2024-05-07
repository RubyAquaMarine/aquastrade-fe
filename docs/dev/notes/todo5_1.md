# AquasTrade

APP ROUTER Project

- scr/app/pages (all lowercase)
- - /Components
- - /api (reserved specifically for nextjs) : fetch data, manipulate and return to Components
- - /Hooks : <b> use</b>HookFuntionName , make custom useEffect for example [useHandleWrongNetwork](/src/app/Hooks/useHandleWrongNetwork.ts)

## Review Time

## Branch

branch: `fix-build`

clean up

# Major

- Cast : if balance is zero after adding all liquidity , the balance doesn't refresh and stays the same, then switching assets then injects the other asset for both balance values. if value doesn't exist : '0'

- `useGetAmountInQuote` : bug on mulit hop calculations when asset is not 18 decimals such as USDC to BTC : USDP to BTC works,
- Trade: exchange rate and slippage
- deploy:token-Deployer-Factory
- - - slippage stuff : routing stuff : actually hold off on this until new router is deployed : uniswap : universal smart router that allows 7 paths .
- https://playground.li.fi/ ( post on twitter : design the prettiest swap panel for aquas.trade and earn 10000 $aqua )
- columns, heading, etc , use em, rem, , VW VH, and % instead of px

## Project List

- DappRadar integration
- DexTools : Also you can add a brief description of your project, explaining the main uses and advantages of your token and you can add your circulating supply too.
- - https://docs.google.com/forms/d/e/1FAIpQLSd1BAqjAl9nntlS2mOk76tE0Q-dEf-AT1bUblDXikjZ-PNP1Q/viewform

### Skale

- metaport token mapping : EXD bridges from Europa to Exorde_chain?
- skale needs to update MetaPort : required @rainbow-me/rainbowkit@"^1.1.1" from skale_metaport@2.0.3-develop.8
- - peer viem@"~0.3.19 || ^1.0.0" from @rainbow-me/rainbowkit@1.3.6
- - tested with node v20.xx. today : Metaport requires v18

## Minor

- amm: load nft at start :
- metaport: l1 gasWalletBalance- for all skale chains in one list: gas Estimation etc.
- home: AQUA circulating supply api
- amm: gear icon has no functionality yet
- nft: page overhaul
- Marketing: (add dex info to ) https://github.com/paraswap/paraswap-dex-lib
  then use their https://github.com/paraswap/paraswap-sdk : https://developers.paraswap.network/
- [show wave notify] listen to CA: 0x453495a7bD8943530FdcBAEE6749795F1f07dBD3 : event : NewUser
- tokenlist: Wallet Address switching on Token List page
- https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest

bug bounties

- https://hackerone.com/leaderboard
- https://immunefi.com/bug-bounty/

`cd public && `
`npx pwa-asset-generator ./AQUA.png --manifest ../src/app/manifest.json`

## Icons

https://react-icons.github.io/react-icons/icons/ai/

- import { AiFillGithub } from "react-icons/ai";// todo github icon

## typescript

@ts-nocheck
{/_ @ts-ignore: Unreachable code error_/}

### NFT Market Place

The marketplace will use $AQUA as the asset with router swapping to allow user to buy any nft with any asset within their wallet.

### Errors

1. ./node_modules/@metamask/sdk/dist/node/es/metamask-sdk.js
   Module not found: Can't resolve 'encoding'

solution :

- Deleting .next folder
- yarn add -D encoding
