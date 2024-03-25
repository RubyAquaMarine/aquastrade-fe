// bug in usdt showing 18 decimal
export const RubyConfig = {
  openOnLoad: true, // Open Metaport on load (optional, default = false)
  // skaleNetwork: 'mainnet', // SKALE network that will be used - mainnet or staging (optional, defualt = mainnet)
  // autoLookup: true,
  debug: false,
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
  chainsMetadata: {
    "elated-tan-skat": {
      alias: "Europa Hub",
      minSfuelWei: "1",
      faucetUrl: "https://ruby.exchange/faucet.html",
    },
    "frayed-decent-antares": {
      alias: "Brawl Chain",
    },
    "affectionate-immediate-pollux": {
      alias: "CryptoBlades",
      minSfuelWei: "1",
      faucetUrl: "https://sfuel.dirtroad.dev",
    },
    "honorable-steel-rasalhague": {
      alias: "Calypso NFT Hub",
      minSfuelWei: "1",
      faucetUrl: "https://sfuel.dirtroad.dev",
    },
    "wan-red-ain": {
      alias: "Human Protocol",
      minSfuelWei: "1",
      faucetUrl: "https://sfuel.dirtroad.dev",
    },
    "green-giddy-denebola": {
      alias: "Nebula Gaming Hub",
      minSfuelWei: "1",
      faucetUrl: "https://sfuel.dirtroad.dev",
    },
    "light-vast-diphda": {
      alias: "Exorde Network",
      minSfuelWei: "1",
      faucetUrl: "https://sfuel.dirtroad.dev",
    },
    "turbulent-unique-scheat": {
      alias: "Razor Network",
      minSfuelWei: "1",
      faucetUrl: "https://sfuel.dirtroad.dev",
    },
  },
  tokens: {
    // Dont include any wrapped RubyXYZ tokens under non europa chains
    mainnet: {
      eth: {
        chains: ["adorable-quaint-bellatrix", "elated-tan-skat"],
      },
      erc20: {
        RUBY: {
          name: "Ruby Token",
          address: "0x918D8F3670c67f14Ff3fEB025D46B9C165d12a23",
          symbol: "RUBY",
          iconUrl: "https://ruby.exchange/images/tokens/ruby-square.png",
        },
        USDC: {
          decimals: "6",
          name: "Circle USD",
          address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
          symbol: "USDC",
          iconUrl: "https://ruby.exchange/images/tokens/usdc-square.jpg",
        },
        USDT: {
          decimals: "6",
          name: "Tether USD",
          address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
          symbol: "USDT",
          iconUrl: "https://ruby.exchange/images/tokens/usdt-square.jpg",
        },
        USDP: {
          name: "Paxos USD",
          address: "0x8E870D67F660D95d5be530380D0eC0bd388289E1",
          symbol: "USDP",
          iconUrl: "https://ruby.exchange/images/tokens/usdp-square.png",
        },
        DAI: {
          name: "Dai Stable Coin",
          address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
          symbol: "DAI",
          iconUrl: "https://ruby.exchange/images/tokens/dai-square.jpg",
        },
        SKL: {
          name: "SKALE",
          address: "0x00c83aeCC790e8a4453e5dD3B0B4b3680501a7A7",
          symbol: "SKL",
          iconUrl: "https://ruby.exchange/images/tokens/skl-square.jpg",
        },
        HMT: {
          name: "Human Token",
          address: "0x00c83aeCC790e8a4453e5dD3B0B4b3680501a7A7",
          symbol: "HMT",
          iconUrl: "https://ruby.exchange/images/tokens/hmt-square.png",
        },
        EXD: {
          name: "Exorde Network Token",
          address: "0x00c83aeCC790e8a4453e5dD3B0B4b3680501a7A7",
          symbol: "EXD",
          iconUrl: "https://ruby.exchange/images/tokens/exd-square.png",
        },
        RAZOR: {
          name: "Razor Network Token",
          address: "0x50DE6856358Cc35f3A9a57eAAA34BD4cB707d2cd",
          symbol: "RAZOR",
          iconUrl: "https://ruby.exchange/images/tokens/exd-square.png",
        },
        PROSPECT: {
          name: "Prospect Token",
          address: "0xF7Ea4B5254551744B221C9562F9Ac09064B7De32",
          symbol: "PROSPECT",
          iconUrl: "https://ruby.exchange/images/tokens/exd-square.png",
        },
      },
      ETH: {}, // using lowercase eth kills the erc20 loading process: no tokens are shown
    },

    "green-giddy-denebola": {
      erc20: {
        TGOLD: {
          name: "Tank Gold Token",
          address: "0x30fA2f22Ee996dB842C56DAFd7Ee801b57C5DD4A",
          symbol: "TGOLD",
          iconUrl: "https://ruby.exchange/images/tokens/tgold-square.png",
        },
      },
    },

    "frayed-decent-antares": {
      erc20: {
        BRAWL: {
          name: "BRAWL",
          address: "0xE0A107a0010930Ac218ED0a50937b50D5633EB3e",
          symbol: "BRAWL",
          iconUrl: "https://ruby.exchange/images/tokens/brawl-square.png",
          wrapsSFuel: true,
        },
      },
    },
    "affectionate-immediate-pollux": {
      erc20: {
        SKILL: {
          name: "SKILL",
          address: "0x5F6E97612482095C0c2C02BC495C0171e61017d7",
          symbol: "SKILL",
          iconUrl: "https://ruby.exchange/images/tokens/skill-square.png",
        },
      },
    },
    "elated-tan-skat": {
      erc20: {
        wUSDT: {
          name: "USDT",
          symbol: "USDT",
          address: "0x1c0491E3396AD6a35f061c62387a95d7218FC515",
          iconUrl: "https://ruby.exchange/images/tokens/usdp-square.png",
          wraps: {
            // token that needs to be wrapped
            address: "0x73d22d8a2D1f59Bf5Bcf62cA382481a2073FAF58", // unwrapped token address
            symbol: "USDP", // unwrapped token symbol
          },
        },
        wUSDP: {
          name: "USDP",
          symbol: "USDP",
          address: "0x91E87e460b19F7aD35e983b120bD4aAD5446d319",
          iconUrl: "https://ruby.exchange/images/tokens/usdp-square.png",
          wraps: {
            // token that needs to be wrapped
            address: "0x73d22d8a2D1f59Bf5Bcf62cA382481a2073FAF58", // unwrapped token address
            symbol: "USDP", // unwrapped token symbol
          },
        },
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
        wDAI: {
          name: "DAI",
          symbol: "DAI",
          address: "0x9E7563B0D51F9B6dFB1917F97D29D50804300d28",
          iconUrl: "https://ruby.exchange/images/tokens/dai-square.jpg",
          wraps: {
            // token that needs to be wrapped
            address: "0xD05C4be5f3be302d376518c9492EC0147Fa5A718", // unwrapped token address
            symbol: "DAI", // unwrapped token symbol
          },
        },
        wRUBY: {
          name: "RUBY",
          symbol: "RUBY",
          address: "0x31D3EDCfFd62C7350e02045ED39F0FE2D0598A86",
          iconUrl: "https://ruby.exchange/images/tokens/ruby-square.png",
          wraps: {
            // token that needs to be wrapped
            address: "0x2B4e4899b53E8b7958c4591a6d02f9C0b5c50F8f", // unwrapped token address
            symbol: "RUBY", // unwrapped token symbol
          },
        },
        wSKL: {
          name: "SKL",
          symbol: "SKL",
          address: "0xD162bB5c75FE99144295b03510bAb2DF99617440",
          iconUrl: "https://ruby.exchange/images/tokens/skl-square.jpg",
          wraps: {
            // token that needs to be wrapped
            address: "0xE0595a049d02b7674572b0d59cd4880Db60EDC50", // unwrapped token address
            symbol: "SKL", // unwrapped token symbol
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
        wHMT: {
          name: "HMT", // UI: token symbol display name (On the left).
          symbol: "HMT", // UI: token symbol display name for the balance (On the right when on the target chain).
          address: "0xA0f4D4db1457E442b83555cb92aaBB8DE959Aa75", // wrapper token address
          iconUrl: "https://ruby.exchange/images/tokens/hmt-square.png",
          wraps: {
            address: "0xBE3530a3eDf9472693065041B8c9155C7FeCB8e5", // unwrapped token address
            symbol: "HMT", // UI: token symbol display name for the balance (On the right).
          },
        },
        wPROSPECT: {
          name: "PROSPECT", // UI: token symbol display name (On the left).
          symbol: "PROSPECT", // UI: token symbol display name for the balance (On the right when on the target chain).
          address: "0x96eB0c03D98214D4154c354b5b55FF7F6d94DFac", // wrapper token address
          iconUrl: "https://ruby.exchange/images/tokens/prospect-square.png",
          wraps: {
            address: "0xA30cA600b8E722E2513B7738493F410a6Ae4a373", // unwrapped token address
            symbol: "PROSPECT", // UI: token symbol display name for the balance (On the right).
          },
        },
        wEXD: {
          name: "EXD",
          symbol: "EXD",
          address: "0x0B8FAa4373978E36E5F4a6e7041D4f08dD1CAB95", //wrapper addr : EXD team still needs to deploy the clone on their chain before s2s will work
          iconUrl: "https://ruby.exchange/images/tokens/exd-square.png",
          wraps: {
            // token that needs to be wrapped
            address: "0xCfEBA92BD362B2F76fC30a89C433DE50a1D62BcA", // unwrapped token address
            symbol: "EXD", // unwrapped token symbol
          },
        },
      },
    },
  },
  theme: {
    primary: "#0d0d10",
    background: "#03bada",
    mode: "light",
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
