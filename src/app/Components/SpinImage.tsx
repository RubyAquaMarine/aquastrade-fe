"use client";
import React from "react";
import styles from "@/app/Styles/Airdrop.module.css";

interface SpinningImageProps {
  imageUrl: string;
}

const SpinningImage: React.FC<SpinningImageProps> = ({ imageUrl }) => {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={imageUrl} alt="Spinning Image" />
    </div>
  );
};

export default SpinningImage;
