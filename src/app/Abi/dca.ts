export const DCA_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_relayer",
        type: "address",
      },
      {
        internalType: "address",
        name: "_aqua",
        type: "address",
      },
      {
        internalType: "address",
        name: "_aquasFeedHelper",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_dcaStorageId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_dcaStorage",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_router",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_tokenQuote",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_tokenBase",
        type: "address",
      },
    ],
    name: "DCAStorageCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "AQUA_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "AquasFeedHelper",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "BurnAqua",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_fee",
        type: "uint256",
      },
    ],
    name: "ChangeEntryFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_maxOrders",
        type: "uint256",
      },
    ],
    name: "ChangeMaxOrders",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newRelayer",
        type: "address",
      },
    ],
    name: "ChangeRelayer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_dcaStorageID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "DeleteOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "DigitPrecision",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "EntryFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_from",
        type: "uint256",
      },
    ],
    name: "ExecuteOrderRange",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_dcaStorageID",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_buyOrder",
        type: "bool",
      },
    ],
    name: "ExecuteOrders",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_dcaStorageID",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_trader",
        type: "address",
      },
    ],
    name: "GetAllOrders",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_storageAddress",
        type: "address",
      },
    ],
    name: "GetIndexUsingStorageAddress",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_dcaStorageID",
        type: "uint256",
      },
    ],
    name: "GetLastPoolPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_dcaStorageID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "GetOrderDetails",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "_globalID",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "trader",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "interval",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tokenPriceMin",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tokenPriceMax",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tokenAmount",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "buyOrder",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "lastSwapCount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lastSwapTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalSwapSum",
            type: "uint256",
          },
        ],
        internalType: "struct AquasDCAMulti.OrderDetails",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_dcaStorageID",
        type: "uint256",
      },
    ],
    name: "GetOrderFilled",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_dcaStorageID",
        type: "uint256",
      },
    ],
    name: "GetOrderLength",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_dcaStorageID",
        type: "uint256",
      },
    ],
    name: "GetOrdersTotal",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_dcaStorageID",
        type: "uint256",
      },
    ],
    name: "GetStorageAddressUsingIndex",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_router",
        type: "address",
      },
      {
        internalType: "address",
        name: "_tokenQuote",
        type: "address",
      },
      {
        internalType: "address",
        name: "_tokenBase",
        type: "address",
      },
    ],
    name: "GetStorageAddressUsingToken",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_dcaStorageID",
        type: "uint256",
      },
    ],
    name: "GetTokenBaseUsingIndex",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_dcaStorageID",
        type: "uint256",
      },
    ],
    name: "GetTokenQuoteUsingIndex",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_dcaStorageID",
        type: "uint256",
      },
    ],
    name: "GetTokenRouterUsingIndex",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "GlobalID",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_ORDERS",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "NFTAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "Relayer",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_dcaStorageID",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "_digits",
        type: "uint8",
      },
    ],
    name: "SetStorageDigitPrecision",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "StorageID",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_router",
        type: "address",
      },
      {
        internalType: "address",
        name: "_tokenQuote",
        type: "address",
      },
      {
        internalType: "address",
        name: "_tokenBase",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_intervalSeconds",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_durationHours",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_tokenPriceMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_tokenPriceMax",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_tokenAmount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_buyOrder",
        type: "bool",
      },
    ],
    name: "SubmitDCAOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_on_off",
        type: "bool",
      },
    ],
    name: "TradingCondition",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "TradingEnabled",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "allStorages",
    outputs: [
      {
        internalType: "contract DCAStorage",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "checkNFTSupport",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_decimals",
        type: "uint8",
      },
    ],
    name: "setDigitPrecision",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newAddress",
        type: "address",
      },
    ],
    name: "setNftAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
