// @ts-nocheck

"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { formatUnits, parseUnits } from "viem";
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
import { CHAIN } from "@/app/Utils/config";
import {
  findTokenAddressFromSymbol,
  findTokenFromSymbol,
} from "@/app/Utils/findTokens";
import { COIN_FLIP_ABI } from "@/app/Abi/europaCoinflip";
import styles from "@/app/Styles/Coinflip.module.css";

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
  // const token_address_erc20 = findTokenAddressFromSymbol(params?.props?.[1]);
  const token_address_erc20 = findTokenFromSymbol(params?.props?.[1]);

  // todo Promiseall
  const {
    data: loss,
    isLoading,
    isError,
  } = useCoinflip(params?.props?.[0], "totalLoss", [address]);
  const { data: win } = useCoinflip(params?.props?.[0], "totalWins", [address]);
  const { data: bal } = useCoinflip(params?.props?.[0], "balances", [address]);

  const array: any[any] = [address, params?.props?.[0]];

  const buttonDescriptions = [params?.props?.[1]];
  const buttonLogicTexts = [`flip ${params?.props?.[1]}`];

  useEffect(() => {
    if (win && loss && bal) {
      setTotalWins(win);
      setTotalLosses(loss);
      setTotalBalance(bal);
      console.log(" Update Win / Loss ", win, loss);
      console.log(" Update Balance", bal);
    }
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
          args: [parseUnits(inputs[0], "wei")],
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
  }, [contractCallDataConfirmed, hash]);

  return (
    <div>
      {address ? (
        <div>
          {chain && chain.id !== CHAIN.id ? (
            <div>
              <p>Please select ChainID: 2046399126</p>
              <button
                onClick={(event) => handleToEuropa(event, 2046399126)}
                className={styles.button_field}
              >
                Switch Network
              </button>
            </div>
          ) : (
            <div className={styles.gridSix}>
              <span>
                {" "}
                <span className={styles.text_center}>Prize Pool: </span>
                <span className={styles.text_center}>
                  {token_address_erc20 && (
                    <TokenBalance
                      props={[
                        token_address_erc20?.address,
                        token_address_erc20?.decimals,
                        params?.props?.[0],
                      ]}
                    ></TokenBalance>
                  )}
                </span>{" "}
              </span>

              <div className="p-4">
                <div className="space-y-2">
                  <span className={styles.text_center}>
                    {inputs.map((value, index) => (
                      <span key={index} className="mb-4">
                        <input
                          type="text"
                          value={inputs[index]}
                          onChange={(e) =>
                            handleInputChange(index, e.target.value)
                          }
                          className={styles.textInputSmall}
                          placeholder={`Enter Amount`}
                        />
                      </span>
                    ))}
                  </span>

                  <span className={styles.text_center}>
                    {" "}
                    <button
                      className={styles.button_field}
                      onClick={() => handleButtonClick(0)}
                    >
                      {buttonLogicTexts[0]}
                    </button>{" "}
                  </span>

                  <span className={styles.text_center_sm}> Approved: </span>

                  <span className={styles.text_center}>
                    {token_address_erc20 ? (
                      <span>
                        {" "}
                        <TokenApprove
                          props={[
                            "allowance",
                            token_address_erc20?.address,
                            parseUnits(
                              inputs[0],
                              token_address_erc20?.decimals,
                            ),
                            [address, params?.props?.[0]],
                          ]}
                        ></TokenApprove>
                      </span>
                    ) : (
                      <span> </span>
                    )}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="space-y-2">
                  <span className={styles.text_center}>
                    {address && win ? (
                      <span className={styles.buttonDisplay}>
                        Wins: {win?.toString()}
                      </span>
                    ) : (
                      <span className={styles.buttonDisplay}>Wins:</span>
                    )}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="space-y-2">
                  <span className={styles.text_center}>
                    {address && loss && !isLoading ? (
                      <span className={styles.buttonDisplay}>
                        Losses: {loss?.toString()}
                      </span>
                    ) : (
                      <span className={styles.buttonDisplay}>Losses:</span>
                    )}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="space-y-2">
                  <span className={styles.text_center}>
                    {address &&
                    typeof bal === "bigint" &&
                    bal <
                      BigInt(
                        "115792089237316195423570985008687907853269984665640564039057",
                      ) ? (
                      <span className={styles.buttonDisplay}>
                        You Won: {formatUnits(bal, 18)}
                      </span>
                    ) : (
                      <span className={styles.buttonDisplay}> No rewards</span>
                    )}
                  </span>
                </div>
                <br></br>
              </div>

              <div className="p-4">
                <div className="space-y-2">
                  <span className={styles.text_center}>
                    <button
                      className={styles.button_field}
                      onClick={() => handleButtonClickWithdraw(0)}
                    >
                      <span>Withdraw</span> <span>{buttonDescriptions[0]}</span>
                    </button>
                  </span>
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
    </div>
  );
};
export default CoinFlip;
