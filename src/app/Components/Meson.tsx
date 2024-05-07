// @ts-nocheck
"use client";

import { MesonToButton } from "@mesonfi/to";
import styles from "@/app/Styles/Links.module.css";

const SwapMeson = () => {
  return (
    <>
      <MesonToButton
        appId="demo"
        type="iframe"
        to={{
          network: "polygon",
          addr: "0x243f22fbd4C375581aaACFCfff5A43793eb8A74d",
        }}
        onCompleted={() => {}}
        className={styles.button}
      ></MesonToButton>
    </>
  );
};

export default SwapMeson;

/*
https://github.com/MesonFi/meson-to
*/
