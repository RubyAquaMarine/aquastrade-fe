"use client";
// @ts-nocheck
// RUBY staking contract: working
import { useState } from "react";

import { parseEther } from "viem";
import { useAccount, useSwitchChain, useWriteContract } from "wagmi";
import styles from "@/app/Styles/Links.module.css";
import styles_button from "@/app/Styles/Toggle.module.css";
import { rubyStakerABI } from "@/app/Abi/rubystaker";

import { CHAIN, RUBY_STAKER } from "@/app/Utils/config";

const Home = () => {
  const [inputs, setInputs] = useState(["", "", "", "", ""]);
  const [notification, setNotification] = useState("");
  //wagmi
  const { address, isConnected, chain } = useAccount();
  const { chains, switchChain } = useSwitchChain();
  const { writeContract } = useWriteContract();

  const buttonDescriptions = [
    "Stake RUBY to earn AMM fees ",
    "Lock RUBY to earn Penalty fees",
    "Claim Rewards (AMM & Penalty fees)",
    "Exit Staked RUBY",
    "Exit All (Staked & Locked)",
  ];

  const buttonLogicTexts = [
    "Stake RUBY",
    "Lock RUBY",
    "Claim Rewards ",
    "Exit Staked RUBY",
    "Exit All",
  ];

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  function getInputValue(index: number) {
    //stake
    if (index === 0) {
      return inputs[0];
    }
    //lock
    if (index === 1) {
      return inputs[1];
    }

    if (index === 2) {
      return "show rewards"; // todo fetch user rewards
    }

    if (index === 3) {
      //  return "45633.347578374";// todo fetch user staked amount
    }
    if (index === 4) {
      return "show staked amount"; // todo fetch user staked amount
    }
    // Add more conditions as needed
  }

  /*
    main logic for sc interactions
  */
  const handleButtonClick = (index: number) => {
    switch (index) {
      case 0:
        // Stake
        writeContract({
          abi: rubyStakerABI,
          address: RUBY_STAKER,
          functionName: "stake",
          args: [parseEther(inputs[0], "wei"), false],
        });
        console.log("Staking Ruby");
        break;
      case 1:
        // Lock
        writeContract({
          abi: rubyStakerABI,
          address: RUBY_STAKER,
          functionName: "stake",
          args: [parseEther(inputs[1], "wei"), true],
        });
        console.log("Locking Ruby");
        break;
      case 2:
        writeContract({
          abi: rubyStakerABI,
          address: RUBY_STAKER,
          functionName: "getReward",
        });
        console.log("Claiming reward");
        break;
      case 3:
        writeContract({
          abi: rubyStakerABI,
          address: RUBY_STAKER,
          functionName: "withdraw",
          args: [parseEther(inputs[3], "wei")],
        });
        console.log("Withdraw Staked Ruby");
        break;
      case 4:
        writeContract({
          abi: rubyStakerABI,
          address: RUBY_STAKER,
          functionName: "exit",
        });
        console.log("Withdraw Staked+Penalty Ruby");
        break;
      default:
        break;
    }
  };

  /* todo
    if the user doesn't have the network within the MM already, then switching doesn't prompt 
  */

  const handleLinkClickRubySwap = (
    // event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    targetChainId: number,
  ) => {
    if (chain) {
      if (chain.id !== targetChainId) {
        event.preventDefault(); // Prevent the link from forwarding
        const mess = `Please switch network to ChainID ${targetChainId} to access this link.`; //Please select ChainID: {targetedChainID}
        setNotification(mess);
        switchChain({ chainId: targetChainId }); // todo
      }
    }
  };
  // min-h-screen
  return (
    <main className="flex  flex-col items-center justify-between p-24">
      <div>
        {/** Handles Network switching to Europa Hub */}

        {!address || (chain && chain.id !== CHAIN.id) ? (
          <div>
            <p>Please select ChainID: 2046399126</p>
            <button
              onClick={(event) => handleLinkClickRubySwap(event, 2046399126)}
              className={styles_button.toggleButton}
            >
              Switch Network
            </button>
          </div>
        ) : (
          <div>
            <h1 className={styles.midText}>Stake Tokens</h1>
            <p>
              {" "}
              Connected to {chain && chain.name} | {chain && chain.id}
            </p>
          </div>
        )}
      </div>
      {/** Grid to show buttons and available functions */}
      <div className="grid grid-cols-3 gap-1 w-full">
        <div className="p-4">
          <div className="space-y-2">
            {/** Handle input values from cells */}
            {inputs.map((value, index) => (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  value={getInputValue(index)} // Call a function to get the appropriate value
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className="border rounded p-0.2 w-full"
                  placeholder={`Input ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="p-4">
          <div className="space-y-2">
            {buttonDescriptions.map((description, index) => (
              <p key={index}>
                {" "}
                <button
                  className={styles_button.toggleButton}
                  onClick={() => handleButtonClick(index)}
                >
                  {buttonLogicTexts[index]}
                </button>
              </p>
            ))}
          </div>
        </div>

        <div className="p-4">
          <div className="space-y-2">
            {buttonDescriptions.map((description, index) => (
              <p key={index}>{description}</p>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};
export default Home;
