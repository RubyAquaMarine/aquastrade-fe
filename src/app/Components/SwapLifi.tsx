"use client";
import { LiFiWidget } from "@lifi/widget";
import WidgetEvents from "./WidgetEvents";
import styles from "@/app/Styles/Links.module.css";
import Link from "next/link";

const SwapLifi = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-20">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <span className={styles.text_style_bottom}> Lifi </span>

        <span> Multi-chain </span>
        <p>Token Swap</p>

        <p> Start by </p>
        <span className={styles.text_style_bottom}> clicking tab -{">"} </span>
        <WidgetEvents />
        <LiFiWidget
          config={{
            variant: "drawer",
            containerStyle: {
              border: `1px solid rgb(234, 234, 234)`,
              borderRadius: "12px",
            },
            theme: {
              palette: {
                primary: { main: "#3464af" },
                secondary: { main: "#3498db" },
                background: {
                  paper: "#1a1a1c", // bg color for cards
                  default: "#000000", // bg color container
                },
              },
            },
          }}
          integrator="nextjs-example"
        />
      </div>
      <span className={styles.text_style_bottom}>
        {" "}
        <Link href="https://github.com/lifinance/widget" target="_blank">
          Source Code
        </Link>
      </span>
    </div>
  );
};

export default SwapLifi;
