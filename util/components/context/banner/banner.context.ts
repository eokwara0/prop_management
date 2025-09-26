import React, { createContext, useContext } from "react";

export type BannerType = "success" | "error" | "info" | "warning";

export type BannerConextType = {
  show: (message: React.ReactNode | undefined, type: BannerType) => void;
  close: () => void;
};

export const BannerContext = createContext<BannerConextType | undefined>(
  undefined
);

export function useBanner() {
  const context = useContext(BannerContext);
  if (!context) {
    throw new Error("invalid context please use inside of provider");
  }
  return context;
}
