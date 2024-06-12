"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

import { LoginButton } from "@telegram-auth/react";

import MobileLayout from "@/app/Components/TelegramLayout";
import PrivateKeyInput from "@/app/Components/telegram/InputPrivateKey";
import SKL from "../../../public/SKL.svg";
import GH from "../../../public/GITHUB.svg";
import {
  TelegramCard,
  CardItemsProps,
  CardTitleProps,
} from "@/app/Components/TelegramCard";

import styles from "@/app/Styles/Telegram.module.css";

const TelegramMenu = ({ params }: any) => {
  const path = usePathname();

  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const [userID, setUserID] = useState<string>();

  useEffect(() => {
    if (path && id) {
      if (id) {
        setUserID(id as string);
      }
    }
  }, [path, id]);

  // CREATE THE CARDS DETAILS HERE
  // AMM DEX
  const projectData1: CardItemsProps = [
    {
      logo: "/SKL.svg",
      banner: "/SKL.svg",
      project_name: "Skale",
      project_desc: "L2 Scaling solution for Ethereum",
      symbol: "SKL",
    },

    {
      logo: "/AQUA.png",
      banner: "/AQUA.png",
      project_name: "Aquas.Trade",
      project_desc: "Community focused defi protocol on Skale",
      symbol: "AQUA",
    },

    {
      logo: "/WIFO.png",
      banner: "/WIFO.png",
      project_name: "Cat Wif Out Hair",
      project_desc: "Fastest growing meme coin on Skale",
      symbol: "WIFO",
    },
  ];

  // IDO : if the Symbol Exists then a buy button will appear
  // and allow the user to ape into the IDO
  const projectData2: CardItemsProps = [
    {
      logo: "/AQUA.png",
      banner: "/AQUA.png",
      project_name: "Aquas.Trade",
      project_desc: "Community focused defi protocol on Skale",
      symbol: "AQUA",
    },

    {
      logo: "/WIFO.png",
      banner: "/WIFO.png",
      project_name: "Cat Wif Out Hair",
      project_desc: "Fastest growing meme coin on Skale",
      symbol: "",
    },
    {
      logo: "/SHISH.png",
      banner: "/SHISH.png",
      project_name: "SHISHA INU",
      project_desc: "Doggy smoking til moon",
      symbol: "",
    },
  ];

  // NFT
  const projectData3: CardItemsProps = [
    {
      logo: "/NFT0.png",
      banner: "/NFT0.png",
      project_name: "Silver NFT",
      project_desc: "66% Swap Fee Discounts ...",
      symbol: "",
    },

    {
      logo: "/NFT1.png",
      banner: "/NFT0.png",
      project_name: "Gold NFT",
      project_desc: "100% Swap Fee Discounts ...",
      symbol: "",
    },

    {
      logo: "/NFT2.png",
      banner: "/NFT0.png",
      project_name: "Bronze NFT",
      project_desc: "33.3% Swap Fee Discounts ...",
      symbol: "",
    },
  ];

  // CARD TITLES
  const project1: CardTitleProps = {
    catagory: "DEX",
    action: "See All",
  };

  const project2: CardTitleProps = {
    catagory: "IDO",
    action: "See All",
  };

  const project3: CardTitleProps = {
    catagory: "NFT",
    action: "See All",
  };

  /*

  Get the pasth Name url and retreive the users ID , then pass down the user id through the componenent props


  if the  pathname has a user id , then don't show the telegram login button 

  */

  return (
    <MobileLayout>
      <div className={styles.login}>
        <span className={styles.input_row}>import 0x private key to Sign</span>

        {!userID ? (
          <span className={styles.input_row}>
            <span className={styles.input_item}>
              {" "}
              <LoginButton
                botUsername={"AquasTradeBot" as string}
                authCallbackUrl="/telegram"
                buttonSize="medium" // "large" | "medium" | "small"
                cornerRadius={12} // 0 - 20
                showAvatar={true} // true | false
                lang="en"
              />
            </span>

            <span className={styles.input_item}>
              <Image
                className={styles.image_invert_center}
                src={SKL}
                alt="AquasTrade Logo outbound external links"
                width={30}
                height={30}
                priority
              />
            </span>

            <span className={styles.input_item}>
              <Link href="https://github.com/aquastrade" target="_blank">
                <Image
                  className={styles.image_invert_center}
                  src={GH}
                  alt="AquasTrade Logo outbound external links"
                  width={30}
                  height={30}
                  priority
                />
              </Link>
            </span>
          </span>
        ) : (
          <span> </span>
        )}
      </div>{" "}
      <TelegramCard {...projectData1} {...project1}></TelegramCard>
      <TelegramCard {...projectData2} {...project2}></TelegramCard>
      <TelegramCard {...projectData3} {...project3}></TelegramCard>
    </MobileLayout>
  );
};

export default TelegramMenu;
