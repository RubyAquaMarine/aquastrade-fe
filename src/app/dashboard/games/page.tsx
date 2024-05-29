"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import styles from "@/app/Styles/Dashboard.module.css";
import styles_container from "@/app/Styles/Home.module.css";
import { useAccount, useSwitchChain } from "wagmi";
const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  const { chains, switchChain } = useSwitchChain();
  const { address, chain, isConnected, isConnecting } = useAccount();

  const [connectionStat, setConnectionStat] = useState(false);
  const [addr, setAddr] = useState("");

  // copy the value to state here
  useEffect(() => {
    setConnectionStat(isConnected);
    setAddr(address as string);
  }, [address, isConnected]);

  /* todo
if the user doesn't have the network within the MM already, then switching doesn't prompt 
  */
  const handleLinkClickRubySwap = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    targetChainId: number,
  ) => {
    if (chain?.id != targetChainId) {
      // only prevent if user not connected to correct chain
      event.preventDefault(); // Prevent the link from forwarding

      // @ts-ignore: Unreachable code error
      switchChain?.({ chainId: targetChainId });
    }
  };

  return (
    <main className={styles_container.container}>
      <h1 className={styles.midText}>Games on SKALE </h1>

      {!addr ? (
        <div>
          <div className={styles.p_styled}>
            <ul>
              <li>
                <Link href="/">
                  {" "}
                  <b>Back </b> (Connect to SKALE: Europa Liquidity Hub to unlock
                  features)
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.p_styled}>
            <ul>
              <li className={styles.text_heading}>Europa Hub</li>
              <li className={styles.text_button}>
                {" "}
                <Link
                  href={`/dashboard/coinflip`}
                  onClick={(event) =>
                    handleLinkClickRubySwap(event, 2046399126)
                  }
                >
                  Coin Flip
                </Link>
              </li>

              <li className={styles.text_heading}>other SKALE chains</li>

              <li className={styles.text_button}>
                <Link
                  href="https://play.blockbrawlers.com/me"
                  target="_blank"
                  onClick={(event) => handleLinkClickRubySwap(event, 391845894)}
                >
                  Block Brawlers
                </Link>
              </li>

              <li className={styles.text_button}>
                <Link
                  href="https://app.cryptoblades.io/#/?chain=SKALE"
                  target="_blank"
                  onClick={(event) =>
                    handleLinkClickRubySwap(event, 1026062157)
                  }
                >
                  CryptoBlades
                </Link>
              </li>

              <li className={styles.text_button}>
                <Link
                  href="https://motodex.openbisea.com/?chain=skale"
                  target="_blank"
                  onClick={(event) =>
                    handleLinkClickRubySwap(event, 1482601649)
                  }
                >
                  MotoDex
                </Link>
              </li>

              <li className={styles.text_button}>
                <Link
                  href="https://play.mystrios.com/Game"
                  target="_blank"
                  onClick={(event) =>
                    handleLinkClickRubySwap(event, 1482601649)
                  }
                >
                  Mystrios
                </Link>
              </li>

              <li className={styles.text_button}>
                <Link
                  href="https://platformer.dirtroad.dev/"
                  target="_blank"
                  onClick={(event) =>
                    handleLinkClickRubySwap(event, 1482601649)
                  }
                >
                  Platformer
                </Link>
              </li>

              <li className={styles.text_button}>
                <Link
                  href="https://www.voxelverse.ca/"
                  target="_blank"
                  onClick={(event) =>
                    handleLinkClickRubySwap(event, 1482601649)
                  }
                >
                  Prospectors NFT
                </Link>
              </li>

              <li className={styles.text_button}>
                <Link
                  href="https://tankwars.zone/"
                  target="_blank"
                  onClick={(event) =>
                    handleLinkClickRubySwap(event, 1482601649)
                  }
                >
                  TankWars
                </Link>
              </li>

              <li className={styles.text_button}>
                <Link
                  href="https://untitledplatformer.io/play/"
                  target="_blank"
                  onClick={(event) => handleLinkClickRubySwap(event, 644937893)}
                >
                  Untitled - 32-bit
                </Link>
              </li>

              <li className={styles.text_heading}>Coming Soon</li>

              <li className={styles.text_button}>
                <Link
                  href="https://www.flightforce4.com/"
                  target="_blank"
                  onClick={(event) => handleLinkClickRubySwap(event, 1)}
                >
                  Flight Force 4
                </Link>
              </li>

              <li className={styles.text_button}>
                <Link
                  href="https://loe-staging-game.primebitgames.com/"
                  target="_blank"
                  onClick={(event) => handleLinkClickRubySwap(event, 80001)}
                >
                  Legends of Elysium
                </Link>
              </li>

              <li className={styles.text_button}>
                <Link
                  href="https://www.flightforce4.com/"
                  target="_blank"
                  onClick={(event) => handleLinkClickRubySwap(event, 644937893)}
                >
                  0xBattlegrounds
                </Link>
              </li>
            </ul>
          </div>
          <span className={styles.text_center}>
            Select a game to switch SKALE chains, then click again to play{" "}
          </span>
          <p>
            <span className={styles.text_center}> Connected to:</span>{" "}
          </p>
          <span className={styles.text_style_border}>{chain?.name} </span>
        </div>
      )}
    </main>
  );
};
export default Home;
