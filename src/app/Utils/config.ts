import { Localhost, Mainnet, DEFAULT_SUPPORTED_CHAINS } from "@usedapp/core";

export const getKlineRecordCount = 600;

export const CHAIN = {
  id: 2046399126,
};

export const EUROPA_RAZOR_ORACLE = "0xEb9324f0d17e4dEa7371f6dddf361D9bB453BEb9"; // mainnet

export const ASSET_ETH = { symbol: "ETHUSD" };

export const RUBY_STAKER = "0x2998f0b516b1eaCbb06442B1c13cB2FFc865B449";

// list of router address
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

/*
export const DAPP_CONFIG = {
  readOnlyChainId: Localhost.chainId,
  readOnlyUrls: {
    [Localhost.chainId]: "http://127.0.0.1:7545"
  },
}
*/
export const DAPP_CONFIG = {
  readOnlyChainId: Europa.chainId,
  readOnlyUrls: {
    [Europa.chainId]: Europa.rpcUrl,
  },
  networks: [...DEFAULT_SUPPORTED_CHAINS, Europa],
};
