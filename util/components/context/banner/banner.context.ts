import React, { createContext } from "react";

export enum BannerContextAction {
  SHOW = "SHOW",
  CLOSE = "CLOSE",
}

const BannerContext = createContext<
  | {
      message: React.ReactNode;
      type: "success" | "error" | "info" | "warning";
      show: boolean;
    }
  | undefined
>(undefined);

const BannerDispatchContext = createContext<
  | React.Dispatch<{
      type: BannerContextAction;
      value?: {
        message: React.ReactNode;
        type: "success" | "error" | "info" | "warning";
      };
    }>
  | undefined
>(undefined);

export const BannerReducer = (
  state:
    | {
        message: React.ReactNode;
        type: "success" | "error" | "info" | "warning";
        show: boolean;
      }
    | undefined,
  action: {
    type: BannerContextAction;
    value?: {
      message: React.ReactNode;
      type: "success" | "error" | "info" | "warning";
    };
  }
) => {
  switch (action.type) {
    case BannerContextAction.SHOW:
      return action.value
        ? { message: action.value.message, type: action.value.type, show: true }
        : state;
    case BannerContextAction.CLOSE:
       return action.value
        ? { message: action.value.message, type: action.value.type, show: false }
        : state;
    default:
      throw new Error(`unknown action type: ${action.type}`);
  }
};

export { BannerContext, BannerDispatchContext };
