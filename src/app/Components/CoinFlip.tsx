// @ts-nocheck

"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { parseEther, formatUnits } from "viem";
import {
  useAccount,
  useSwitchChain,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TokenApprove from "@/app/Components/TokenApprove";
import TokenBalance from "@/app/Components/TokenBalance";
import { useCoinflip, useERC20Token } from "@/app/Hooks/useCoinflip";
import { CHAIN, tokenAddresses } from "@/app/Utils/config";
import { findTokenAddressFromSymbol } from "@/app/Utils/findTokens";
import { COIN_FLIP_ABI } from "@/app/Abi/europaCoinflip";
import styles from "@/app/Styles/Links.module.css";
import styles_button from "@/app/Styles/Toggle.module.css";

interface Props {
  address: string;
  symbol: string;
}

const CoinFlip = (params: Props) => {
  const allowancesTest = useRef(undefined);
  const [inputs, setInputs] = useState([""]);

  const [totalWins, setTotalWins] = useState("");
  const [totalLosses, setTotalLosses] = useState("");
  const [totalBalance, setTotalBalance] = useState("");

  const { address, isConnected, chain } = useAccount();
  const { chains, switchChain } = useSwitchChain();
  const { data: hash, writeContract } = useWriteContract();
  const { data: contractCallDataConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Use the Symbol to find the Token Address || or use PayToken (RPC)
  const token_address_erc20 = findTokenAddressFromSymbol(params?.props?.[1]);

  // todo Promiseall
  const {
    data: loss,
    isLoading,
    isError,
  } = useCoinflip(params?.props?.[0], "totalLoss", [address]);
  const { data: win } = useCoinflip(params?.props?.[0], "totalWins", [address]);
  const { data: bal } = useCoinflip(params?.props?.[0], "balances", [address]);

  const array: any[any] = [address, params?.props?.[0]];
  const { data: tokenAllowance } = useERC20Token(
    token_address_erc20,
    "allowance",
    array,
  ); // $AQUA

  const buttonDescriptions = [params?.props?.[1]];
  const buttonLogicTexts = [`flip ${params?.props?.[1]}`];

  useEffect(() => {
    if (token_address_erc20) {
      allowancesTest.current = tokenAllowance;
    }
  }, [tokenAllowance, token_address_erc20]);

  useEffect(() => {
    setTotalWins(win);
    setTotalLosses(loss);
    setTotalBalance(bal);
    console.log(" Update Win / Loss ", win, loss);
    console.log(" Update Balance", bal);
  }, [win, loss, bal]);

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
          address: params?.props?.[0],
          functionName: "flipCoin",
          args: [parseEther(inputs[0], "wei")],
        });
        break;
    }
  };

  const handleButtonClickWithdraw = (index: number) => {
    console.log(" this is the button for withdrawlAll Aqua ", index);
    switch (index) {
      case 0:
        writeContract({
          abi: COIN_FLIP_ABI,
          address: params?.props?.[0],
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
        // @ts-ignore: Unreachable code error
        switchChain({ chainId: targetChainId });
      }
    }
  };

  const CustomToastWithLink = (_url: string) => (
    <div>
      <Link href={_url} target="_blank">
        Coinflip Tx Hash on 🌊 AquasTrade
      </Link>
    </div>
  );
  // `${_message} on 🌊 AquasTrade! [tx] Hash: ${_link}`
  const notify = (_link: string) =>
    toast.info(CustomToastWithLink(_link), {
      position: "bottom-left",
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });

  useEffect(() => {
    if (contractCallDataConfirmed) {
      const isLink = `https://elated-tan-skat.explorer.mainnet.skalenodes.com/tx/${hash}`;
      notify(isLink);
    }
  }, [contractCallDataConfirmed]);

  return (
    <main>
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
                      <span> Approved: </span>
                      <TokenApprove
                        props={[
                          "allowance",
                          token_address_erc20,
                          parseEther(inputs[0]),
                          [address, params?.props?.[0]],
                          18,
                        ]}
                      ></TokenApprove>
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
                  {address && loss && !isLoading ? (
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
                  {address &&
                  typeof bal === "bigint" &&
                  bal <
                    BigInt(
                      "115792089237316195423570985008687907853269984665640564039057",
                    ) ? (
                    <p className={styles_button.toggleButton}>
                      You Won: {formatUnits(bal, 18)}
                    </p>
                  ) : (
                    <p className={styles_button.toggleButton}> No rewards</p>
                  )}
                </div>
                <br></br>

                <span>Prize Pool: </span>
                <TokenBalance
                  props={[token_address_erc20, 18, params?.props?.[0]]}
                ></TokenBalance>
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
      <span>
        <ToastContainer />
      </span>
    </main>
  );
};
export default CoinFlip;
