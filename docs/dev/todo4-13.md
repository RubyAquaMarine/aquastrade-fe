## bugs
- token List extra USDC : use Dummie
` {
    id: 0,
    symbol: "PAXG",
    addr: "0x73d22d8a2D1f59Bf5Bcf62cA382481a2073FAF58",
    decimal: 18,
    logo: "/USDC.svg",
  },
  `
## todo
- metaport token mapping : EXD bridges from Europa to Exorde_chain?
- - only fetch data from the module that is being clicked on.

## IDEAS

- token list : load tokens for all Skale chains and show all within one page.



import { findTokenAddressFromSymbol } from "@/app/Utils/findTokens";

 const eth_address =  findTokenAddressFromSymbol("ETH") as unknown as `0x${string}`;