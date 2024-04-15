import { interfaces } from "skale_metaport";

export const AquaConfig: interfaces.MetaportConfig = {
  theme: {
    mode: "dark",
    vibrant: false,
  },
  skaleNetwork: "mainnet",
  openButton: true,
  openOnLoad: true,
  mainnetEndpoint: "https://eth.llamarpc.com",
  chains: [
    "mainnet",
    "elated-tan-skat", // Europa Hub
    "frayed-decent-antares",
    "honorable-steel-rasalhague",
    "affectionate-immediate-pollux",
    "wan-red-ain",
    "green-giddy-denebola",
    "light-vast-diphda", // Razor
    "turbulent-unique-scheat",
    "adorable-quaint-bellatrix",
  ],
  tokens: {
    eth: {
      symbol: "ETH",
      iconUrl: "https://aquas.trade/ETH.svg",
    },
    skl: {
      decimals: "18",
      name: "SKALE",
      symbol: "SKL",
      iconUrl: "https://aquas.trade/SKL.svg",
    },
    usdc: {
      decimals: "6",
      symbol: "USDC",
      name: "USD Coin",
      iconUrl: "https://aquas.trade/USDC.svg",
    },
    usdp: {
      decimals: "18",
      symbol: "USDP",
      name: "Paxos USD",
      iconUrl: "https://aquas.trade/USDP.svg",
    },
    usdt: {
      decimals: "6",
      symbol: "USDT",
      name: "Tether USD",
      iconUrl: "https://aquas.trade/USDT.svg",
    },
    hmt: {
      decimals: "18",
      symbol: "HMT",
      name: "Human Token",
      iconUrl: "https://ruby.exchange/images/tokens/hmt-square.png",
    },
    dai: {
      decimals: "18",
      symbol: "DAI",
      name: "Dai Token",
    },
    ruby: {
      decimals: "18",
      symbol: "RUBY",
      name: "Ruby Token",
      iconUrl: "https://aquas.trade/RUBY.svg",
    },
    exd: {
      decimals: "18",
      symbol: "EXD",
      name: "Exorde Token",
      iconUrl: "https://aquas.trade/EXD.svg",
    },
    prospect: {
      decimals: "18",
      symbol: "PROSPECT",
      name: "Prospect",
      iconUrl: "https://ruby.exchange/images/tokens/prospect-square.png",
    },
    razor: {
      decimals: "18",
      symbol: "RAZOR",
      name: "Razor",
      iconUrl: "https://aquas.trade/RAZOR.svg",
    },
    ff: {
      decimals: "18",
      symbol: "FF",
      name: "Forefront",
    },
    brawl: {
      decimals: "18",
      symbol: "BRAWL",
      name: "Brawl Token",
    },
    btc: {
      decimals: "8",
      symbol: "BTC",
      name: "Wrapped BTC",
    },
  },

  connections: {
    mainnet: {
      eth: {
        eth: {
          chains: {
            "elated-tan-skat": {},
          },
        },
      },
      // List all the L1 tokens within the L1.Skale.DepositBoxERC20 using the L1 addresses here
      // The order of tokens here will also change the UI order?
      // EuropaHub Toke List
      erc20: {
        // # of tokens
        // 25,700,666,867
        usdc: {
          address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
          chains: {
            "elated-tan-skat": {},
            "honorable-steel-rasalhague": {
              hub: "elated-tan-skat",
            },
            "green-giddy-denebola": {
              hub: "elated-tan-skat",
            },
          },
        },
        // 49,999,156,520
        usdt: {
          address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
          chains: {
            "elated-tan-skat": {},
            "honorable-steel-rasalhague": {
              hub: "elated-tan-skat",
            },
          },
        },
        // 3,268,317,507
        dai: {
          address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
          chains: {
            "elated-tan-skat": {},
            "honorable-steel-rasalhague": {
              hub: "elated-tan-skat",
            },
          },
        },
        // 139,745,787
        usdp: {
          address: "0x8E870D67F660D95d5be530380D0eC0bd388289E1",
          chains: {
            "elated-tan-skat": {},
            "honorable-steel-rasalhague": {
              hub: "elated-tan-skat",
            },
          },
        },

        btc: {
          address: "0xcb011E86DF014a46F4e3AC3F3cbB114A4EB80870",
          chains: {
            "elated-tan-skat": {},
          },
        },
        // 200,000,000
        exd: {
          address: "0x02dE007D412266a2e0Fa9287C103474170F06560",
          chains: {
            "elated-tan-skat": {},
            "light-vast-diphda": {
              hub: "elated-tan-skat",
            },
          },
        },

        // 1,000,000,000
        hmt: {
          address: "0xd1ba9BAC957322D6e8c07a160a3A8dA11A0d2867",
          chains: {
            "elated-tan-skat": {},
            "wan-red-ain": {
              hub: "elated-tan-skat",
            },
          },
        },
        // 700,000,199,500
        prospect: {
          address: "0xF7Ea4B5254551744B221C9562F9Ac09064B7De32",
          chains: {
            "elated-tan-skat": {},
            "green-giddy-denebola": {
              hub: "elated-tan-skat",
            },
          },
        },
        // 1,000,000,000
        razor: {
          address: "0x50de6856358cc35f3a9a57eaaa34bd4cb707d2cd",
          chains: {
            "turbulent-unique-scheat": {},
            "elated-tan-skat": {
              hub: "turbulent-unique-scheat",
            },
          },
        },
        // 200,000,000
        ruby: {
          address: "0x918D8F3670c67f14Ff3fEB025D46B9C165d12a23",
          chains: {
            "elated-tan-skat": {},
            "green-giddy-denebola": {
              hub: "elated-tan-skat",
            },
          },
        },
        // 5,294,613,738
        skl: {
          address: "0x00c83aeCC790e8a4453e5dD3B0B4b3680501a7A7",
          chains: {
            "elated-tan-skat": {},
            "honorable-steel-rasalhague": {
              hub: "elated-tan-skat",
            },
            "affectionate-immediate-pollux": {
              hub: "elated-tan-skat",
            },
            "green-giddy-denebola": {
              hub: "elated-tan-skat",
            },
          },
        },
      },
    },
    // Chain mapping to the L2 addresses go here, per chain
    // including wrapped : https://github.com/EuropaHub/Europa-origin-tokens?tab=readme-ov-file#wrapped-origin-token-addresses
    "elated-tan-skat": {
      eth: {
        eth: {
          address: "0xD2Aaa00700000000000000000000000000000000",
          chains: {
            mainnet: {
              clone: true,
            },
          },
        },
      },
      erc20: {
        btc: {
          address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
          chains: {
            mainnet: {
              clone: true,
            },
          },
        },
        usdc: {
          address: "0x5F795bb52dAC3085f578f4877D450e2929D2F13d",
          chains: {
            mainnet: {
              clone: true,
            },
            "honorable-steel-rasalhague": {
              wrapper: "0x1c566a47e1baC535Ca616373146e3BE024F88Aa4",
            },
            "green-giddy-denebola": {
              wrapper: "0x1c566a47e1baC535Ca616373146e3BE024F88Aa4",
            },
          },
        },
        usdt: {
          address: "0x1c0491E3396AD6a35f061c62387a95d7218FC515",
          chains: {
            mainnet: {
              clone: true,
            },
          },
        },
        dai: {
          address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
          chains: {
            mainnet: {
              clone: true,
            },
          },
        },
        usdp: {
          address: "0x91E87e460b19F7aD35e983b120bD4aAD5446d319",
          chains: {
            mainnet: {
              clone: true,
            },
          },
        },
        brawl: {
          address: "0x28c6ac22aB738BB01FC6CBA75804dC088aae6193",
          chains: {
            "frayed-decent-antares": {
              clone: true,
            },
          },
        },
        exd: {
          address: "0xCfEBA92BD362B2F76fC30a89C433DE50a1D62BcA",
          chains: {
            mainnet: {
              clone: true,
            },
            "light-vast-diphda": {
              wrapper: "0x0B8FAa4373978E36E5F4a6e7041D4f08dD1CAB95",
            },
          },
        },
        skl: {
          address: "0xE0595a049d02b7674572b0d59cd4880Db60EDC50",
          chains: {
            mainnet: {
              clone: true,
            },
            "honorable-steel-rasalhague": {
              wrapper: "0xD162bB5c75FE99144295b03510bAb2DF99617440",
            },
            "green-giddy-denebola": {
              wrapper: "0xD162bB5c75FE99144295b03510bAb2DF99617440",
            },
          },
        },
        prospect: {
          address: "0xA30cA600b8E722E2513B7738493F410a6Ae4a373",
          chains: {
            mainnet: {
              clone: true,
            },
            "green-giddy-denebola": {
              wrapper: "0x96eB0c03D98214D4154c354b5b55FF7F6d94DFac",
            },
          },
        },
      },
    },
    "honorable-steel-rasalhague": {
      erc20: {
        skl: {
          address: "0x4048C4dd6eccF1Dc23b068211fDf20AD19602e50",
          chains: {
            "elated-tan-skat": {
              clone: true,
            },
            mainnet: {
              clone: true,
              hub: "elated-tan-skat",
            },
          },
        },
        usdc: {
          address: "0x7Cf76E740Cb23b99337b21F392F22c47Ad910c67",
          chains: {
            "elated-tan-skat": {
              clone: true,
            },
            mainnet: {
              clone: true,
              hub: "elated-tan-skat",
            },
          },
        },
      },
    },
    "green-giddy-denebola": {
      erc20: {
        skl: {
          address: "0x7F73B66d4e6e67bCdeaF277b9962addcDabBFC4d",
          chains: {
            "elated-tan-skat": {
              clone: true,
            },
            mainnet: {
              clone: true,
              hub: "elated-tan-skat",
            },
          },
        },
        usdc: {
          address: "0xCC205196288B7A26f6D43bBD68AaA98dde97276d",
          chains: {
            "elated-tan-skat": {
              clone: true,
            },
            mainnet: {
              clone: true,
              hub: "elated-tan-skat",
            },
          },
        },
        prospect: {
          address: "0xB8772b4250A6070F0BC0f2Be25decF534D0242ae",
          chains: {
            "elated-tan-skat": {
              clone: true,
            },
            mainnet: {
              clone: true,
              hub: "elated-tan-skat",
            },
          },
        },
      },
    },
    // doesn't work correctly
    "frayed-decent-antares": {
      erc20: {
        brawl: {
          address: "0xE0A107a0010930Ac218ED0a50937b50D5633EB3e",
          chains: {
            "elated-tan-skat": {},
          },
        },
      },
    },
    // todo EXD needs to deploy the erc20 clone of EuropaEXD wrapper address
    // "light-vast-diphda": {
    //   erc20: {
    //     exd: {
    //       address: "0xCfEBA92BD362B2F76fC30a89C433DE50a1D6Dead",
    //       chains: {
    //         "elated-tan-skat": {
    //           clone: true,
    //         },
    //         mainnet: {
    //           clone: true,
    //           hub: "elated-tan-skat",
    //         },
    //       },
    //     },
    //   },
    // },
    // todo Razor Team needs to ... deploy wRAZOR on razor_chain : then EuropaHub can deploy and map to the wrapper
    // hub is the l2 home
    "turbulent-unique-scheat": {
      erc20: {
        razor: {
          address: "0xcbf70914fae03b3acb91e953de60cfdaaca8145f",

          chains: {
            "elated-tan-skat": {},
            mainnet: {
              clone: true,
              hub: "turbulent-unique-scheat",
            },
          },
        },
      },
    },
  },
};
