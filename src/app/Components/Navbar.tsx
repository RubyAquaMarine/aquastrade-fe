"use client";
import Link from "next/link";
import React, { useState } from "react";
import styles from "../Styles/Header.module.css"; // You can create a CSS module for styling
import DarkModeToggle from "./DarkModeToggleV2";
import Image from "next/image";

import Dropdown from "react-multilevel-dropdown";
import { TRUE } from "sass";

// client components
const Navbar = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  ///Users/imac/ruby/RubyAquaMarine/aqua-dex-fe/public/aquastrade.png
  //AQUA3.png
  return (
    <header className={styles.header}>
      <nav>
        <div className={styles.align_test}>
          <div className={styles.float_left}>
            <ul className={styles.navListTight}>
              <li>
                <Link href="/">
                  <Image
                    src="/AQUA1.png"
                    alt="AquasTrade Logo"
                    width={40}
                    height={40}
                  />
                </Link>
              </li>

              <li className={styles.navItemLogo}>
                <Link href="/">AquasTrade</Link>
              </li>
            </ul>
          </div>

          <div className={styles.float_center}>
            <ul className={styles.navListWide}>
              <li className={styles.navItem}>
                <Link href="/dashboard/metaport">Bridge</Link>
              </li>

              <li className={styles.navItem}>
                <Link href="/dashboard">Dashboard</Link>
              </li>

              <li className={styles.navItem}>
                <Link href="/nft">NFT</Link>
              </li>

              <li className={styles.navItem}>
                <Link href="/perp">Trade</Link>
              </li>
            </ul>
          </div>

          <div className={styles.versionMenu}>
            <Dropdown openOnHover={true} buttonVariant="tertiary">
              <Dropdown.Item>
                <Link href="https://aquastrade-dex.vercel.app/" target="_blank">
                  <Image
                    src="/AQUA1.png"
                    alt="AquasTrade Logo"
                    width={28}
                    height={28}
                  />{" "}
                  v0.1
                </Link>
              </Dropdown.Item>

              <Dropdown.Item>
                <Link
                  href="https://aquastrade-ecosystem.vercel.app/"
                  target="_blank"
                >
                  <Image
                    src="/AQUA1.png"
                    alt="AquasTrade Logo"
                    width={28}
                    height={28}
                  />{" "}
                  v0.2
                </Link>
              </Dropdown.Item>

              <Dropdown.Item>
                <Link
                  href="https://aquastrade-ecosystem.vercel.app/"
                  target="_blank"
                >
                  <Image
                    src="/AQUA1.png"
                    alt="AquasTrade Logo"
                    width={28}
                    height={28}
                  />{" "}
                  0.3
                </Link>

                <Dropdown.Submenu>
                  <Dropdown.Item>
                    AMM
                    <Dropdown.Submenu>
                      <Dropdown.Item>Swap</Dropdown.Item>

                      <Dropdown.Item>Liquidity</Dropdown.Item>

                      <Dropdown.Item>Create Pool</Dropdown.Item>
                    </Dropdown.Submenu>
                  </Dropdown.Item>

                  <Dropdown.Item>
                    <Link href="/dashboard/metaport">Bridge</Link>
                  </Dropdown.Item>

                  <Dropdown.Item>
                    <Link href="/dashboard/coinflip">Coin Flip</Link>
                  </Dropdown.Item>

                  <Dropdown.Item>
                    <Link href="/dashboard/marketplace">MarketPlace</Link>
                  </Dropdown.Item>

                  <Dropdown.Item>
                    <Link href="/perp">Perps</Link>
                  </Dropdown.Item>

                  <Dropdown.Item>
                    <Link href={`/user/`}>Token List</Link>
                  </Dropdown.Item>

                 
                </Dropdown.Submenu>
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
