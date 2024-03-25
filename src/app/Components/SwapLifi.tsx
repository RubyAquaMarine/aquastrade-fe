"use client";
import { LiFiWidget } from "@lifi/widget";
import WidgetEvents from "./WidgetEvents";

const SwapLifi = () => {
  return (
    <>
      <WidgetEvents />
      <LiFiWidget
        config={{
          variant: "drawer",
          containerStyle: {
            border: `1px solid rgb(234, 234, 234)`,
            borderRadius: "16px",
          },
        }}
        integrator="nextjs-example"
      />
    </>
  );
};

export default SwapLifi;
