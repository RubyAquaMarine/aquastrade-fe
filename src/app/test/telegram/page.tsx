"use client";
import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

import MobileLayout from "@/app/Components/TelegramLayout";

import {
  TelegramCard,
  TelegramCardProps,
  CardProps,
} from "@/app/Components/TelegramCard";

const TelegramMenu = ({ params }: any) => {
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

  return (
    <MobileLayout>
      {" "}
      <TelegramCard {...projectData1} {...project1}></TelegramCard>
      <TelegramCard {...projectData2} {...project2}></TelegramCard>
      <TelegramCard {...projectData3} {...project3}></TelegramCard>
    </MobileLayout>
  );
};

export default TelegramMenu;
