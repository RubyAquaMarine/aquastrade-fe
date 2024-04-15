## bugs

- show reserves BTC: too many decimals showing
- token List extra USDC : use Dummie
` {
    id: 0,
    symbol: "PAXG",
    addr: "0x73d22d8a2D1f59Bf5Bcf62cA382481a2073FAF58",
    decimal: 18,
    logo: "/USDC.svg",
  },
  `

- metaport token mapping : EXD bridges from Europa to Exorde_chain?
- coinflip :SKL : 0x10E0fB120c8264fF32b5400D89ADd77aee11FF88 : add new coinflips easily.
- - only fetch data from the module that is being clicked on.

- findTokenAddressFromSymbol findAddressFromSymbol

`  const [token0Address, token1Address, reserves] = await Promise.all([
    univ2Pair.token0(),
    univ2Pair.token1(),
    univ2Pair.getReserves(),
  ]);
  `

- something wrong with decimals
- - Make a functoin that can find the Pair Addresses : Right now, just hardcoded one PAIR.sol to test functionality

## IDEAS

- token list : load tokens for all Skale chains and show all within one page.
