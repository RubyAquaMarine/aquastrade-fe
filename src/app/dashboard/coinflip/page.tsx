// @ts-nocheck

"use client";
import { useAccount, useSwitchChain, useWriteContract } from "wagmi";
import CoinFlip from "@/app/Components/CoinFlip";
import styles from "@/app/Styles/Links.module.css";
import { CHAIN, contractAddresses } from "@/app/Utils/config";
const Home = () => {
  const { address, isConnected, chain } = useAccount();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className={styles.midText}>Flip to Up your Stack</h1>

      {address ? (
        <div>
          {chain && chain.id !== CHAIN.id ? (
            <div>
              <p>Please select ChainID: 2046399126</p>
              <button
                onClick={(event) => handleToEuropa(event, 2046399126)}
                className={styles.toggleButton}
              >
                Switch Network
              </button>
            </div>
          ) : (
            <div>
              <span className={styles.midText_sm}>AQUA </span>
              {isConnected && (
                <CoinFlip
                  props={[contractAddresses[4].addr, "AQUA"]}
                ></CoinFlip>
              )}
            </div>
          )}
        </div>
      ) : (
        <div> </div>
      )}

      <h2 className={styles.topText}>
        Prize pools and available flip assets are growing. Come back soon to
        flip again.
      </h2>
    </main>
  );
};
export default Home;

// tsx-control-statements/components'
