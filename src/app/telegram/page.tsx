"use client";
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

import {
  TelegramCard,
  TelegramCardProps,
  CardProps,
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

  const projectData1: TelegramCardProps = [
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
      project_desc: "Fastest growing defi protocol on Skale",
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

  const projectData2: TelegramCardProps = [
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
      project_desc: "Fastest growing defi protocol on Skale",
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

  const projectData3: TelegramCardProps = [
    {
      logo: "/NFT0.png",
      banner: "/NFT0.png",
      project_name: "Skale",
      project_desc: "L2 Scaling solution for Ethereum",
      symbol: "SKL",
    },

    {
      logo: "/NFT1.png",
      banner: "/NFT0.png",
      project_name: "Aquas.Trade",
      project_desc: "Fastest growing defi protocol on Skale",
      symbol: "AQUA",
    },

    {
      logo: "/NFT2.png",
      banner: "/NFT0.png",
      project_name: "Cat Wif Out Hair",
      project_desc: "Fastest growing meme coin on Skale",
      symbol: "WIFO",
    },
  ];

  const project1: CardProps = {
    catagory: "DEX",
    action: "See All",
  };

  const project2: CardProps = {
    catagory: "IDO",
    action: "See All",
  };

  const project3: CardProps = {
    catagory: "NFT",
    action: "See All",
  };

  /*

  Get the pasth Name url and retreive the users ID , then pass down the user id through the componenent props


  if the  pathname has a user id , then don't show the telegram login button 

  */

  return (
    <MobileLayout>
      <div>
        <span className={styles.input}>
          <PrivateKeyInput></PrivateKeyInput>{" "}
        </span>

        {!userID ? (
          <span>
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
        ) : (
          <span> </span>
        )}
      </div>{" "}
      <TelegramCard {...projectData1} {...project1}></TelegramCard>
      <TelegramCard {...projectData2} {...project2}></TelegramCard>
      <TelegramCard {...projectData3} {...project3}></TelegramCard>
      <TelegramCard {...projectData3} {...project3}></TelegramCard>
      <TelegramCard {...projectData3} {...project3}></TelegramCard>
      <TelegramCard {...projectData3} {...project3}></TelegramCard>
      <TelegramCard {...projectData3} {...project3}></TelegramCard>
      <TelegramCard {...projectData3} {...project3}></TelegramCard>
      <TelegramCard {...projectData3} {...project3}></TelegramCard>
      <TelegramCard {...projectData3} {...project3}></TelegramCard>
      <TelegramCard {...projectData3} {...project3}></TelegramCard>
    </MobileLayout>
  );
};

export default TelegramMenu;
