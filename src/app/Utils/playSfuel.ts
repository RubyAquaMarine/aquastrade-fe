"use client";

/*

 The task here is to import a private key to fire off sfuel to users with zero sfuel within 
 their balance upon switching networks to europa : onConnectWallet : check : fire off sfuel 
 before user lands on amm page or dashboard

*/

// https://viem.sh/docs/accounts/local.html
import { privateKeyToAccount } from "viem/accounts";
import { createWalletClient, http } from "viem";
import { skaleEuropa } from "viem/chains";
import { SFUEL_ABI } from "@/app/Abi/sfuel";

const testKeyA = process.env.NEXT_PUBLIC_FAUCET_KEY;

async function privatekeySendsFuel(params: `0x${string}`) {
  const account = privateKeyToAccount(testKeyA as `0x${string}`);

  console.log("VIEM SFUEL ACCOUNT ", account);
  console.log("VIEM SFUEL TO  ", params);

  const client = createWalletClient({
    account,
    chain: skaleEuropa,
    transport: http(),
  });

  // works if the args address matches the pkey address.  but I couldn't pass in the props address and have the same outcome.  tx fails, or something, no hash is returned.
  // new : 0x453495a7bD8943530FdcBAEE6749795F1f07dBD3
  // old : mint : 0xa26530CD46d7c039ce64484F5D0a7d44dF9f9206
  const hash = await client.writeContract({
    abi: SFUEL_ABI,
    address: "0x453495a7bD8943530FdcBAEE6749795F1f07dBD3",
    args: [params],
    functionName: "transferSFUEL",
  });
  console.log("VIEM SFUEL HASH ", hash);
  return hash;
}

export default privatekeySendsFuel;
