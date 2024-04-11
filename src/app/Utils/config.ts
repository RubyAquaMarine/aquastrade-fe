// EUROPA-HUB
// Add Token Symbol  Here
export const tokenSymbols = [
  "ETH",
  "BTC",
  "SKL",
  "AQUA",
  "USDC",
  "USDT",
  "USDP",
  "DAI",
  "BRAWL",
  "EXD",
  "RUBY",
  "PROSPECT",
];

export const tokenAddresses = [
  {
    symbol: "USDC",
    addr: "0x5F795bb52dAC3085f578f4877D450e2929D2F13d",
    decimal: 6,
    logo: "/USDC.svg"
  },
  {
    symbol: "USDT",
    addr: "0x1c0491E3396AD6a35f061c62387a95d7218FC515",
    decimal: 6,
    logo: "/USDT.svg"
  },
  {
    symbol: "DAI",
    addr: "0xD05C4be5f3be302d376518c9492EC0147Fa5A718",
    decimal: 18,
    logo: "/DAI.svg"
  },
  {
    symbol: "USDP",
    addr: "0x73d22d8a2D1f59Bf5Bcf62cA382481a2073FAF58",
    decimal: 18,
    logo: "/USDP.svg"
  },
  {
    symbol: "ETH",
    addr: "0xD2Aaa00700000000000000000000000000000000",
    decimal: 18,
    logo: "/ETH.svg"
  },
  {
    symbol: "BTC",
    addr: "0xcb011E86DF014a46F4e3AC3F3cbB114A4EB80870",
    decimal: 8,
    logo: "/BTC.svg"
  },
  {
    symbol: "SKL",
    addr: "0xE0595a049d02b7674572b0d59cd4880Db60EDC50",
    decimal: 18,
    logo: "/SKL.svg"
  },
  {
    symbol: "AQUA",
    addr: "0xE34A1fEF365876D4D0b55D281618768583ba4867",
    decimal: 18,
    logo: "/AQUA1.png"
  },
  {
    symbol: "BRAWL",
    addr: "0x28c6ac22aB738BB01FC6CBA75804dC088aae6193",
    decimal: 18,
    logo: "/AQUA2.png"
  },
  {
    symbol: "EXD",
    addr: "0xCfEBA92BD362B2F76fC30a89C433DE50a1D62BcA",
    decimal: 18,
    logo: "/EXD.svg"
  },
  {
    symbol: "RUBY",
    addr: "0x2B4e4899b53E8b7958c4591a6d02f9C0b5c50F8f",
    decimal: 18,
    logo: "/RUBY.svg"
  },
  {
    symbol: "PROSPECT",
    addr: "0xA30cA600b8E722E2513B7738493F410a6Ae4a373",
    decimal: 18,
    logo: "/PROSPECT.png"
  },
] as const;

// custom swap router for amm + stable swaps
export const EUROPA_ROUTER = "0x18425939A31E35DB05358Ba4Bc85d1075ed015E5";

export const getKlineRecordCount = 600;

export const CHAIN = {
  id: 2046399126,
};

export const EUROPA_RAZOR_ORACLE = "0xEb9324f0d17e4dEa7371f6dddf361D9bB453BEb9"; // mainnet

export const ASSET_ETH = { symbol: "ETHUSD" };

export const RUBY_STAKER = "0x2998f0b516b1eaCbb06442B1c13cB2FFc865B449";

// list of uniswap:router address
export const ROUTER_AQUADEX = "0x698EA133CBA3BACD4aA6405411d8e8c1726D5f61";
export const ROUTER_RUBYSWAP = "0xd4C0828FC3C50B75eBdcEE209c7423A7398C4d72";

// market place
export const MARKETPLACE_AQUADEX = "0xc44A8E52A835c77932eB8747bD7E979c27308660";
export const MARKETPLACE_GOLD_NFT =
  "0xcEcd42ff7eCC7b0BfF7a9CF95C6e7ce9aA052d8C";
export const MARKETPLACE_SILVER_NFT =
  "0xE4702E2Bab8702A1aA40C7757e15A9e2bc8C15D1";
export const MARKETPLACE_BRONZE_NFT =
  "0x87f23b254d59f97e7c4ceC7C14AbC7D6a1a4A0E3";

// coinflip
export const COIN_FLIP_AQUA = "0x94C9c65c9f828703A716642E316CcE302Cdd1661";

// assets
export const EUROPA_ETH = "0xD2Aaa00700000000000000000000000000000000";
export const EUROPA_AQUA = "0xE34A1fEF365876D4D0b55D281618768583ba4867";

/*** UNCOMMENT THE LINES BELOW TO RUN WITH TEST POOL AND ROUTER DATA ***/
// import {TEST_DATA_GOERLI} from "./tests/testDataGoerli";
//export const ROUTER_ADDRESS = TEST_DATA_GOERLI.router
//export const POOLS = TEST_DATA_GOERLI.pools;

/*** UNCOMMENT THE LINES BELOW TO RUN WITH YOUR OWN ROUTER ***/

export const POOLS = undefined; // leave undefined to get pools dynamically from the router

// multi call - aqua-dex : 0x97f6DD4673F7543d162E3de9837F794Cb79e09cE
// ruby exchange : 0x918D8F3670c67f14Ff3fEB025D46B9C165d12a23
const Europa = {
  chainId: 2046399126,
  chainName: "Europa Hub",
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: "0x97f6DD4673F7543d162E3de9837F794Cb79e09cE",
  getExplorerAddressLink: (address: string) =>
    `https://elated-tan-skat.explorer.mainnet.skalenodes.com/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) =>
    `https://elated-tan-skat.explorer.mainnet.skalenodes.com/tx/${transactionHash}`,
  // Optional parameters:
  rpcUrl: "https://mainnet.skalenodes.com/v1/elated-tan-skat",
  blockExplorerUrl: "https://elated-tan-skat.explorer.mainnet.skalenodes.com/",
  nativeCurrency: {
    name: "sFUEL",
    symbol: "sFUEL",
    decimals: 18,
  },
};

const MainETH = {
  chainId: 1,
  chainName: "Ethereum",
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: "0x918D8F3670c67f14Ff3fEB025D46B9C165d12a23",
  getExplorerAddressLink: (address: string) =>
    `https://etherscan.io/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) =>
    `https://etherscan.io/tx/${transactionHash}`,
  // Optional parameters:
  rpcUrl:
    "https://eth-mainnet.gateway.pokt.network/v1/lb/f0c06ca797ece1fe09dcdf75",
  blockExplorerUrl: "https://etherscan.io/",
  nativeCurrency: {
    name: "eth",
    symbol: "eth",
    decimals: 18,
  },
};
