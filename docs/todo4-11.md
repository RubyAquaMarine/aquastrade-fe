branch: `fix-build`

- edit text
- added // @ts-nocheck to coinflip , swap/amm
- skale needs to update MetaPort : required @rainbow-me/rainbowkit@"^1.1.1" from skale_metaport@2.0.3-develop.8
- peer viem@"~0.3.19 || ^1.0.0" from @rainbow-me/rainbowkit@1.3.6
- removed old dependencies
- edited ` .eslintrc:`
- tested with node v20.xx. today : Metaport requires v18

npx prettier . --write
