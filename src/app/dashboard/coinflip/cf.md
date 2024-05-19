http://localhost:3000/dashboard/coinflip

- viem rpc using websocket : refresh browser to get latest values : otherwise readContract doesnt return latest values consistently.
- user flow

1. first render gets win, losses, balance
2. approve token to smart contract (need to add this functionality : exists on /dashboard/nft page.tsx)
3. user enters amount and clicks flip => MM prompt
4. onConfirmedTX : fetch win, losses, balance.

## coinflip2

recoded using app/Hooks instead of app/Components
