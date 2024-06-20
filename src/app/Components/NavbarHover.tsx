"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import styles_header from "../Styles/Telegram.module.css"; // You can create a CSS module for styling
import styles from "../Styles/NavHover.module.css"; // You can create a CSS module for styling
import Image from "next/image";
import Dropdown from "react-multilevel-dropdown";

import AQUA from "../../../public/AQUA.png";
import SKL from "../../../public/SKL.svg";
import MENU from "../../../public/menu1.svg";

// THeme Dark Mode Switching works : but theming needs work
//import { ThemeToggle } from "@/app/Components/ui/ThemeToggle";
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

const Navbar = () => {
  const path = usePathname();

  const isPageActive = (pathUrl: string) => {
    return path === pathUrl ? styles.active_link : styles.not_active_link;
  };

  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.nav}>
          <li>
            <span>
              {" "}
              <Link href="/">
                <Image
                  className={styles.logo_aqua}
                  src={AQUA}
                  alt="AquasTrade Logo"
                  width={50}
                  height={50}
                  priority
                  placeholder="blur"
                />
              </Link>
            </span>
          </li>

          <li>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem
                  className={isPageActive("/dashboard/metaport")}
                >
                  <NavigationMenuTrigger>
                    {" "}
                    <Link href="/dashboard/metaport">Bridge</Link>
                  </NavigationMenuTrigger>
                  <span className={styles.nav_menu_br}>
                    <NavigationMenuContent className={styles.nav_menu_bg}>
                      <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              href="/dashboard/metaport"
                            >
                              <div className={styles.metaport}>Metaport</div>
                              <div className={styles.image_invert_center}>
                                {" "}
                                <Image
                                  className={styles.icon_skl}
                                  src={SKL}
                                  alt="AquasTrade Menu"
                                  width={30}
                                  height={30}
                                />
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
                            <Link
                              href="https://meson.fi/skale-europa"
                              target="_blank"
                            >
                              Meson.fi
                            </Link>
                          </span>
                          <p className="text-sm leading-tight text-muted-foreground">
                            <Link
                              href="https://meson.fi/skale-europa"
                              target="_blank"
                            >
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

                <NavigationMenuItem
                  className={isPageActive("/dashboard/presale")}
                >
                  <NavigationMenuTrigger>
                    {" "}
                    <Link href="/dashboard/presale">IDO</Link>
                  </NavigationMenuTrigger>
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

                <NavigationMenuItem className={isPageActive("/swap/amm")}>
                  <NavigationMenuTrigger>
                    {" "}
                    <Link href="/swap/amm">Trade</Link>
                  </NavigationMenuTrigger>

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

                <NavigationMenuItem className={isPageActive("/dashboard/nft")}>
                  <Link href="/dashboard/nft" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      <b>NFT</b>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>{" "}
          </li>

          <li>
            {" "}
            <Dropdown
              buttonVariant="tertiary"
              buttonClassName={styles.dropdown_menu}
              title={
                <Image
                  src={MENU}
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
                      href="https://dappradar.com/dapp/aquas-trade"
                      target="_blank"
                      className={styles.popup_item_sub_link}
                    >
                      DappRadar
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
                      href={`https://github.com/RubyAquaMarine/aquastrade-fe/issues`}
                      target="_blank"
                      className={styles.popup_item_sub_link}
                    >
                      Report Bug &nbsp; &nbsp;
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
                      X.com &nbsp;
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Submenu>
              </Dropdown.Item>
            </Dropdown>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
/*
 <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    {" "}
                    <Link href="/dashboard/games">Games</Link>
                  </NavigationMenuTrigger>

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
*/
