"use client";
import React, { useContext } from "react";
import { BannerContextAction, BannerDispatchContext } from "./banner.context";
import { clearTimeout } from "timers";
export const useBanner = () => {
  const bannerState = useContext(BannerDispatchContext);
  const bannerDispatch = useContext(BannerDispatchContext);
  const showBanner = ({
    message,
    type,
  }: {
    message: React.ReactNode;
    type: "success" | "error" | "info" | "warning";
  }) => {
    if (bannerDispatch) {
      bannerDispatch({
        type: BannerContextAction.SHOW,
        value: { message, type },
      });
      const timer = setTimeout(() => {
        bannerDispatch({
          type: BannerContextAction.CLOSE,
          value: { message, type },
        });
      }, 5000);
      return () => clearTimeout(timer);
    }
  };

  const closeBanner = ({
    message,
    type,
  }: {
    message: React.ReactNode;
    type: "success" | "error" | "info" | "warning";
  }) => {
    if (bannerDispatch) {
      bannerDispatch({
        type: BannerContextAction.CLOSE,
        value: { message, type },
      });
    }
  };
  return { bannerState, showBanner, closeBanner };
};
