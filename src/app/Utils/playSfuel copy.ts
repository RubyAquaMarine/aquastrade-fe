"use client";

/*

 The task here is to import a private key to fire off sfuel to users with zero sfuel within 
 their balance upon switching networks to europa : OnConnectWallet : check : fire off sfuel 
 before user lands on amm page or dash

*/

import { SFUEL_ABI } from "@/app/Abi/sfuel";

// import { useMutation, useQuery } from "@tanstack/react-query";
// http
//import { connect, createConfig } from "@wagmi/core";
// import { useClient, useConnectorClient, useSendTransaction } from "wagmi";
// import { type ConnectParameters } from "@wagmi/core";

//import { mainnet, skaleEuropa } from "@wagmi/core/chains";

// import { getConnections, sendTransaction } from "@wagmi/core";
// import { type SendTransactionParameters } from "@wagmi/core";

// https://viem.sh/docs/accounts/local.html
import { privateKeyToAccount } from "viem/accounts";
import { createWalletClient, http } from "viem";
import { skaleEuropa } from "viem/chains";

// import { parseEther, parseGwei } from "viem";
// import { UserRejectedRequestError } from "viem";
// import { getLogs, watchAsset } from "viem/actions";

// import { injected, mock } from "wagmi/connectors";

// Main config file that is passed down to the wagmi
// Providers within /app/providers.tsx
// export const config = createConfig({
//   chains: [mainnet, skaleEuropa],
//   connectors: [
//     injected(),
//     mock({
//       accounts: ["0xCDeb7F7974D89Fd71089487D65AA9731d7E846F5"],
//       features: {
//         connectError: new UserRejectedRequestError(
//           new Error("Failed to connect."),
//         ),
//         reconnect: false,
//       },
//     }),
//   ],
//   ssr: true,
//   transports: {
//     [mainnet.id]: http("https://eth-mainnet.g.alchemy.com/v2/..."),
//     [skaleEuropa.id]: http(
//       "https://mainnet.skalenodes.com/v1/elated-tan-skat",
//       { batch: { wait: 500 } },
//     ),
//   },
// });

const testKeyA = process.env.NEXT_PUBLIC_FAUCET_KEY;

async function privatekeySendsFuel() {
  const account = privateKeyToAccount(testKeyA as `0x${string}`);
  console.log("VIEM SFUEL ACCOUNT ", account);

  // viem new
  const client = createWalletClient({
    account,
    chain: skaleEuropa,
    transport: http(),
  });

  const hash = await client.writeContract({
    abi: SFUEL_ABI,
    address: "0xa26530CD46d7c039ce64484F5D0a7d44dF9f9206",
    args: ["0xCDeb7F7974D89Fd71089487D65AA9731d7E846F5"],
    functionName: "transferSFUEL",
  });
  console.log("Print the has from sfuel transfers ", hash);
  return hash;
}

export default privatekeySendsFuel;

// function privatekeySendsFuel() {
//     const { data: hash } = useSendTransaction({
//       account,
//       to: '0xCDeb7F7974D89Fd71089487D65AA9731d7E846F5',
//       value: parseEther('0.001')
//     })
//   }

// This doesn't work because of the connector "mock" : need to learn more
// export const sendSfuel = async (_name: string) => {
//     const connected = await connect(config, { connector: injected(), mock() })
//     if (connected) {
//         const connections = getConnections(config)
//         const result = await sendTransaction(config, {
//             connector: connections[0]?.connector,
//             gas: parseGwei('5000'),
//             to: '0xCDeb7F7974D89Fd71089487D65AA9731d7E846F5',
//             value: parseEther('0.000001'),
//         })
//     }
// };

// function Example() {
//     // 3. Extract a Viem Client for the current active chain.
//     const publicClient = useClient({ config })

//     // 4. Create a "custom" Query Hook that utilizes the Client.
//     const { data: logs } = useQuery({
//       queryKey: ['logs', publicClient.uid],
//       queryFn: () => getLogs(publicClient, /* ... */)
//     })

//     // 5. Extract a Viem Client for the current active chain & account.
//     const { data: walletClient } = useConnectorClient(config)

//     // 6. Create a "custom" Mutation Hook that utilizes the Client.
//     const { mutate } = useMutation({
//       mutationFn: (asset) => watchAsset(walletClient, asset)
//     })

//     return (
//       <div>
//         {/* ... */}
//       </div>
//     )
//   }
