// components/PrivateKeyInput.tsx
import React, { useState } from "react";
import { ethers } from "ethers";

const PrivateKeyInput: React.FC = () => {
  const [privateKey, setPrivateKey] = useState("");
  const [provider, setProvider] =
    useState<ethers.providers.JsonRpcProvider | null>(null);
  const [wallet, setWallet] = useState<ethers.Wallet | null>(null);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrivateKey(e.target.value);
  };

  const loadWallet = () => {
    try {
      const wallet = new ethers.Wallet(privateKey);
      const provider = new ethers.providers.JsonRpcProvider(
        "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID",
      ); // Replace with your provider
      const connectedWallet = wallet.connect(provider);

      setProvider(provider);
      setWallet(connectedWallet);
      alert("Wallet loaded successfully");
    } catch (error) {
      console.error("Failed to load wallet:", error);
      alert("Invalid private key");
    }
  };

  const signTransaction = async () => {
    if (!wallet) {
      alert("Load wallet first");
      return;
    }

    const tx = {
      to: "0xRecipientAddressHere", // Replace with the recipient address
      value: ethers.utils.parseEther("0.01"), // Replace with the amount you want to send
      gasLimit: 21000, // Gas limit
      gasPrice: ethers.utils.parseUnits("10", "gwei"), // Gas price
    };

    try {
      const signedTx = await wallet.signTransaction(tx);
      const sentTx = await provider?.sendTransaction(signedTx);
      setTransactionHash(sentTx?.hash || null);
    } catch (error) {
      console.error("Failed to sign transaction:", error);
      alert("Failed to sign transaction");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={privateKey}
        onChange={handleInputChange}
        placeholder="Enter your private key"
        style={{ width: "400px", padding: "8px", marginBottom: "8px" }}
      />
      <br />
      <button
        onClick={loadWallet}
        style={{ marginRight: "8px", padding: "8px 16px" }}
      >
        Load Wallet
      </button>
      <button onClick={signTransaction} style={{ padding: "8px 16px" }}>
        Sign Transaction
      </button>
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
