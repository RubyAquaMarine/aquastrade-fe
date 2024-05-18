"use client";

import { useEffect } from "react";
import { Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function useToastSuccess(text: string) {
  useEffect(() => {
    if (!text) return;

    toast.success(`${text}`, {
      position: "bottom-left",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }, [text]);
}
