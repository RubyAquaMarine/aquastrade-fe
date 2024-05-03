# trust wallet

No support for Skale with Trust Wallet

- https://github.com/trustwallet/wallet-core/issues/546
- `isNewChainsStale` - https://github.com/wevm/wagmi/pull/3787

`WalletConnect v2 does not prompt the Wallet to switch networks. When we instantiate a WalletConnect v2 Provider, you provide it with a set of chains that you support, and then when the user connects, it will prompt them to authorize ALL supported chains. This means that no prompt will appear in the Wallet when you call wallet_switchEthereumChain, because the chain has already been authorized. Instead, WalletConnect v2's Provider switches chain context when this method is called, and you need to handle active chain state accordingly.`
