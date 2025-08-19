"use client"
import { SignupData } from "@/util/interfaces/signup.data";
import { createContext } from "react";

export enum SignupContextAction {
    ADD = "ADD"
    ,DELETE = "DELETE"
};
const SignupContext = createContext<SignupData>({} as SignupData);
const SignupDispatchContext = createContext<React.Dispatch<{ type: SignupContextAction  ; value: SignupData }> | undefined>(undefined);



export const SignupReducer = (
  state: SignupData,
  action: { type: SignupContextAction; value: SignupData }
) => {
  switch (action.type) {
    case SignupContextAction.ADD:
      return {
        ...state,
        numbers: {...state , ...action.value },
      };
    case SignupContextAction.ADD:
      return {
        ...state
      };
    default:
      throw new Error(`unknow action type : ${action.type}`);
  }
};



export { SignupContext , SignupDispatchContext};
