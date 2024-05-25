"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

const DarkModeToggle: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // This useEffect hook ensures that the component is only mounted on the client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Don't render anything on the server side
  }

  const toggleTheme = () => {
    console.log(" Toggle Theme", theme);
    if (theme === "dark") {
      setTheme("light");
    }
    if (theme === "light") {
      setTheme("dark");
    }
  };

  return (
    <div>
      <Image
        src="/light.svg"
        alt="menu"
        width={22}
        height={22}
        priority
        onClick={toggleTheme}
        placeholder="blur"
      />
    </div>
  );
};

export default DarkModeToggle;

/*

<button
        className={`${styles.toggleButton} ${theme ? styles.darkMode : styles.lightMode}`}
        onClick={toggleTheme}
      >
        {theme == 'dark' ? 
        
        
        
        
        'light' : 'dark'}
      </button>

*/
