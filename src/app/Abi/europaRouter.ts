export const europaRouterABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "admin",
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
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "changeAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "implementation",
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
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newAmmRouter",
        type: "address",
      },
    ],
    name: "AmmRouterSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "maxSwapHops",
        type: "uint256",
      },
    ],
    name: "MaxHopsSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newNftAdmin",
        type: "address",
      },
    ],
    name: "NftAdminSet",
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
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "stablePool",
        type: "address",
      },
    ],
    name: "StablePoolDisabled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "stablePool",
        type: "address",
      },
    ],
    name: "StablePoolEnabled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0In",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1Out",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "token0",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "token1",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "Swap",
    type: "event",
  },
  {
    inputs: [],
    name: "ammRouter",
    outputs: [
      {
        internalType: "contract IUniswapV2Router02",
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
        internalType: "contract ISwap",
        name: "stablePool",
        type: "address",
      },
    ],
    name: "disableStablePool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISwap",
        name: "stablePool",
        type: "address",
      },
    ],
    name: "enableStablePool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISwap",
        name: "",
        type: "address",
      },
    ],
    name: "enabledStablePools",
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
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "contract IUniswapV2Router02",
        name: "_ammRouter",
        type: "address",
      },
      {
        internalType: "contract ISwap",
        name: "_stablePool",
        type: "address",
      },
      {
        internalType: "contract INFTAdmin",
        name: "_nftAdmin",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "maxSwapHops_",
        type: "uint256",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "nftAdmin",
    outputs: [
      {
        internalType: "contract INFTAdmin",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
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
    inputs: [],
    name: "rubyStableSwap",
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
        internalType: "contract IUniswapV2Router02",
        name: "newAmmRouter",
        type: "address",
      },
    ],
    name: "setAmmRouter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "maxSwapHops",
        type: "uint256",
      },
    ],
    name: "setMaxHops",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract INFTAdmin",
        name: "newNftAdmin",
        type: "address",
      },
    ],
    name: "setNftAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "enum AMMSwapType",
                name: "swapType",
                type: "uint8",
              },
              {
                internalType: "uint256",
                name: "amountIn",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "amountOut",
                type: "uint256",
              },
              {
                internalType: "address[]",
                name: "path",
                type: "address[]",
              },
              {
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
              },
            ],
            internalType: "struct AMMSwapDetails[]",
            name: "ammSwaps",
            type: "tuple[]",
          },
          {
            components: [
              {
                internalType: "address",
                name: "stablePool",
                type: "address",
              },
              {
                internalType: "uint8",
                name: "tokenIndexFrom",
                type: "uint8",
              },
              {
                internalType: "uint8",
                name: "tokenIndexTo",
                type: "uint8",
              },
              {
                internalType: "uint256",
                name: "dx",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "minDy",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
              },
            ],
            internalType: "struct StableSwapDetails[]",
            name: "stableSwaps",
            type: "tuple[]",
          },
          {
            internalType: "enum SwapType[]",
            name: "order",
            type: "uint8[]",
          },
        ],
        internalType: "struct SwapDetails",
        name: "swapDetails",
        type: "tuple",
      },
    ],
    name: "swap",
    outputs: [
      {
        internalType: "uint256",
        name: "outputAmount",
        type: "uint256",
      },
    ],
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
  {
    inputs: [
      {
        internalType: "address",
        name: "initialLogic",
        type: "address",
      },
      {
        internalType: "address",
        name: "initialAdmin",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
] as const;
