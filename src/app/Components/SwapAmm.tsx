"use client";
import { useAccount } from "wagmi";
import React, { useState, useEffect } from "react";
import { formatUnits } from "viem";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import Popup from "@/app/Components/PopUp"
import { useERC20Token } from "@/app/Hooks/useAMM";
import { tokenSymbols, tokenAddresses } from "@/app/Utils/config"
import styles from "@/app/Styles/AMM.module.css";
import styles_pop from "@/app/Styles/Popup.module.css";


const SwapAmm = () => {
    const { address, isConnected, chain } = useAccount();
    const path = usePathname();
    const dappType = path;

    // default swapping pair
    const [tokenA, setTokenA] = useState('ETH');
    const [tokenB, setTokenB] = useState('AQUA');

    const [showTokenListA, setShowTokenListA] = useState(false);
    const [showTokenListB, setShowTokenListB] = useState(false);


    const [tokenAAddress, setTokenAAddress] = useState('0xD2Aaa00700000000000000000000000000000000' as `0x${string}`);
    const [tokenBAddress, setTokenBAddress] = useState('0xE34A1fEF365876D4D0b55D281618768583ba4867' as `0x${string}`);

    const { data: tokenA_balance } = useERC20Token(tokenAAddress, "balanceOf", [address]);
    const { data: tokenB_balance } = useERC20Token(tokenBAddress, "balanceOf", [address]);



    const [amountA, setAmountA] = useState('');
    const [amountB, setAmountB] = useState('');

    useEffect(() => {
        if (address) {
            // with 
            if (tokenA && tokenB) {
                console.log("set token A + B addresses ");
                // new 
                findAddressFromSymbol(true, tokenA);
                findAddressFromSymbol(false, tokenB);

            }
           
        }
    }, [address, tokenA, tokenB]);

    const findAddressFromSymbol = (_a: boolean, _symbol: string) => {
        console.log("findTokenAddressFromSymbol", _symbol);
        if (tokenAddresses) {
            tokenAddresses.forEach((element) => {
                if (_symbol === element.symbol) {
                    console.log(`found ${_symbol} at address: `, element.addr)

                    if (_a === true) {
                        setTokenAAddress(element.addr);


                    }
                    if (_a === false) {
                        setTokenBAddress(element.addr);

                    }

                }
            });
        }

    };

    // Function to handle token selection from the list
    const handleTokenSelectionA = (token: string) => {

        console.log("User Asset Selected Token A", token);
        setTokenA(token);
        setShowTokenListA(false);
    };

    const handleTokenSelectionB = (token: string) => {

        console.log("User Asset Selected Token B", token);
        setTokenB(token);
        setShowTokenListB(false);
    };


    // Function to handle token swapping
    const handleSwap = () => {
        // Implement swapping logic here
    };

    // Function to handle liquidity provision
    const handleProvideLiquidity = () => {
        // Implement liquidity provision logic here
    };

    const handleFlipTokens = () => {
        const tempTokenA = tokenA;
        setTokenA(tokenB);
        setTokenB(tempTokenA);
        const tempAmountA = amountA;
        setAmountA(amountB);
        setAmountB(tempAmountA);

        // get new token balances 
        console.log("Token Balances ", tokenA_balance, tokenB_balance)
    };

    return (
        <main>
            <div className={styles.container}>

                <div>
                    <button className={styles.nav}>Swap</button>
                    <button className={styles.nav}>Add</button>
                    <button className={styles.nav}>List</button>
                    <button className={styles.nav_right}><Image
                        src="/gear.svg"
                        alt="menu"
                        width={22}
                        height={22}
                        priority
                        className={styles.imageInvert}
                        onClick={handleFlipTokens}
                    /></button>
                </div>


                <div className={styles.input_container}>


                    <p>You pay</p>
                    <div className={styles.amount_inputs}>

                        <input
                            className={styles.input_amount}
                            type="text"
                            placeholder="0.0"
                            value={amountA}
                            onChange={(e) => setAmountA(e.target.value)}
                        />


                        <input
                            className={styles.input_token}
                            type="text"
                            placeholder="Select Token"
                            value={tokenA}
                            onChange={(e) => setTokenA(e.target.value)}
                            onClick={() => setShowTokenListA(true)}
                        />

                        {showTokenListA && (
                            <div className={styles_pop.popup_container}>
                                <div className={styles_pop.popup_content}>

                                    {tokenSymbols.map((token, index) => (
                                        <div key={index} onClick={() => handleTokenSelectionA(token)}>{token}</div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                    <p className={styles.amount_balance}>Balance  {!tokenA_balance ? ("0.0") : (typeof tokenA_balance === 'bigint' && formatUnits(tokenA_balance, 18))}     </p>
                </div>


                {!showTokenListA && !showTokenListB ? (<div id="1" className={styles.button_container}> <Image
                    src="/flip.svg"
                    alt="menu"
                    width={18}
                    height={18}
                    priority
                    className={styles.imageInvert}
                    onClick={handleFlipTokens}
                /></div>) : (<div></div>)}



                <div className={styles.input_container}>

                    <p>You receive</p>
                    <div className={styles.amount_inputs}>

                        <input
                            className={styles.input_amount}
                            type="text"
                            placeholder="0.0"
                            value={amountB}
                            onChange={(e) => setAmountB(e.target.value)}
                        />

                        <input
                            className={styles.input_token}
                            type="text"
                            placeholder="Select Token"
                            value={tokenB}
                            onChange={(e) => setTokenB(e.target.value)}
                            onClick={() => setShowTokenListB(true)}
                        />
                        {showTokenListB && (

                            <div className={styles_pop.popup_container}>
                                <div className={styles_pop.popup_content}>

                                    {tokenSymbols.map((token, index) => (
                                        <div key={index} onClick={() => handleTokenSelectionB(token)}>{token}</div>
                                    ))}


                                    <div className='selected-tokens'>
                                        {tokenSymbols.filter(({ selected }) => selected).map(({ id, iconUrl }) => <img key={id} src={iconUrl}></img>)}
                                    </div>

                                </div>
                            </div>



                        )}


                    </div>
                    <p className={styles.amount_balance}>Balance  {!tokenB_balance ? ("0.0") : (typeof tokenB_balance === 'bigint' &&  formatUnits(tokenB_balance, 18))}     </p>
                </div>

                <div className={styles.button_container}>
                    <button className={styles.button_field} onClick={handleSwap}>Swap</button>
                </div>



            </div>
        </main >
    );



};

export default SwapAmm;