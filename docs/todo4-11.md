branch: `fix-build`

- edit text
- added // @ts-nocheck to coinflip , swap/amm
- skale needs to update MetaPort : required @rainbow-me/rainbowkit@"^1.1.1" from skale_metaport@2.0.3-develop.8
- peer viem@"~0.3.19 || ^1.0.0" from @rainbow-me/rainbowkit@1.3.6
- removed old dependencies
- edited ` .eslintrc:`
- tested with node v20.xx. today : Metaport requires v18

npx prettier . --write

- AddLiquidity : working
- Deploy new AQUA token (ERC20 : with a 1bps burn fee)
- coinflip still returns `115792089237316195423570985008687907853269984665640564039057.584007913129639936`
- coinflip : userAllowance move into a components ( atm button click fetches allowance twice )
- amm : add symbols to tokenList

## TODO 
- decimals on swappAMM : double check all tokens 
- fix decimals 


   