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
    "adorable-quaint-bellatrix",
    "elated-tan-skat",
    "frayed-decent-antares",
    "honorable-steel-rasalhague",
    "affectionate-immediate-pollux",
    "wan-red-ain",
    "green-giddy-denebola",
    "light-vast-diphda",
    "turbulent-unique-scheat",
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
            "adorable-quaint-bellatrix": {},
            "elated-tan-skat": {},
          },
        },
      },
      erc20: {
        // List all the L1 tokens within the L1.Skale.DepositBoxERC20
        // EuropaHub Toke List
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
  },
};

/*
    StreamMyScreen

    Proposal to SMS: 
    - deploy erc20 clones on adorable-quaint-bellatrix
    -  "Europa Ether", "eETH" or "ETHe", 18 , map to 0xa5274efA35EbeFF47C1510529D9a8812F95F5735 (wrapped Europa Ether)
    -- optional:  "Europa USDC", "USDC", 6 , map to 0x1c566a47e1baC535Ca616373146e3BE024F88Aa4 (wrapped Europa USDC)

    This will allow the 412 addresses holding ether on Europa the ability to test out your product
     and adding any of the 4 stable coins to your platform would be benefical too. I've provided an example for USDC
*/
export const SmsConfig = {
  openOnLoad: true, // Open Metaport on load (optional, default = false)
  // skaleNetwork: 'mainnet', // SKALE network that will be used - mainnet or staging (optional, defualt = mainnet)
  // autoLookup: true,
  debug: false,
  mainnetEndpoint: "https://eth.llamarpc.com",
  chains: ["mainnet", "elated-tan-skat", "adorable-quaint-bellatrix"],
  chainsMetadata: {
    "elated-tan-skat": {
      alias: "Europa Hub",
      minSfuelWei: "1",
      faucetUrl: "https://ruby.exchange/faucet.html",
    },

    "adorable-quaint-bellatrix": {
      alias: "StreamMyScreen",
      minSfuelWei: "1",
      faucetUrl: "https://sfuel.dirtroad.dev",
    },
  },
  tokens: {
    mainnet: {
      eth: {
        chains: ["adorable-quaint-bellatrix", "elated-tan-skat"],
      },
      erc20: {
        USDC: {
          name: "Circle USD",
          address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
          symbol: "USDC",
          iconUrl: "https://ruby.exchange/images/tokens/usdc-square.jpg",
        },
      },
    },
    "elated-tan-skat": {
      erc20: {
        wUSDC: {
          name: "USDC",
          symbol: "USDC",
          address: "0x1c566a47e1baC535Ca616373146e3BE024F88Aa4",
          iconUrl: "https://ruby.exchange/images/tokens/usdc-square.jpg",
          decimals: "6",
          wraps: {
            // token that needs to be wrapped
            address: "0x5F795bb52dAC3085f578f4877D450e2929D2F13d", // unwrapped token address
            symbol: "USDC", // unwrapped token symbol
          },
        },
        wETH: {
          name: "ETH", // UI: token symbol display name (On the left).
          symbol: "ETH", // UI: token symbol display name for the balance (On the right when on the target chain).
          address: "0xa5274efA35EbeFF47C1510529D9a8812F95F5735", // wrapper token address
          iconUrl: "https://ruby.exchange/images/tokens/eth-square.jpg",
          wraps: {
            address: "0xD2Aaa00700000000000000000000000000000000", // unwrapped token address
            symbol: "ETH", // UI: token symbol display name for the balance (On the right).
          },
        },
      },
    },
  },
  theme: {
    primary: "#192d2b",
    background: "#03DAC6",
    mode: "light",
  },
};

export const stagingConfig = {
  showButton: true,
  openOnLoad: true, // Open Metaport on load (optional, default = false)
  skaleNetwork: "staging3", // SKALE network that will be used - mainnet or staging (optional, defualt = mainnet)
  mainnetEndpoint: "https://endpoints.omniatech.io/v1/eth/goerli/public",
  chains: [
    "mainnet", // List of SKALE Chains that will be available in the Metaport UI (default = [])
    "staging-legal-crazy-castor",
    "staging-utter-unripe-menkar",
  ],
  chainsMetadata: {
    // Chain name aliases that will be displayed in the UI (optional, defualt = {})
    "staging-legal-crazy-castor": {
      alias: "Europa SKALE Chain", // optional
      minSfuelWei: "27000000000000", // optional
      faucetUrl: "https://sfuel.dirtroad.dev", // optional,
    },
    "staging-utter-unripe-menkar": {
      alias: "Calypso SKALE Chain",
      minSfuelWei: "27000000000000", // optional
      faucetUrl: "https://sfuel.dirtroad.dev", // optional
    },
  },
  tokens: {
    mainnet: {
      eth: {
        chains: ["staging-legal-crazy-castor"],
      },
      erc20: {
        _SKL_0x493D4442013717189C9963a2e275Ad33bfAFcE11: {
          name: "SKL",
          address: "0x493D4442013717189C9963a2e275Ad33bfAFcE11",
          symbol: "SKL",
        },
      },
    },
    "staging-legal-crazy-castor": {
      erc20: {
        _ETH_0xa270484784f043e159f74C03B691F80B6F6e3c24: {
          // wrapper token
          name: "ETH", // wrapper token display name
          symbol: "ETH",
          address: "0xa270484784f043e159f74C03B691F80B6F6e3c24", // wrapper token address
          iconUrl: "https://ruby.exchange/images/tokens/eth-square.jpg",
          wraps: {
            // token that needs to be wrapped
            iconUrl: "https://ruby.exchange/images/tokens/eth-square.jpg",
            address: "0xD2Aaa00700000000000000000000000000000000", // unwrapped token address
            symbol: "ETHC", // unwrapped token symbol
          },
        },
        _SKL_0x6a679eF80aF3fE01A646F858Ca1e26D58b5430B6: {
          name: "SKL",
          symbol: "SKL",
          address: "0x6a679eF80aF3fE01A646F858Ca1e26D58b5430B6",
          iconUrl: "https://ruby.exchange/images/tokens/skl-square.jpg",
          wraps: {
            // token that needs to be wrapped
            address: "0xbA1E9BA7CDd4815Da6a51586bE56e8643d1bEAb6", // unwrapped token address
            symbol: "SKL", // unwrapped token symbol
            iconUrl: "https://ruby.exchange/images/tokens/skl-square.jpg",
          },
        },
        _USDC_0x4f250cCE5b8B39caA96D1144b9A32E1c6a9f97b0: {
          name: "USDC",
          symbol: "USDC",
          decimals: "6",
          address: "0x4f250cCE5b8B39caA96D1144b9A32E1c6a9f97b0",
          iconUrl: "https://ruby.exchange/images/tokens/usdc-square.jpg",
          wraps: {
            // token that needs to be wrapped
            address: "0x5d42495D417fcd9ECf42F3EA8a55FcEf44eD9B33", // unwrapped token address
            symbol: "USDC", // unwrapped token symbol
            iconUrl: "https://ruby.exchange/images/tokens/usdc-square.jpg",
          },
        },
      },
    },
  },
  theme: {
    // custom widget theme (default = dark SKALE theme)
    primary: "#00d4ff", // primary accent color for action buttons
    background: "#0a2540", // background color
    mode: "dark", // theme type - dark or light
  },
};
