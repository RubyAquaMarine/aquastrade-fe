"use client";

import Link from "next/link";
import React, { useState } from "react";
import Oracle from "@/app/Components/ReadRazorOracle";

// client components
const NavbarBottom = () => {
  return (
    <div>
      <Oracle name="ETHUSD" />
    </div>
  );
};

export default NavbarBottom;
