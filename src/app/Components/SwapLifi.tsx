"use client";
import { LiFiWidget } from "@lifi/widget";
import WidgetEvents from "./WidgetEvents";
import styles from "@/app/Styles/Links.module.css";
import Link from "next/link";

const SwapLifi = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-20">
      <div className="max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <span className={styles.textBold}> Lifi </span>

        <span className={styles.textSpace}>Multi-chain token swap</span>

        <p className={styles.textSpace}>
          {" "}
          Start by{" "}
          <span className={styles.text_style_bottom}>
            {" "}
            clicking tab -{">"}{" "}
          </span>
        </p>

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
