# AquasTrade

0 gas fees, NFT-powered AMM DEX, NFT Market Place, and leveraged trading on the SKALE Network

- AQUA: [read docs](/docs/AQUA.md)
- AMM (v2): [list token](/docs/addNewTokens.md)
- ERC20 Airdrop: [read docs](/docs/Airdrop.md)
- Perps: coming soon
- Games: [coinflip](https://aquas.trade/dashboard/coinflip)
- NFT Market Place: coming after [NFT Sales](https://aquas.trade/nft)
- sFuel automatic distribution

## tech

- next 14.1.2 : file based routing
- viem: 2.8.13
- wagmi: 2.5.7
- [react ](react_.md)

# Getting Started

Create .env.local

```
NEXT_PUBLIC_WC_PROJECT_ID= wallet connect id
NEXT_PUBLIC_FAUCET_KEY= enter a private key with no assets other than sfuel
```

First, run the development server:

```bash
npm install
npm run dev
npm install -g pino-pretty
# or
yarn add pino-pretty
yarn
yarn dev

# prod
yarn build
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributors

- [readme](/docs/Contributors.md)

# Security and Liability

The aquastrade-fe and code is WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

## License

![GitHub](https://img.shields.io/github/license/rubyaquamarine/aquastrade-fe.svg)

All contributions are made under the [GNU Lesser General Public License v3](https://www.gnu.org/licenses/lgpl-3.0.en.html). See [LICENSE](LICENSE).
