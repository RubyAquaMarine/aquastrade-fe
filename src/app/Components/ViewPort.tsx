// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
interface TextSizeAdjusterProps {
  text?: string;
  text_size?: string;
  text_size_to?: string;
}
const TextSizeAdjuster: React.FC<TextSizeAdjusterProps> = ({
  text,
  text_size,
  text_size_to,
}) => {
  const [isVertical, setIsVertical] = useState<boolean>(
    window.matchMedia("(orientation: portrait)").matches,
  );

  useEffect(() => {
    const updateOrientation = () => {
      setIsVertical(window.matchMedia("(orientation: portrait)").matches);
    };

    window.addEventListener("resize", updateOrientation);

    return () => {
      window.removeEventListener("resize", updateOrientation);
    };
  }, []);

  return (
    <div>
      <p
        style={{
          fontSize: isVertical ? `${text_size}px` : `${text_size_to}px`,
        }}
      >
        {/* Your text content */}
        {text}
      </p>
    </div>
  );
};

export default TextSizeAdjuster;
