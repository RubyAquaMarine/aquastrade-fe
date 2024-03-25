export const RAZOR_ORACLE_ABI = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "getResult",
    outputs: [
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "power",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;
