"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { privateKeyToAccount } from "viem/accounts";
import { createWalletClient, http } from "viem";
import { skaleEuropa } from "viem/chains";
import { SFUEL_ABI } from "@/app/Abi/sfuel";
import { findContractInfo } from "@/app/Utils/findTokens";
import styles from "@/app/Styles/Telegram.module.css";

const PrivateKeyInput: React.FC = () => {
  const [privateKey, setPrivateKey] = useState<`0x${string}`>();
  const [provider, setProvider] = useState<any>();
  const [wallet, setWallet] = useState<any>();
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  useEffect(() => {
    if (privateKey) {
      console.log("Load API KEYS");
      loadWallet();
    }
  }, [privateKey]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrivateKey(e.target.value as `0x${string}`);
  };

  const loadWallet = () => {
    console.log(" Load Wallet on button click ");

    try {
      const account = privateKeyToAccount(privateKey as `0x${string}`);
      const provider = createWalletClient({
        account,
        chain: skaleEuropa,
        transport: http(),
      });

      // console.log(" Account : Wallet Details ", account);

      // console.log(" Provider Details ", provider);

      //  const connectedWallet = wallet.connect(provider);

      setProvider(provider);
      setWallet(account);
      alert("Wallet loaded successfully");
    } catch (error) {
      console.error("Failed to load wallet:", error);
      alert("Invalid private key");
    }
  };

  // const signTransaction = async () => {
  //   if (!wallet) {
  //     alert('Load wallet first');
  //     return;
  //   }

  //   const tx = {
  //     to: '0xRecipientAddressHere', // Replace with the recipient address
  //     value: ethers.utils.parseEther('0.01'), // Replace with the amount you want to send
  //     gasLimit: 21000, // Gas limit
  //     gasPrice: ethers.utils.parseUnits('10', 'gwei'), // Gas price
  //   };

  //   try {
  //     const signedTx = await wallet.signTransaction(tx);
  //     const sentTx = await provider?.sendTransaction(signedTx);
  //     setTransactionHash(sentTx?.hash || null);
  //   } catch (error) {
  //     console.error('Failed to sign transaction:', error);
  //     alert('Failed to sign transaction');
  //   }
  // };

  return (
    <div className={styles.content}>
      {!privateKey ? (
        <span>
          {" "}
          <input
            type="text"
            value={privateKey}
            onChange={handleInputChange}
            placeholder="Enter your private key"
            className={styles.content}
          />
          <span className={styles.content_right}>
            {" "}
            <Link
              className={styles.button}
              href="https://t.me/AquasTradeBot"
              target="_blank"
            >
              get keys
            </Link>
          </span>
        </span>
      ) : (
        <span>
          {`${provider?.account?.address?.slice(0, 4)} ... ${provider?.account?.address?.slice(38, 42)}`}
        </span>
      )}

      {transactionHash && (
        <div>
          <p>Transaction sent! Hash:</p>
          <p>{transactionHash}</p>
        </div>
      )}
    </div>
  );
};

export default PrivateKeyInput;

/*
 <button onClick={signTransaction} style={{ padding: '8px 16px' }}>
        Sign Transaction
      </button>
*/
