"use client";
import { Alert, Container, Stack } from "@mui/material";
import { useEthers } from "@usedapp/core";
import React from "react";
import { Exchange } from "./DexAqua";
import { WalletButton } from "./Amounts";

import { usePoolsWithWETHAddress } from "../Utils/usePool";

import { ROUTER_AQUADEX } from "../Utils/config";

const ROUTER_ADDRESS = ROUTER_AQUADEX;

const SwapAqua = () => {
  const { account, error, chainId, activateBrowserWallet } = useEthers();

  // pass in the router address here
  const [poolsLoading, pools] = usePoolsWithWETHAddress(
    ROUTER_ADDRESS,
    undefined,
  );

  if (error) {
    console.error("Ethers Failed to Load");
    throw error;
  }

  if (chainId) {
    if (chainId !== 2046399126) {
      console.error("Switch to Skale EuropaHubChain to Swap on Ruby ");
    }
  }

  const desiredChainId = 2046399126; // Replace with the desired chain ID you want to prompt for

  const handleSwitchChain = () => {
    activateBrowserWallet(); // This triggers wallet connection
  };

  console.error("Swap Ruby ");

  return (
    <>
      <div>
        {chainId !== desiredChainId && (
          <div>
            <p>
              You are currently on chain ID {chainId}. To use this app, please
              switch to chain ID {desiredChainId}.
            </p>
            <button onClick={handleSwitchChain}>Switch Chain</button>
          </div>
        )}

        {chainId === desiredChainId && (
          <div>
            {/* Your regular content for the desired chain */}
            <p>Welcome to Europa SKALE Chain!</p>
            <div>
              {" "}
              <Stack justifyContent="right" direction="row" padding="10px">
                <WalletButton />
              </Stack>
            </div>

            <div>
              <Container maxWidth={"md"} sx={{ bgcolor: "#03DAC6", p: 1 }}>
                {account ? (
                  poolsLoading ? (
                    <Alert severity="info">Loading pools, please wait!</Alert>
                  ) : (
                    <Exchange pools={pools} />
                  )
                ) : (
                  <Alert severity="info">Please connect your wallet</Alert>
                )}
              </Container>
            </div>

            <div>
              {" "}
              <Stack
                justifyContent={"flex-end"}
                width={"100%"}
                direction={"row"}
                sx={{ position: "absolute", bottom: 0 }}
              ></Stack>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default SwapAqua;
