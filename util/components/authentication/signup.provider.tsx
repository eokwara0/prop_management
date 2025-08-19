import { useReducer } from "react";
import {
  SignupContext,
  SignupDispatchContext,
  SignupReducer,
} from "../context/authentication/signup.context";
import { SignupData } from "@/util/interfaces/signup.data";

export default function SignupProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(SignupReducer, {
    name: "",
    email:"",
    password : "",
    address: "",
    cellphone: "",
    DOB: new Date(Date.now()),
    gender: "",
    surname: "",
  });

  return (
    <SignupDispatchContext.Provider value={dispatch}>
      <SignupContext.Provider value={state}>{children}</SignupContext.Provider>
    </SignupDispatchContext.Provider>
  );
}
