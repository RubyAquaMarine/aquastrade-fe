"use client";
import React from "react";
import Image from "next/image";
import styles from "@/app/Styles/Airdrop.module.css";

interface SpinningImageProps {
  imageUrl: string;
}

const SpinningImage: React.FC<SpinningImageProps> = ({ imageUrl }) => {
  return (
    <div className={styles.container}>
     
      <Image
              src={imageUrl}
              alt="Spinning Image"
              width={120}
              height={120}
              priority
              className={styles.image} 
            />

    </div>
  );
};

export default SpinningImage;
