"use client";
import { useReducer } from "react";
import {
  signupDispatchContext,
  SignupPasswordReducer,
} from "./signup.password.validation";
import signupValidationContext from "./signup.password.validation";

export default function SignupPasswordValidationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(SignupPasswordReducer, {
    numbers: [],
  });
  return (
    <signupDispatchContext.Provider value={dispatch}>
      <signupValidationContext.Provider
        value={state}
      >
        {children}
      </signupValidationContext.Provider>
    </signupDispatchContext.Provider>
  );
}
