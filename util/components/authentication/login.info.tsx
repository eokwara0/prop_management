"use client";

import { createContext, useReducer } from "react";
import LoginCircles from "./login_info.hook";
import LoginInfoBox from "./login.info.box";


export type LoginInfoContextType = {
  index: number;
};

export enum LoginInfoActionType {
  SetIndex = "setIndex",
}

export const LoginInfoContext = createContext<LoginInfoContextType | undefined>(
  undefined
);
export const LoginDispatchContext = createContext<
  React.Dispatch<{ type: string; newIndex: number }> | undefined
>(undefined);

export const LoginInfoReducer = (
  state: {
    index: number;
  },
  action: { type: string; newIndex: number }
) => {
  switch (action.type) {
    case "setIndex":
      return { ...state, index: action.newIndex };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

export function LoginInfoProvider({ length }: { length: number }) {
  const [state, dispatch] = useReducer(LoginInfoReducer, { index: 0 });

  return (
    <LoginInfoContext.Provider value={state}>
      <LoginDispatchContext.Provider value={dispatch}>
        <div className="flex flex-col gap-10 justify-center items-center">
          <LoginCircles length={length} />
          <LoginInfoBox length={length} index={state.index} />
        </div>
      </LoginDispatchContext.Provider>
    </LoginInfoContext.Provider>
  );
}
export default function LoginInfoPage({ length }: { length: number }) {
  return <LoginInfoProvider length={length}></LoginInfoProvider>;
}
