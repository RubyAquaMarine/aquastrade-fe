# web socket

# Wallet Address switching on Token List page

# AMM :

- <TokenBalance> remove all and use the api explorer to speed up ui

- tokens out when removing liquidity " user amount in relation to whole pool " reserves and total lp token amounts

- select symbols should load the balances of all tokens : make function to shorten the wallet balance strings.
- remove the onchain fetch for token balances and use the direct api from explorer

## trade

## cast :

- AmmPools component. work on this. if no pool exists, notify user to create a pool "loading pool data..."
- new feature: click on the wallet-balance to insert `max` balance amount

# Slippage

# Home

- Make the Height 100vw or 100% to ensure chart scroll doesn't trigger

# DCA Factory

1. Must approve both assets to the DCA factory

- dca factory 0x5Ba6468e8bf90141d4337988c5dbd89920dA7777

- id 1 0x0DB6a2da0fEf149D197840e05a811cA5987bA76c
- router 0x698EA133CBA3BACD4aA6405411d8e8c1726D5f61
- quote 0xF7F957D88768126916dAF3C1705D13C291d2B7D8
- base 0x5F795bb52dAC3085f578f4877D450e2929D2F13d
- 60
- 12
- 1
- 1 000 000 000 000 000 000
- 100000 ( token amount in uSDC )
- buy
- Pool Price 1.391673353183681e+25

( flip to input assets and see if the lastPoolprice value is different)

- LastPoolPrice doesn't change
- router 0x698EA133CBA3BACD4aA6405411d8e8c1726D5f61
- base 0xF7F957D88768126916dAF3C1705D13C291d2B7D8
- quote 0x5F795bb52dAC3085f578f4877D450e2929D2F13d
- 60
- 12
- 1
- 1 000 000 000 000 000 000
- 100000 ( token amount in AQUA )
- buy
- Pool Price 1.391673353183681e+25

- id 3 : AQUA USDP : transfer failed, so im thinking , switch the assets
- router 0x698EA133CBA3BACD4aA6405411d8e8c1726D5f61
- base 0xF7F957D88768126916dAF3C1705D13C291d2B7D8
- quote 0x73d22d8a2D1f59Bf5Bcf62cA382481a2073FAF58
- 60
- 12
- 1
- 1 000 000 000 000 000 000
- 100000 ( token amount in uSDC )
- buy
- Pool Price : 101 176 72157 87874 50000

# todo

- Must add 1 AQUA to approve and the Transfer Amounts , otherwise SC fails
- get the same LastPoolPrice calculations within the UI

  0.000000000000000001
  100000
  1000000000000000000

-- BUYING TOKEN QUOTE means you are using the decimals from token B for the input amount

- New DCA : 0x84B98837A22989bf950E3299f4803BDA3c7E0879
- - this includes normalizing the LastPoolPrice for non 18 decimal markets. this should make USDC AQUA work
    --- old : 0x5Ba6468e8bf90141d4337988c5dbd89920dA7777

-- btcusdp : 7.21693644866741e+24 :
7, 216 936. 448 66741 00000 00000

1 btc = 7.2 million usdp

- I used 99999990000. 448 66741 00000 00000
