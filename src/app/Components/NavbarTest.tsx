"use client";
import Link from "next/link";
import React from "react";
import styles from "../Styles/Header.module.css"; // You can create a CSS module for styling
import Image from "next/image";
import Dropdown from "react-multilevel-dropdown";

// THeme Dark Mode Switching works : but theming needs work
import { ThemeToggle } from "@/app/Components/ui/ThemeToggle";
//     <ThemeToggle></ThemeToggle>

import { NavigationMenuDemo } from "@/app/Components/NavBarDemo";

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
                    src="/AQUA.png"
                    alt="AquasTrade Logo"
                    width={44}
                    height={44}
                    priority
                  />
                </Link>
              </li>

              <li className={styles.navItemLogo}>
                <Link href="/">AquasTrade</Link>
              </li>
            </ul>
          </div>

          <div className={styles.float_center}>
            <NavigationMenuDemo></NavigationMenuDemo>
          </div>

          <div className={styles.dropdownmenuBlue}>
            {" "}
            <Dropdown
              buttonVariant="tertiary"
              buttonClassName={styles.dropdownmenuBlue}
              title={
                <Image
                  src="/menu1.svg"
                  alt="AquasTrade Menu"
                  width={30}
                  height={30}
                  className={styles.image_invert}
                />
              }
            >
              <Dropdown.Item className={styles.popup_item_top}>
                <Link href="/" className={styles.popup_item_link}>
                  Connect Wallet&emsp;&nbsp;
                </Link>
              </Dropdown.Item>

              <Dropdown.Item className={styles.popup_item}>
                <Link href="/swap/amm" className={styles.popup_item_link}>
                  AMM &emsp; &emsp; &emsp; &emsp; &nbsp;{" "}
                </Link>
              </Dropdown.Item>

              <Dropdown.Item className={styles.popup_item}>
                <Link
                  href="/dashboard/metaport"
                  className={styles.popup_item_link}
                >
                  Bridge &emsp; &emsp; &emsp; &ensp;{" "}
                </Link>
              </Dropdown.Item>

              <Dropdown.Item className={styles.popup_item}>
                <Link href="/dashboard" className={styles.popup_item_link}>
                  Dashboard &emsp; &emsp; &emsp;{" "}
                </Link>
              </Dropdown.Item>

              <Dropdown.Item className={styles.popup_item}>
                <Link
                  href="/dashboard/games"
                  className={styles.popup_item_link}
                >
                  Games &emsp; &emsp; &emsp; &ensp;&nbsp;{" "}
                </Link>
              </Dropdown.Item>

              <Dropdown.Item className={styles.popup_item}>
                <Link
                  href="/dashboard/marketplace"
                  className={styles.popup_item_link}
                >
                  NFT Market Place
                </Link>
              </Dropdown.Item>

              <Dropdown.Item className={styles.popup_item}>
                <Link href="/nft" className={styles.popup_item_link}>
                  NFTs &emsp; &emsp; &emsp; &emsp; &emsp;
                </Link>
              </Dropdown.Item>

              <Dropdown.Item className={styles.popup_item}>
                <Link href="/perp" className={styles.popup_item_link}>
                  Perps &emsp; &emsp; &emsp; &ensp;&nbsp;{" "}
                </Link>
              </Dropdown.Item>

              <Dropdown.Item className={styles.popup_item}>
                <Link
                  href="/dashboard/airdrop"
                  className={styles.popup_item_link}
                >
                  Token Airdrop &ensp;
                </Link>
              </Dropdown.Item>

              <Dropdown.Item className={styles.popup_item}>
                <Link
                  href={`/dashboard/create`}
                  className={styles.popup_item_link}
                >
                  Token Create &emsp; &emsp;{" "}
                </Link>
              </Dropdown.Item>

              <Dropdown.Item className={styles.popup_item}>
                <Link
                  href={`/dashboard/presale`}
                  className={styles.popup_item_link}
                >
                  Token IDO &emsp; &emsp;{" "}
                </Link>
              </Dropdown.Item>

              <Dropdown.Item className={styles.popup_item}>
                <Link href={`/user/`} className={styles.popup_item_link}>
                  Token List &emsp; &emsp;{" "}
                </Link>
              </Dropdown.Item>

              <Dropdown.Item className={styles.popup_item}>
                {"<"}- Socials
                <Dropdown.Submenu className={styles.popup_submenu}>
                  <Dropdown.Item className={styles.popup_item}>
                    <Link
                      href="https://chainlist.org/?search=skale+europa"
                      target="_blank"
                      className={styles.popup_item_sub_link}
                    >
                      Chain RPC
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item className={styles.popup_item}>
                    <Link
                      href="https://defillama.com/protocol/aquas-trade#information"
                      target="_blank"
                      className={styles.popup_item_sub_link}
                    >
                      Defi Llama
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item className={styles.popup_item}>
                    <Link
                      href="https://github.com/rubyaquamarine"
                      target="_blank"
                      className={styles.popup_item_sub_link}
                    >
                      Github &nbsp;&nbsp;
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item className={styles.popup_item}>
                    <Link
                      href="https://t.me/AquasTrade"
                      target="_blank"
                      className={styles.popup_item_sub_link}
                    >
                      Telegram &nbsp;
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item className={styles.popup_item_bottom}>
                    <Link
                      href="https://twitter.com/Aquastrade"
                      target="_blank"
                      className={styles.popup_item_sub_link}
                    >
                      Twitter &nbsp;
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Submenu>
              </Dropdown.Item>
              <Dropdown.Item className={styles.popup_item}>
                <Link
                  href={`/dashboard/support/`}
                  className={styles.popup_item_link}
                >
                  Support &emsp; &ensp; &ensp; &ensp;
                </Link>
              </Dropdown.Item>
              <Dropdown.Item className={styles.popup_item_bottom}>
                <Link
                  href={`https://github.com/RubyAquaMarine/aquastrade-fe/issues`}
                  target="_blank"
                  className={styles.popup_item_link}
                >
                  Report Bug &nbsp; &nbsp;
                </Link>
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

/*

  <li className={styles.navItem}>
              <ThemeToggle></ThemeToggle>
              </li>

*/
