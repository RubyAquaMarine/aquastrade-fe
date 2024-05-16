// @ts-nocheck
"use client";

// This is a PAGE : APP ROUTER URL == the name of this Folder

import React, { useState, useEffect } from "react";
import Link from "next/link";

import styles from "@/app/Styles/Links.module.css";

// https://ui.shadcn.com/docs/components/combobox

import { Button } from "@/app/Components/ui/Button";

// WORKING
import { AccordionDemo } from "../Components/AccordianDemo";

import { AlertDialogDemo } from "../Components/AlertDialogDemo";

import { CardDemo } from "../Components/CardDemo";

import { CarouselOrientation } from "../Components/CarouselDemo";

import { ThemeToggle } from "@/app/Components/ui/ThemeToggle";

// Doesn't work
import { ComboBoxDemo } from "../Components/ComboBoxDemo";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/app/Components/ui/Command";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/Components/ui/Dialog";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/Components/ui/DropdownMenu";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/app/Components/ui/NavigationMenu";

import { NavigationMenuDemo } from "@/app/Components/NavBarDemo";

// Dummy
import { Box } from "../Components/Box";

// The name of this function doesn't matter but it must be "export default"
export default function Home() {
  const [position, setPosition] = React.useState("bottom");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2>Enter Components below for testing and styling </h2>

      <ThemeToggle></ThemeToggle>

      <NavigationMenuDemo></NavigationMenuDemo>

      <div>
        {" "}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Trade</NavigationMenuTrigger>

              <NavigationMenuContent>
                <Link href="/swap/amm" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Swap Tokens
                  </NavigationMenuLink>
                </Link>

                <Link href="/perp/ethusdt" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Perpetuals
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Buy NFT
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>{" "}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </main>
  );
}

/*
 <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open Radio </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
*/

/*
 <Dialog>
        <DialogTrigger>Open Pop Over</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
*/

/*
 <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>Profile</CommandItem>
            <CommandItem>Billing</CommandItem>
            <CommandItem>Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
*/
