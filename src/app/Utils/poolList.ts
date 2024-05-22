/*
- TokenA and TokenB hardcode 
*/

export const europaRouters = [
  {
    id: 0,
    name: "Aquas.Trade",
    address: "0x698EA133CBA3BACD4aA6405411d8e8c1726D5f61",
    logo: "/AQUA.png",
  },
  {
    id: 1,
    name: "Ruby.Exchange",
    address: "0xd4C0828FC3C50B75eBdcEE209c7423A7398C4d72",
    logo: "/RUBY.svg",
  },
] as const;
/*
  {
    id: 2,
    name: "Sushi.com",
    address: "0x4cddf8D1473df386b926ec14b23bfbD566CE827a",
    logo: "/ETH.svg",
  },
*/

// 41 pools

export const poolListAqua = [
  {
    id: 28,
    symbol: "USDC-AQUA",
    address: "0x7CE47dA2789267B254e243e45A216Ef6897E5840",
    tokenA: "USDC",
    tokenB: "AQUA",
    decimals: 18,
    logoQuote: "/USDC.svg",
    logoBase: "/AQUA.png",
  },

  {
    id: 29,
    symbol: "BRAWL-AQUA",
    address: "0xDE29e5C2Ed32182a8be1b824B21F389f67D2A7ae",
    tokenA: "BRAWL",
    tokenB: "AQUA",
    decimals: 18,
    logoQuote: "/BRAWL.png",
    logoBase: "/AQUA.png",
  },
  {
    id: 30,
    symbol: "ETH-AQUA",
    address: "0x2D23B66e9cF4ee257A326031E0f084eECb4710b5",
    tokenA: "ETH",
    tokenB: "AQUA",
    decimals: 18,
    logoQuote: "/ETH.svg",
    logoBase: "/AQUA.png",
  },
  {
    id: 31,
    symbol: "BTC-AQUA",
    address: "0x0f307842AE34aeFf25C36469AEdc729ae64A579c",
    tokenA: "BTC",
    tokenB: "AQUA",
    decimals: 18,
    logoQuote: "/BTC.svg",
    logoBase: "/AQUA.png",
  },
  {
    id: 32,
    symbol: "SKL-AQUA",
    address: "0x59f74c5ad0fE549b45a4ed592bC924f6e60099B1",
    tokenA: "SKL",
    tokenB: "AQUA",
    decimals: 18,
    logoQuote: "/SKL.svg",
    logoBase: "/AQUA.png",
  },
  {
    id: 33,
    symbol: "SHISH-AQUA",
    address: "0xC6825dfc26E3BC4aF2E2F4AD6B3925bC23473F30",
    tokenA: "SHISH",
    tokenB: "AQUA",
    decimals: 18,
    logoQuote: "/SHISH.png",
    logoBase: "/AQUA.png",
  },
  {
    id: 34,
    symbol: "SKILL-AQUA",
    address: "0x4B7051880FB14B173292673684dba0C4cFb472F7",
    tokenA: "SKILL",
    tokenB: "AQUA",
    decimals: 18,
    logoQuote: "/SKILL.png",
    logoBase: "/AQUA.png",
  },
  {
    id: 35,
    symbol: "EXD-AQUA",
    address: "0x9Bba3784C508F8FaD6bC86041b580E9022c31208",
    tokenA: "EXD",
    tokenB: "AQUA",
    decimals: 18,
    logoQuote: "/EXD.svg",
    logoBase: "/AQUA.png",
  },
  {
    id: 36,
    symbol: "DAI-AQUA",
    address: "0xE3079C9Dcd700d6736f80fd83D603877f05cc6d3",
    tokenA: "DAI",
    tokenB: "AQUA",
    decimals: 18,
    logoQuote: "/DAI.svg",
    logoBase: "/AQUA.png",
  },
  {
    id: 37,
    symbol: "USDT-AQUA",
    address: "0x63dbf029c2D21b5686bd2E855D4befa71aaB8c41",
    tokenA: "USDT",
    tokenB: "AQUA",
    decimals: 18,
    logoQuote: "/USDT.svg",
    logoBase: "/AQUA.png",
  },
  {
    id: 38,
    symbol: "USDP-AQUA",
    address: "0x8A8F3eb590Cf06260c5A220837156B19189C4233",
    tokenA: "USDP",
    tokenB: "AQUA",
    decimals: 18,
    logoQuote: "/USDP.svg",
    logoBase: "/AQUA.png",
  },
  {
    id: 39,
    symbol: "RUBY-AQUA",
    address: "0x1339C906103Ce3fEf611F2Cefd7a31A0Bf5C5dF1",
    tokenA: "RUBY",
    tokenB: "AQUA",
    decimals: 18,
    logoQuote: "/RUBY.svg",
    logoBase: "/AQUA.png",
  },

  {
    id: 40,
    symbol: "PROSPECT-AQUA",
    address: "0x009D63a72B62F62a8bbF42E337F61D5c6EC0e015",
    tokenA: "PROSPECT",
    tokenB: "AQUA",
    decimals: 18,
    logoQuote: "/PROSPECT.png",
    logoBase: "/AQUA.png",
  },
  {
    id: 41,
    symbol: "BTC-USDT",
    address: "0x57A7a760deA34d28dfeD05a9Bb3b6c80BBFC5EF3",
    tokenA: "BTC",
    tokenB: "USDT",
    decimals: 18,
    logoQuote: "/BTC.svg",
    logoBase: "/USDT.svg",
  },
  {
    id: 42,
    symbol: "ETH-USDT",
    address: "0x35621160d0Aaf48B33b5A040f16DD035C037a88B",
    tokenA: "ETH",
    tokenB: "USDT",
    decimals: 18,
    logoQuote: "/ETH.svg",
    logoBase: "/USDT.svg",
  },
  {
    id: 43,
    symbol: "ETH-USDC",
    address: "0xC9B43EeDe1894e299681874c2BFB7B12A85Ae458",
    tokenA: "ETH",
    tokenB: "USDC",
    decimals: 18,
    logoQuote: "/ETH.svg",
    logoBase: "/USDC.svg",
  },
  {
    id: 44,
    symbol: "BTC-USDC",
    address: "0x75512336c999C3a1B1e4d4270713B9aA39a9cC1a",
    tokenA: "BTC",
    tokenB: "USDC",
    decimals: 18,
    logoQuote: "/BTC.svg",
    logoBase: "/USDC.svg",
  },
  {
    id: 45,
    symbol: "SKL-USDT",
    address: "0x41D2f4A3a67636E236CAA36A407dCF1d219FD9Dd",
    tokenA: "SKL",
    tokenB: "USDT",
    decimals: 18,
    logoQuote: "/SKL.svg",
    logoBase: "/USDT.svg",
  },
  {
    id: 46,
    symbol: "SKL-USDC",
    address: "0xE9891205b75B5ebea07EDe0F11B6ef58A1d8e3b1",
    tokenA: "SKL",
    tokenB: "USDC",
    decimals: 18,
    logoQuote: "/SKL.svg",
    logoBase: "/USDC.svg",
  },
] as const;

// 6 pools
export const poolListRuby = [
  {
    id: 0,
    symbol: "RUBY-USDP",
    address: "0xC13F81c54273a50f42B1280426d77F6494Cbcf58",
    tokenA: "RUBY",
    tokenB: "USDP",
    decimals: 18,
    logoQuote: "/RUBY.svg",
    logoBase: "/USDP.svg",
  },
  {
    id: 1,
    symbol: "ETH-USDP",
    address: "0x15369d5E452614b26271a4796C3D63E7F549c12d",
    tokenA: "ETH",
    tokenB: "USDP",
    decimals: 18,
    logoQuote: "/ETH.svg",
    logoBase: "/USDP.svg",
  },
  {
    id: 2,
    symbol: "BTC-USDP",
    address: "0x9Ba6777451F57859da195EfC0fA3714ab79FDBC2",
    tokenA: "BTC",
    tokenB: "USDP",
    decimals: 18,
    logoQuote: "/BTC.svg",
    logoBase: "/USDP.svg",
  },
  {
    id: 3,
    symbol: "SKL-USDP",
    address: "0xADDf444E06B76044EAE278Bc725e27e61c3A5E38",
    tokenA: "SKL",
    tokenB: "USDP",
    decimals: 18,
    logoQuote: "/SKL.svg",
    logoBase: "/USDP.svg",
  },
  {
    id: 4,
    symbol: "SKILL-USDP",
    address: "0x899F2f2c675811A91D680292cdCFce39b62FE209",
    tokenA: "SKILL",
    tokenB: "USDP",
    decimals: 18,
    logoQuote: "/SKILL.svg",
    logoBase: "/USDP.svg",
  },
  {
    id: 5,
    symbol: "TGOLD-USDP",
    address: "0xD0fF36433841d567EbE668f75c1fbe512b11f801",
    tokenA: "TGOLD",
    tokenB: "USDP",
    decimals: 18,
    logoQuote: "/TGOLD.svg",
    logoBase: "/USDP.svg",
  },
] as const;

// 1 pool
export const poolListSushi = [
  {
    id: 0,
    symbol: "ETH-USDC",
    address: "0x2717108D70aCfD74E345763FEDD7C79d2813b267",
    tokenA: "ETH",
    tokenB: "USDC",
    decimals: 18,
    logoQuote: "/ETH.svg",
    logoBase: "/USDC.svg",
  },
] as const;
