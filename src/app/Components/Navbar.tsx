"use client";
import Link from "next/link";
import React, { useState } from "react";
import styles from "../Styles/Header.module.css"; // You can create a CSS module for styling
import DarkModeToggle from "./DarkModeToggleV2";
import Image from "next/image";
import Dropdown from "react-multilevel-dropdown";

const Navbar = () => {
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
            </ul>
          </div>

          <div className={styles.versionMenu}>
            <Dropdown openOnHover={false} buttonVariant="tertiary">
              <Dropdown.Item className={styles.popup_item_top}>
                <Link href="/swap/amm">AMM</Link>
              </Dropdown.Item>

              <Dropdown.Item className={styles.popup_item}>
                <Link href="/dashboard/metaport">Bridge</Link>
              </Dropdown.Item>

              <Dropdown.Item className={styles.popup_item}>
                <Link href="/dashboard/coinflip">Coin Flip</Link>
              </Dropdown.Item>

              <Dropdown.Item className={styles.popup_item}>
                <Link href="/dashboard/marketplace">NFT Market Place</Link>
              </Dropdown.Item>

              <Dropdown.Item className={styles.popup_item}>
                <Link href="/perp">Perps</Link>
              </Dropdown.Item>

              <Dropdown.Item className={styles.popup_item}>
                <Link href={`/user/`}>Token List</Link>
              </Dropdown.Item>

              <Dropdown.Item className={styles.popup_item}>
                Socials!
                <Dropdown.Submenu className={styles.popup_submenu}>
                  <Dropdown.Item className={styles.popup_item}>
                    <Link
                      href="https://chainlist.org/?search=skale+europa"
                      target="_blank"
                    >
                      Chain RPC
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item className={styles.popup_item}>
                    <Link
                      href="https://defillama.com/protocol/aquas-trade#information"
                      target="_blank"
                    >
                      DefiLlama
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item className={styles.popup_item}>
                    <Link href="https://discord.gg/TPVpcUgt3k" target="_blank">
                      Discord
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item className={styles.popup_item}>
                    <Link
                      href="https://github.com/rubyaquamarine"
                      target="_blank"
                    >
                      Github
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item className={styles.popup_item_bottom}>
                    <Link href="https://twitter.com/Aquastrade" target="_blank">
                      Twitter
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Submenu>
              </Dropdown.Item>
              <Dropdown.Item className={styles.popup_item_bottom}>
                <Link href={`/support/`}>Support</Link>
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
