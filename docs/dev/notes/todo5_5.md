regEx on all inputs : prevent ui crash from entering non number

# DCA Storage ID's

- 1 : AQUA : USDP-AQUA : pool price : 187244539649409200000 => 187 244 53964 94092 00000 : meaning 1 USDP = 187 AQUA : so buying USDP (yes) min price is 99 , and max is 200 : should mean that the bot will sell aqua for usdp until pool price is 99e18

- 3 : AQUA : ETH-AQUA : pool price : 260009 011 70238 88600 00000 : 1 ETH => 260009 AQUA

- 8 : AQUA : DAI-AQUA : pool price : 103429804652244680000 : bidding 100.0

- 12 : AQUA : USDC - AQUA : 1.6205290826884932e+25 16205290826884932000000000 ==> 16 205 290 .826 88493 20000 00000

- 17: RUBY : SKL-USDP : pool price : 76 68914 75355 32000 = 0.076 68914 75355 32000 : 1 SKL = 0.076 USDP

# LastPricePrice

- Bug in LastPoolPrice : In fact decimals will be required. test on another contract before modifying AquasDCAMulti.sol
- - AquasFeed.sol is finished. Working with formatted price for any market(decimal)
