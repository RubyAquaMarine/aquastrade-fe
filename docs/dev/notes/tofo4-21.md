# NFTGating a page

lets token-gate : nft bronze or higher for perps-trading page: if no pass, redirect to nft page: investors for liquidity on perps are still allowed. ^^ trading pass

- test nft-gating on token-Airdrop page : targeting memecoin launchers basically : to prevent floods. (todo: deploy:token-Deployer-Factory)

## TokenList page

- http://localhost:3000/user
- [http://localhost:3000/user/wallet address](http://localhost:3000/user/0xCDeb7F7974D89Fd71089487D65AA9731d7E846F5)
- show all connected wallet addresses : http://localhost:3000/test
- - todo: dropdown list of connectedAddresses : And show only the fist 2 and last 4 Digits of the 0x address

## Wallet Connect

- https://github.com/trustwallet/wallet-core/issues/546
- `isNewChainsStale` - https://github.com/wevm/wagmi/pull/3787

`WalletConnect v2 does not prompt the Wallet to switch networks. When we instantiate a WalletConnect v2 Provider, you provide it with a set of chains that you support, and then when the user connects, it will prompt them to authorize ALL supported chains. This means that no prompt will appear in the Wallet when you call wallet_switchEthereumChain, because the chain has already been authorized. Instead, WalletConnect v2's Provider switches chain context when this method is called, and you need to handle active chain state accordingly.`

# Icons

https://react-icons.github.io/react-icons/icons/ai/

- import { AiFillGithub } from "react-icons/ai";// todo github icon
