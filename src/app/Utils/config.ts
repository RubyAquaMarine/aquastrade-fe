import { tokenList, tokenSymbolList } from "./tokenList";
import {
  europaRouters,
  poolListAqua,
  poolListRuby,
  poolListSushi,
} from "./poolList";
// EUROPA-HUB
// Add Tokens here
export const tokenSymbols = tokenSymbolList;
export const tokenAddresses = tokenList;
// DEX uniswap v2
export const uniswapRouters = europaRouters;
// DEX POOLS
export const poolsAtAqua = poolListAqua;
export const poolsAtRuby = poolListRuby;
export const poolsAtSushi = poolListSushi;
// AQUAS.TRADE
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
    addr: "0xaCD323A49dC2Dd404551Ac9BfEB3e7Ef12aA3015",
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
  {
    id: 7,
    name: "faucet",
    addr: "0x453495a7bD8943530FdcBAEE6749795F1f07dBD3",
  },
  {
    id: 8,
    name: "memecreator",
    addr: "0xbB794A1F6C13E604bFEf1b56FbE1e02d1674f4f2",
  },

  {
    id: 9,
    name: "dcamulti",
    addr: "0x9683ADC7FD56b81F1eb70040B30864a822C330f2",
  },
  {
    id: 10,
    name: "aquasfeed",
    addr: "0x012D95449F3FE5E9263A2bA75406b78e83546510",
  },
] as const;
// WIP : remove any CA: below
export const getKlineRecordCount = 600;

export const CHAIN = {
  id: 2046399126,
};

export const EUROPA_RAZOR_ORACLE = "0xEb9324f0d17e4dEa7371f6dddf361D9bB453BEb9"; // mainnet

export const ASSET_ETH = { symbol: "ETHUSD" };

export const RUBY_STAKER = "0x2998f0b516b1eaCbb06442B1c13cB2FFc865B449";

// market place
export const MARKETPLACE_AQUADEX = "0xc44A8E52A835c77932eB8747bD7E979c27308660";
export const MARKETPLACE_GOLD_NFT =
  "0xcEcd42ff7eCC7b0BfF7a9CF95C6e7ce9aA052d8C";
export const MARKETPLACE_SILVER_NFT =
  "0xE4702E2Bab8702A1aA40C7757e15A9e2bc8C15D1";
export const MARKETPLACE_BRONZE_NFT =
  "0x87f23b254d59f97e7c4ceC7C14AbC7D6a1a4A0E3";

// todo : remove this because all contracts will be in a different file
export const COIN_FLIP_AQUA = "0xAC7eb74a1e238215076CBBD2E7040aB880017676";

// multi call - aqua-dex : 0x97f6DD4673F7543d162E3de9837F794Cb79e09cE
// ruby exchange : 0x918D8F3670c67f14Ff3fEB025D46B9C165d12a23
