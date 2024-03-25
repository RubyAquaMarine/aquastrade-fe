"use client";

import React, { useEffect, useState } from "react";

const Button: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  // This useEffect hook ensures that the component is only mounted on the client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {}, []);

  if (!isMounted) {
    return null; // Don't render anything on the server side
  }

  return (
    <div>
      <button></button>
    </div>
  );
};

export default Button;
