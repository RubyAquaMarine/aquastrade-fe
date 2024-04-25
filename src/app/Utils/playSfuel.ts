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
import { findContractInfo } from "@/app/Utils/findTokens";

const faucetContract = findContractInfo("faucet");

async function privatekeySendsFuel(params: `0x${string}`) {
  const account = privateKeyToAccount(
    process.env.NEXT_PUBLIC_FAUCET_KEY as `0x${string}`,
  );

  const client = createWalletClient({
    account,
    chain: skaleEuropa,
    transport: http(),
  });

  const hash = await client.writeContract({
    abi: SFUEL_ABI,
    address: faucetContract?.addr,
    args: [params],
    functionName: "transferSFUEL",
  });
  return hash;
}

export default privatekeySendsFuel;
