import { interfaces } from "skale_metaport";
export const RubyConfig: interfaces.MetaportConfig = {
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
    "elated-tan-skat",
    "frayed-decent-antares",
    "honorable-steel-rasalhague",
    "affectionate-immediate-pollux",
    "wan-red-ain",
    "green-giddy-denebola",
    "light-vast-diphda",
    "turbulent-unique-scheat",
    "adorable-quaint-bellatrix",
  ],
  tokens: {
    eth: {
      symbol: "ETH",
    },
    skl: {
      decimals: "18",
      name: "SKALE",
      symbol: "SKL",
    },
    usdc: {
      decimals: "6",
      symbol: "USDC",
      name: "USD Coin",
    },
    usdp: {
      decimals: "18",
      symbol: "USDP",
      name: "Paxos USD",
      iconUrl: "https://ruby.exchange/images/tokens/usdp-square.png",
    },
    usdt: {
      decimals: "6",
      symbol: "USDT",
      name: "Tether USD",
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
      iconUrl: "https://ruby.exchange/images/tokens/ruby-square.png",
    },
    exd: {
      decimals: "18",
      symbol: "EXD",
      name: "Exorde Token",
      iconUrl: "https://ruby.exchange/images/tokens/exd-square.png",
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
      erc20: {
        // List all the L1 tokens within the L1.Skale.DepositBoxERC20 using the L1 addresses here
        // EuropaHub Toke List
        exd: {
          address: "0x02dE007D412266a2e0Fa9287C103474170F06560",
          chains: {
            "elated-tan-skat": {},
            "light-vast-diphda": {
              hub: "elated-tan-skat",
            },
          },
        },
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
        usdp: {
          address: "0x8E870D67F660D95d5be530380D0eC0bd388289E1",
          chains: {
            "elated-tan-skat": {},
            "honorable-steel-rasalhague": {
              hub: "elated-tan-skat",
            },
          },
        },
        usdt: {
          address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
          chains: {
            "elated-tan-skat": {},
            "honorable-steel-rasalhague": {
              hub: "elated-tan-skat",
            },
          },
        },
        dai: {
          address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
          chains: {
            "elated-tan-skat": {},
            "honorable-steel-rasalhague": {
              hub: "elated-tan-skat",
            },
          },
        },
        hmt: {
          address: "0xd1ba9BAC957322D6e8c07a160a3A8dA11A0d2867",
          chains: {
            "elated-tan-skat": {},
            "wan-red-ain": {
              hub: "elated-tan-skat",
            },
          },
        },
        prospect: {
          address: "0xF7Ea4B5254551744B221C9562F9Ac09064B7De32",
          chains: {
            "elated-tan-skat": {},
            "green-giddy-denebola": {
              hub: "elated-tan-skat",
            },
          },
        },
        ruby: {
          address: "0x918D8F3670c67f14Ff3fEB025D46B9C165d12a23",
          chains: {
            "elated-tan-skat": {},
            "green-giddy-denebola": {
              hub: "elated-tan-skat",
            },
          },
        },
        // Chaos Chain
        ff: {
          // idk what this token is : the xdao tokens i think. so maybe on chaos chain
          address: "0x7E9D8f07A64e363e97A648904a89fb4cd5fB94CD",
          chains: {
            "elated-tan-skat": {},
            "honorable-steel-rasalhague": {
              hub: "elated-tan-skat",
            },
          },
        },
        // Razore Chain
        razor: {
          // idk what this token is : the xdao tokens i think. so maybe on chaos chain
          address: "0x50DE6856358Cc35f3A9a57eAAA34BD4cB707d2cd",
          chains: {
            "turbulent-unique-scheat": {},
            "elated-tan-skat": {
              hub: "turbulent-unique-scheat",
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
        usdp: {
          address: "0x91E87e460b19F7aD35e983b120bD4aAD5446d319",
          chains: {
            mainnet: {
              clone: true,
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
    "light-vast-diphda": {
      erc20: {
        exd: {
          address: "0xCfEBA92BD362B2F76fC30a89C433DE50a1D62BcA",
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
    // todo Razor Team needs to ... deploy wRAZOR on razor_chain : then EuropaHub can deploy and map to the wrapper
    "turbulent-unique-scheat": {
      erc20: {
        razor: {
          address: "0xCfEBA92BD362B2F76fC30a89C433DE50a1D62BcA",
          chains: {
            "elated-tan-skat": {
            },
          },
        },
      },
    },
  },
};
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
    "elated-tan-skat",
    "frayed-decent-antares",
    "honorable-steel-rasalhague",
    "affectionate-immediate-pollux",
    "wan-red-ain",
    "green-giddy-denebola",
    "light-vast-diphda",
    "turbulent-unique-scheat",
    "adorable-quaint-bellatrix",
  ],
  tokens: {
    eth: {
      symbol: "ETH",
    },
    skl: {
      decimals: "18",
      name: "SKALE",
      symbol: "SKL",
    },
    usdc: {
      decimals: "6",
      symbol: "USDC",
      name: "USD Coin",
    },
    usdp: {
      decimals: "18",
      symbol: "USDP",
      name: "Paxos USD",
      iconUrl: "https://ruby.exchange/images/tokens/usdp-square.png",
    },
    usdt: {
      decimals: "6",
      symbol: "USDT",
      name: "Tether USD",
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
      iconUrl: "https://ruby.exchange/images/tokens/ruby-square.png",
    },
    exd: {
      decimals: "18",
      symbol: "EXD",
      name: "Exorde Token",
      iconUrl: "https://ruby.exchange/images/tokens/exd-square.png",
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
      erc20: {
        // List all the L1 tokens within the L1.Skale.DepositBoxERC20 using the L1 addresses here
        // EuropaHub Toke List
        exd: {
          address: "0x02dE007D412266a2e0Fa9287C103474170F06560",
          chains: {
            "elated-tan-skat": {},
            "light-vast-diphda": {
              hub: "elated-tan-skat",
            },
          },
        },
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
        usdp: {
          address: "0x8E870D67F660D95d5be530380D0eC0bd388289E1",
          chains: {
            "elated-tan-skat": {},
            "honorable-steel-rasalhague": {
              hub: "elated-tan-skat",
            },
          },
        },
        usdt: {
          address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
          chains: {
            "elated-tan-skat": {},
            "honorable-steel-rasalhague": {
              hub: "elated-tan-skat",
            },
          },
        },
        dai: {
          address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
          chains: {
            "elated-tan-skat": {},
            "honorable-steel-rasalhague": {
              hub: "elated-tan-skat",
            },
          },
        },
        hmt: {
          address: "0xd1ba9BAC957322D6e8c07a160a3A8dA11A0d2867",
          chains: {
            "elated-tan-skat": {},
            "wan-red-ain": {
              hub: "elated-tan-skat",
            },
          },
        },
        prospect: {
          address: "0xF7Ea4B5254551744B221C9562F9Ac09064B7De32",
          chains: {
            "elated-tan-skat": {},
            "green-giddy-denebola": {
              hub: "elated-tan-skat",
            },
          },
        },
        ruby: {
          address: "0x918D8F3670c67f14Ff3fEB025D46B9C165d12a23",
          chains: {
            "elated-tan-skat": {},
            "green-giddy-denebola": {
              hub: "elated-tan-skat",
            },
          },
        },
        // Chaos Chain
        ff: {
          // idk what this token is : the xdao tokens i think. so maybe on chaos chain
          address: "0x7E9D8f07A64e363e97A648904a89fb4cd5fB94CD",
          chains: {
            "elated-tan-skat": {},
            "honorable-steel-rasalhague": {
              hub: "elated-tan-skat",
            },
          },
        },
        // Razore Chain
        razor: {
          // idk what this token is : the xdao tokens i think. so maybe on chaos chain
          address: "0x50DE6856358Cc35f3A9a57eAAA34BD4cB707d2cd",
          chains: {
            "turbulent-unique-scheat": {},
            "elated-tan-skat": {
              hub: "turbulent-unique-scheat",
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
        usdp: {
          address: "0x91E87e460b19F7aD35e983b120bD4aAD5446d319",
          chains: {
            mainnet: {
              clone: true,
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
    "light-vast-diphda": {
      erc20: {
        exd: {
          address: "0xCfEBA92BD362B2F76fC30a89C433DE50a1D62BcA",
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
    // todo Razor Team needs to ... deploy wRAZOR on razor_chain : then EuropaHub can deploy and map to the wrapper
    "turbulent-unique-scheat": {
      erc20: {
        razor: {
          address: "0xCfEBA92BD362B2F76fC30a89C433DE50a1D62BcA",
          chains: {
            "elated-tan-skat": {
            },
          },
        },
      },
    },
  },
};
