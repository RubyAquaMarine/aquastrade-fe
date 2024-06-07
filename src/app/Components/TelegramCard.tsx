/*


The goal here is to mimic the CARD container found within 

the Telegram games. 


Pass down 3 iteams at a time 

    logo: string;
    banner: string;
    project_name: string;
    project_desc: string;
    symbol: string;



*/

"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, memo, useRef } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/Components/ui/Card";

import styles from "@/app/Styles/CardTelegram.module.css";

export type CardProps = {
  catagory: string;
  action: string;
};

export type TelegramCardProps = [
  {
    logo: string;
    banner: string;
    project_name: string;
    project_desc: string;
    symbol: string;
  },
  {
    logo: string;
    banner: string;
    project_name: string;
    project_desc: string;
    symbol: string;
  },
  {
    logo: string;
    banner: string;
    project_name: string;
    project_desc: string;
    symbol: string;
  },
];

export const TelegramCard = (params: TelegramCardProps, project: CardProps) => {
  const testArray = Object.values(params);

  console.log("props", testArray, project);

  console.log("props", testArray?.length);

  const divRef = useRef<HTMLDivElement>(null);

  return (
    <div id="telegram card" ref={divRef}>
      <Card className={styles.card}>
        <CardHeader className={styles.card_slim}>
          <CardTitle>
            <span className={styles.card_title_left}>
              {" "}
              {testArray?.[3].toString()}{" "}
            </span>
            <span className={styles.card_title_right}>
              {" "}
              {testArray?.[4].toString()}{" "}
            </span>
          </CardTitle>
        </CardHeader>

        {testArray.map((project, index) => (
          <span key={index}>
            {project.logo ? (
              <CardContent className={styles.card_content}>
                <ul>
                  <li className={styles.list_item}>
                    <span className={styles.image_top}>
                      {" "}
                      <Image
                        className={styles.image_round}
                        src={`${project.logo}`}
                        alt="AquasTrade Logo outbound external links"
                        width={54}
                        height={54}
                      />
                    </span>

                    <span className={styles.text_wht}>
                      <span>
                        {" "}
                        {project.project_name} : {project.symbol}{" "}
                      </span>
                      <span className={styles.text_desc}>
                        {project.project_desc}....
                      </span>
                    </span>
                  </li>
                </ul>
              </CardContent>
            ) : (
              ""
            )}
          </span>
        ))}
      </Card>
    </div>
  );
};
/*
 

*/
