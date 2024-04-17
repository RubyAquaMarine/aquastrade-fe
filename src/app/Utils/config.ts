import { tokenList } from "./tokenList";
import { tokenSymbolList } from "./tokenSymbolList";
// EUROPA-HUB
// Add Tokens here
export const tokenSymbols = tokenSymbolList;
export const tokenAddresses = tokenList;
export const contractAddresses = [
  {
    id: 0,
    name: "aqua-router",
    addr: "0x18425939A31E35DB05358Ba4Bc85d1075ed015E5",
  },
  {
    id: 1,
    name: "router",
    addr: "0x698EA133CBA3BACD4aA6405411d8e8c1726D5f61",
  },
  {
    id: 2,
    name: "factory",
    addr: "0xc318a82CB7c2B0faf7e355BB8F285016956aBF55",
  },
  {
    id: 3,
    name: "marketplace-eth",
    addr: "0xc44A8E52A835c77932eB8747bD7E979c27308660",
  },
  {
    id: 4,
    name: "coinflip-aqua",
    addr: "0xe137EDEDded60817e86085C0FacF950d4b5B73E7",
  },
  {
    id: 5,
    name: "coinflip-skl",
    addr: "0xD83BF4A2F43FE6ABeFa679791dc2eFcA98eB3060",
  },
  {
    id: 6,
    name: "airdrop",
    addr: "0x980FA9c3F0837E9E03F5ab255D0fB938Acee26c1",
  },
] as const;

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
export const COIN_FLIP_AQUA = "0xAC7eb74a1e238215076CBBD2E7040aB880017676";

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
