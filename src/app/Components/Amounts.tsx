// @ts-nocheck
"use client";

import { Input, MenuItem, Select, Button, Snackbar } from "@mui/material";
import { shortenAddress, useEthers, useLookupAddress } from "@usedapp/core";
import React, { useEffect, useState } from "react";
import { formatUnits } from "ethers/lib/utils";

import { useAmountsOut } from "../Utils/usePool";
import { ROUTER_AQUADEX } from "../Utils/config";

/**
 * Displays the amountOut
 * @param props {string} Props
 * @return {JSX.Element}
 * @constructor
 */
export function AmountOut(props) {
  const { pairContract, amountIn, fromToken, toToken } = props;
  const amountOut =
    useAmountsOut(pairContract, amountIn, fromToken, toToken) ?? 0;
  return (
    <Input
      disableUnderline
      sx={{ fontSize: "2em" }}
      id="amountOut"
      value={formatUnits(amountOut)}
      disabled
    />
  );
}

export function AmountIn(props) {
  const { value, onChange } = props;

  return (
    <Input
      sx={{ fontSize: "2em" }}
      disableUnderline={true}
      autoComplete={"off"}
      id="outlined-adornment-weight"
      value={value}
      onChange={(e) =>
        typeof onChange === "function" && onChange(e.target.value)
      }
    />
  );
}

export function CurrencySelector(props) {
  const { value, onSelect, currencies, showEmpty } = props;

  const overrideTokenName = (token, tokenName) => {
    return tokenName;
  };

  return (
    <Select
      sx={{ width: "24ch" }}
      variant={"standard"}
      disableUnderline={true}
      id="from-token-select"
      value={Object.keys(currencies).includes(value) ? value : ""}
      displayEmpty={!!showEmpty}
      onChange={(e) =>
        typeof onSelect === "function" && onSelect(e.target.value)
      }
    >
      {showEmpty ? <MenuItem value="">{showEmpty}</MenuItem> : null}
      {Object.entries(currencies).map(([token, tokenName], index) => (
        <MenuItem key={index} value={token}>
          {overrideTokenName(token, tokenName)}
        </MenuItem>
      ))}
    </Select>
  );
}

export function WalletButton() {
  const [rendered, setRendered] = useState("");
  const { account, activateBrowserWallet, deactivate } = useEthers();
  const { ens } = useLookupAddress(account);

  useEffect(() => {
    if (ens) {
      console.log(ens);
      setRendered(ens);
    } else if (account) {
      setRendered(shortenAddress(account));
    } else {
      setRendered("");
    }
  }, [account, ens, setRendered]);

  return (
    <Button
      variant="contained"
      onClick={() => {
        if (!account) {
          activateBrowserWallet();
        } else {
          deactivate();
        }
      }}
    >
      {rendered === "" && "Connect Wallet"}
      {rendered !== "" && rendered}
    </Button>
  );
}
