"use client";
// @ts-nocheck
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { parseEther, parseUnits, formatUnits } from "viem";
import { useAccount, useSwitchChain, useWriteContract } from "wagmi";

import { useCoinflip, useERC20Token } from "@/app/Hooks/useCoinflip";

import { COIN_FLIP_AQUA, CHAIN, EUROPA_AQUA } from "@/app/Utils/config";

import { ERC20_ABI } from "@/app/Abi/erc20";

import { COIN_FLIP_ABI } from "@/app/Abi/europaCoinflip";

import styles from "@/app/Styles/Links.module.css";
import styles_button from "@/app/Styles/Toggle.module.css";

const Home = () => {
  const allowancesTest = useRef(undefined);
  const [inputs, setInputs] = useState([""]);
  const [notification, setNotification] = useState("");
  const { address, isConnected, chain } = useAccount();
  const { chains, switchChain } = useSwitchChain();
  const { writeContract } = useWriteContract();

  const array: any[any] = [address, COIN_FLIP_AQUA];
  const { data: tokenAllowance } = useERC20Token("allowance", array); // $AQUA

  const {
    data: loss,
    isLoading,
    isError,
  } = useCoinflip("totalLoss", [address]);

  const { data: win } = useCoinflip("totalWins", [address]);

  const { data: bal } = useCoinflip("balances", [address]);

  console.log(" User Allowance ", tokenAllowance);

  const buttonDescriptions = ["AQUA"];
  const buttonLogicTexts = ["Flip AQUA"];

  useEffect(() => {
    console.error("READ CONTRACT token allowance '", tokenAllowance);
    allowancesTest.current = tokenAllowance;
    console.error(
      " allowancesTest.current '",
      allowancesTest.current,
      typeof allowancesTest.current,
    );
  }, [tokenAllowance]);

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleButtonClick = (index: number) => {
    console.log(" this is the button to Flip Aqua", index);
    switch (index) {
      case 0:
        writeContract({
          abi: COIN_FLIP_ABI,
          address: COIN_FLIP_AQUA,
          functionName: "flipCoin",
          args: [parseEther(inputs[0], "wei")],
        });
        break;
      case 1:
        writeContract({
          abi: ERC20_ABI,
          address: EUROPA_AQUA,
          functionName: "approve",
          args: [COIN_FLIP_AQUA, parseEther(inputs[0])],
        });
        break;
      // Add more cases as needed
    }
  };

  const handleButtonClickWithdraw = (index: number) => {
    console.log(" this is the button for withdrawlAll Aqua ", index);
    switch (index) {
      case 0:
        writeContract({
          abi: COIN_FLIP_ABI,
          address: COIN_FLIP_AQUA,
          functionName: "WithdrawAll",
          args: [],
        });
        break;
      // Add more cases as needed
    }
  };

  const handleToEuropa = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    targetChainId: number,
  ) => {
    if (chain) {
      if (chain.id !== targetChainId) {
        event.preventDefault();
        const mess = `Please switch network to ChainID ${targetChainId} to access this link.`;
        setNotification(mess);
        // @ts-ignore: Unreachable code error
        switchChain({ chainId: targetChainId });
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h4 className={styles.topText}>
        Zero Gas Fees + Zero Profit Fees = Hero Outcomes{" "}
      </h4>
      <h1 className={styles.midText}>Flip to Up your Stack</h1>
      <h2>Prize pools and available flip assets are growing. </h2>
      <h2>Come back soon to flip again. </h2>

      {address ? (
        <div>
          {chain && chain.id !== CHAIN.id ? (
            <div>
              <p>Please select ChainID: 2046399126</p>
              <button
                onClick={(event) => handleToEuropa(event, 2046399126)}
                className={styles_button.toggleButton}
              >
                Switch Network
              </button>
            </div>
          ) : (
            <div className={styles.gridSix}>
              <div className="p-4">
                <div className="space-y-2">
                  {inputs.map((value, index) => (
                    <div key={index} className="mb-4">
                      <input
                        type="text"
                        value={inputs[index]}
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
                        className={styles.textInputSmall}
                        placeholder={`Amount`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4">
                <div className="space-y-2">
                  {allowancesTest.current &&
                  BigInt(allowancesTest.current) >= parseEther(inputs[0]) ? (
                    <div>
                      <button
                        className={styles_button.toggleButton}
                        onClick={() => handleButtonClick(0)}
                      >
                        {buttonLogicTexts[0]}
                      </button>
                    </div>
                  ) : (
                    <div>
                      {" "}
                      <button
                        className={styles_button.toggleButton}
                        onClick={() => handleButtonClick(1)}
                      >
                        Approve
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4">
                <div className="space-y-2">
                  {address && win ? (
                    <button className={styles.buttonDisplay}>
                      Wins: {win?.toString()}
                    </button>
                  ) : (
                    <button className={styles.buttonDisplay}>Wins:</button>
                  )}
                </div>
              </div>

              <div className="p-4">
                <div className="space-y-2">
                  {address && loss ? (
                    <button className={styles.buttonDisplay}>
                      Losses: {loss?.toString()}
                    </button>
                  ) : (
                    <button className={styles.buttonDisplay}>Losses:</button>
                  )}
                </div>
              </div>

              <div className="p-4">
                <div className="space-y-2">
                  {address && typeof bal === "bigint" ? (
                    <button className={styles.buttonDisplay}>
                      You've Won: {formatUnits(bal, 18)}
                    </button>
                  ) : (
                    <div> No rewards</div>
                  )}
                </div>
              </div>

              <div className="p-4">
                <div className="space-y-2">
                  <button
                    className={styles_button.toggleButton}
                    onClick={() => handleButtonClickWithdraw(0)}
                  >
                    <p>Withdraw</p>
                    <p>{buttonDescriptions[0]}</p>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div> </div>
      )}
    </main>
  );
};
export default Home;

// tsx-control-statements/components'
