// @ts-nocheck
"use client";
import React, { useState } from "react";
import styles from "@/app/Styles/Checkbox.module.css"; // Import CSS file for styling

const Checkbox: React.FC = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={styles.checkboxContainer}>
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        {isChecked}
      </label>
    </div>
  );
};

export default Checkbox;
