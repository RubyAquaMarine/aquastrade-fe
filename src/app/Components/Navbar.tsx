"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import styles from "../Styles/Nav.module.css"; // You can create a CSS module for styling
import Image from "next/image";

import AQUA from "../../../public/AQUA.png";
import SKL from "../../../public/SKL.svg";

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
                              className="flex h-full w-full select-none flex-col justify-end  p-6 focus:shadow-md"
                              href="/dashboard/metaport"
                            >
                              {/** rounded-md bg-gradient-to-b from-muted/50 to-muted no-underline outline-none */}
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
                            ETH, USDT, USDC, USDP, DAI, WBTC, SKL and more{" "}
                          </p>
                        </li>
                        <li>
                          {" "}
                          <span className="mb-2 mt-4 text-sm">
                            <Link
                              href="https://t.me/AquasTrade"
                              target="_blank"
                            >
                              <span className="flex_row">
                                <span> Need help bridging? </span>
                                <span>
                                  {" "}
                                  <Image
                                    className={styles.image_color}
                                    src="/outbound.svg"
                                    alt="menu"
                                    width={14}
                                    height={14}
                                    priority
                                  />{" "}
                                </span>
                              </span>
                            </Link>
                          </span>
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
                    <NavigationMenuContent className={styles.nav_menu_bg}>
                      <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end  p-6 focus:shadow-md"
                              href="/dashboard/presale"
                            >
                              {/** rounded-md bg-gradient-to-b from-muted/50 to-muted no-underline outline-none */}
                              <div className={styles.metaport}>Join IDO</div>
                              <div className={styles.image_invert_center}></div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                A revolutionary token launch platform, bringing
                                the value back into the hands of the early
                                communities.
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <span className="mb-2 mt-4 text-lg font-medium">
                            <Link
                              href="https://forms.monday.com/forms/5784bdcbbde2aafb4c556666ef98777a?r=apse2"
                              target="_blank"
                            >
                              Create IDO
                            </Link>
                          </span>
                          <p className="text-sm leading-tight text-muted-foreground">
                            <Link
                              href="https://forms.monday.com/forms/5784bdcbbde2aafb4c556666ef98777a?r=apse2"
                              target="_blank"
                            >
                              List your token to raise $USD for your project.
                            </Link>
                          </p>
                        </li>
                        <li>
                          {" "}
                          <span className="mb-2 mt-4 text-lg font-medium">
                            <Link href="/dashboard/create">Create Token</Link>
                          </span>
                          <p className="text-sm leading-tight text-muted-foreground">
                            <Link href="/dashboard/create">
                              Create your token and launch with instant
                              liquidity. NFT grants access to liquidity tiers.
                              <ul className="mb-2 mt-4 text-xsm">
                                <li> Bronze NFT: 5000 AQUA</li>
                                <li> Silver NFT: 50000 AQUA</li>
                                <li> Gold NFT: 150000 AQUA</li>
                              </ul>
                            </Link>
                          </p>
                        </li>
                        <li>
                          {" "}
                          <span className="mb-2 mt-4 text-lg font-medium">
                            <Link href="/dashboard/airdrop">
                              Airdrop Tokens
                            </Link>
                          </span>
                        </li>
                      </ul>
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

                      <Link href="/dashboard/tokeninfo" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          Token List
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

          <li> </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
