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
import PrivateKeyInput from "@/app/Components/telegram/InputPrivateKey";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/Components/ui/Card";

import styles from "@/app/Styles/CardTelegram.module.css";

// Title and the action button name
export type CardTitleProps = {
  catagory: string;
  action: string;
};

// Each card will contain 3 items
export type CardItemsProps = [
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

export const TelegramCard = (params: CardItemsProps) => {
  const testArray = Object.values(params);

  const inputAction = testArray?.[3].toString();

  console.log("props 1 ", params, testArray, inputAction);

  const divRef = useRef<HTMLDivElement>(null);

  return (
    <div id="telegram card" ref={divRef}>
      <span className={styles.card_border}>
        <Card className={styles.card}>
          <CardHeader className={styles.card_slim}>
            <CardTitle>
              <span className={styles.card_title_left}>
                <Link
                  href={`/telegram/${testArray?.[3].toString().toLowerCase()}`}
                >
                  {testArray?.[3].toString()}
                </Link>
              </span>
              <span className={styles.card_title_right}>
                <Link
                  href={`/telegram/${testArray?.[3].toString().toLowerCase()}`}
                >
                  {testArray?.[4].toString()}
                </Link>
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
                          <span>
                            {(inputAction && inputAction === "NFT") ||
                            (inputAction &&
                              inputAction === "IDO" &&
                              project.symbol) ? (
                              <button className={styles.button_nft}>
                                {" "}
                                Buy{" "}
                              </button>
                            ) : (
                              ""
                            )}{" "}
                          </span>
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
        <PrivateKeyInput></PrivateKeyInput>{" "}
      </span>
    </div>
  );
};
/*
 

*/
