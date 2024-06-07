// components/Header.tsx
import React from "react";
import styles from "@/app/Styles/Telegram.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1>My Mobile App</h1>
    </header>
  );
};

export default Header;
