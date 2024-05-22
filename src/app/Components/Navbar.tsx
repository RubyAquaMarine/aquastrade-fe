"use client";
import Link from "next/link";
import React from "react";
import styles from "../Styles/Header.module.css"; // You can create a CSS module for styling
import Image from "next/image";
import Dropdown from "react-multilevel-dropdown";

// THeme Dark Mode Switching works : but theming needs work
import { ThemeToggle } from "@/app/Components/ui/ThemeToggle";
//     <ThemeToggle></ThemeToggle>

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/app/Components/ui/NavigationMenu";
import ListItem from "@mui/material/ListItem";

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
            {" "}
            <NavigationMenu className={styles.nav_menu}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Bridge</NavigationMenuTrigger>
                  <span className={styles.nav_menu_br}>
                    <NavigationMenuContent className={styles.nav_menu_bg}>
                      <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              href="/dashboard/metaport"
                            >
                              <div className={styles.image_invert_center}>
                                {" "}
                                <Image
                                  src="/SKL.svg"
                                  alt="AquasTrade Menu"
                                  width={30}
                                  height={30}
                                />
                              </div>

                              <div className="mb-2 mt-4 text-lg font-medium">
                                Metaport
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                Onboard assets from Ethereum and bridge between
                                Skale chains with 0 gas fees
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          {" "}
                          <span className="mb-2 mt-4 text-lg font-medium">
                            <Link
                              href="https://www.npmjs.com/package/@skalenetwork/metaport"
                              target="_blank"
                            >
                              Open-Source
                            </Link>
                          </span>
                          <p className="text-sm leading-tight text-muted-foreground">
                            {" "}
                            We host metaport with all the latest features!{" "}
                          </p>
                        </li>
                        <li>
                          {" "}
                          <span className="mb-2 mt-4 text-lg font-medium">
                            <Link
                              href="https://etherscan.io/address/0x8fB1A35bB6fB9c47Fb5065BE5062cB8dC1687669"
                              target="_blank"
                            >
                              Any L1 Asset
                            </Link>
                          </span>
                          <p className="text-sm leading-tight text-muted-foreground">
                            {" "}
                            ETH, USDT, USDC, USDP, DAI, BTC, SKL and more{" "}
                          </p>
                        </li>
                        <li>
                          {" "}
                          <span className="mb-2 mt-4 text-lg font-medium">
                            <Link href="https://meson.fi" target="_blank">
                              Meson.fi
                            </Link>
                          </span>
                          <p className="text-sm leading-tight text-muted-foreground">
                            <Link href="https://meson.fi" target="_blank">
                              Looking to bridge $USD from other L2's via 3rd
                              party bridge?
                            </Link>
                          </p>
                          <p>
                            {" "}
                            <Link
                              href="https://docs.meson.fi/references/audit-reports"
                              target="_blank"
                            >
                              {"-- audits"}
                            </Link>
                          </p>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </span>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>IDO</NavigationMenuTrigger>
                  <span className={styles.nav_menu_br}>
                    <NavigationMenuContent className={styles.nav_menu_dd}>
                      <Link href="/dashboard/presale" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          Presale Tokens
                        </NavigationMenuLink>
                      </Link>

                      <Link href="/dashboard/create" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          Create Tokens
                        </NavigationMenuLink>
                      </Link>

                      <Link href="/dashboard/airdrop" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          Airdrop Tokens
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuContent>
                  </span>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Trade</NavigationMenuTrigger>

                  <span className={styles.nav_menu_br}>
                    {" "}
                    <NavigationMenuContent className={styles.nav_menu_dd}>
                      <Link href="/swap/amm" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          Swap Tokens
                        </NavigationMenuLink>
                      </Link>

                      <Link href="/perp/ethusdt" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          Perpetuals
                        </NavigationMenuLink>
                      </Link>

                      <Link href="/dashboard/overview" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          Overview
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuContent>{" "}
                  </span>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Games</NavigationMenuTrigger>

                  <span className={styles.nav_menu_br}>
                    {" "}
                    <NavigationMenuContent className={styles.nav_menu_dd}>
                      <Link href="/dashboard/coinflip" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          Coinflip
                        </NavigationMenuLink>
                      </Link>

                      <Link href="/dashboard/games" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          Directory
                        </NavigationMenuLink>
                      </Link>

                      <Link href="/dashboard/games" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          WhaleEatFish
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuContent>{" "}
                  </span>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/dashboard/nft" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      NFT
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>{" "}
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
                <Link
                  href={`/user/0x4f01C97785a62Cd0f4a33993B090DADe0F44e4F4`}
                  className={styles.popup_item_link}
                >
                  Search Wallets &emsp; &emsp;{" "}
                </Link>
              </Dropdown.Item>

              <Dropdown.Item className={styles.popup_item}>
                <Link
                  href={`/dashboard/support/`}
                  className={styles.popup_item_link}
                >
                  Support &emsp; &ensp; &ensp; &ensp;
                </Link>
              </Dropdown.Item>
              <Dropdown.Item className={styles.popup_item}>
                <Link
                  href={`https://github.com/RubyAquaMarine/aquastrade-fe/issues`}
                  target="_blank"
                  className={styles.popup_item_link}
                >
                  Report Bug &nbsp; &nbsp;
                </Link>
              </Dropdown.Item>
              <Dropdown.Item className={styles.popup_item_bottom}>
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
                      href="https://github.com/aquastrade"
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
                  <Dropdown.Item className={styles.popup_item}>
                    <Link
                      href="https://x.com/Aquastrade"
                      target="_blank"
                      className={styles.popup_item_sub_link}
                    >
                      Twitter &nbsp;
                    </Link>
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

/*

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
                <Link href="/dashboard/nft" className={styles.popup_item_link}>
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
                      href="https://github.com/aquastrade"
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
                      href="https://x.com/Aquastrade"
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

*/
