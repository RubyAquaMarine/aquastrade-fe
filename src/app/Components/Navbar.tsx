"use client";
import Link from "next/link";
import React, { useState } from "react";
import styles from "../Styles/Header.module.css"; // You can create a CSS module for styling
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
                <Link href="/dashboard">Dashboard</Link>
              </li>
            </ul>
          </div>

          <div className={styles.dropdownmenuBlue}>
            {" "}
            <Dropdown
              buttonVariant="tertiary"
              buttonClassName={styles.dropdownmenuBlue}
              title="?"
            >
              <Dropdown.Item className={styles.popup_item_top}>
                <Link href="/" className={styles.popup_item_link}>
                  Home &emsp; &emsp; &emsp; &emsp; &emsp;{" "}
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
                <Link
                  href="/dashboard/coinflip"
                  className={styles.popup_item_link}
                >
                  Coinflip &emsp; &ensp; &nbsp;{" "}
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
                  Games &emsp; &emsp; &emsp; &ensp;{" "}
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
                <Link href="/perp" className={styles.popup_item_link}>
                  Perps &emsp; &emsp; &emsp; &nbsp;{" "}
                </Link>
              </Dropdown.Item>

              <Dropdown.Item className={styles.popup_item}>
                <Link
                  href="/dashboard/airdrop"
                  className={styles.popup_item_link}
                >
                  Token Airdrop &ensp;{" "}
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
                      href="https://discord.gg/TPVpcUgt3k"
                      target="_blank"
                      className={styles.popup_item_sub_link}
                    >
                      Discord &nbsp;
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item className={styles.popup_item}>
                    <Link
                      href="https://github.com/rubyaquamarine"
                      target="_blank"
                      className={styles.popup_item_sub_link}
                    >
                      Github &nbsp;
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
