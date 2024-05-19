"use client";

import Link from "next/link";
import { useAccount, useSwitchChain } from "wagmi";
import styles from "@/app/Styles/NFT.module.css";
import { MARKETPLACE_AQUADEX, CHAIN } from "@/app/Utils/config";

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

const Home = () => {
  const { address, isConnected, chain } = useAccount();
  const { chains, switchChain } = useSwitchChain();
  const array = [];

  if (address && isConnected) {
    array.push(address);
    array.push(MARKETPLACE_AQUADEX);
  }

  const handleToEuropa = (
    // event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    targetChainId: number,
  ) => {
    if (chain) {
      if (chain.id !== targetChainId) {
        event.preventDefault(); // Prevent the link from forwarding
        // @ts-ignore: Unreachable code error
        switchChain({ chainId: targetChainId }); // todo
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <span> </span>
        <span> NFT MarketPlace Coming Soon</span>
        <span className={styles.text_style_bottom}>
          {" "}
          <Link href="/dashboard/metaport"> Top-up</Link>{" "}
        </span>
        <span> L1 Gas gwei: </span>{" "}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Trade</NavigationMenuTrigger>

              <NavigationMenuContent>
                <Link href="/swap/amm" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Swap Tokens
                  </NavigationMenuLink>
                </Link>

                <Link href="/perp/ethusdt" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Perpetuals
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Buy NFT
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>{" "}
      </div>
    </main>
  );
};
export default Home;
