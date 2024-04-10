export const marketplaceABI = [
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "buy",
    inputs: [
      { type: "uint256", name: "itemCounter", internalType: "uint256" },
      { type: "uint256", name: "amount", internalType: "uint256" },
    ],
  },

  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "tuple[]",
        name: "",
        internalType: "struct MarketPlace.Item[]",
        components: [
          { type: "bool", name: "listing", internalType: "bool" },
          { type: "address", name: "nft", internalType: "address" },
          { type: "uint256", name: "id", internalType: "uint256" },
          { type: "uint256", name: "price", internalType: "uint256" },
          { type: "address", name: "seller", internalType: "address" },
        ],
      },
    ],
    name: "getListedItems",
    inputs: [],
  },

  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "bool", name: "listing", internalType: "bool" },
      { type: "address", name: "nft", internalType: "address" },
      { type: "uint256", name: "id", internalType: "uint256" },
      { type: "uint256", name: "price", internalType: "uint256" },
      { type: "address", name: "seller", internalType: "address" },
    ],
    name: "items",
    inputs: [{ type: "uint256", name: "", internalType: "uint256" }],
  },

  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "contract IERC20" }],
    name: "payToken",
    inputs: [],
  },
] as const;

export const MARKETPACE_ABI = [
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "buy",
    inputs: [
      { type: "uint256", name: "itemCounter", internalType: "uint256" },
      { type: "uint256", name: "amount", internalType: "uint256" },
    ],
  },

  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "tuple[]",
        name: "",
        internalType: "struct MarketPlace.Item[]",
        components: [
          { type: "bool", name: "listing", internalType: "bool" },
          { type: "address", name: "nft", internalType: "address" },
          { type: "uint256", name: "id", internalType: "uint256" },
          { type: "uint256", name: "price", internalType: "uint256" },
          { type: "address", name: "seller", internalType: "address" },
        ],
      },
    ],
    name: "getListedItems",
    inputs: [],
  },

  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "bool", name: "listing", internalType: "bool" },
      { type: "address", name: "nft", internalType: "address" },
      { type: "uint256", name: "id", internalType: "uint256" },
      { type: "uint256", name: "price", internalType: "uint256" },
      { type: "address", name: "seller", internalType: "address" },
    ],
    name: "items",
    inputs: [{ type: "uint256", name: "", internalType: "uint256" }],
  },

  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "contract IERC20" }],
    name: "payToken",
    inputs: [],
  },
] as const;
