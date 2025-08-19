"use client";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import {
  signupDispatchContext,
  SignupPasswordActionType,
} from "../context/authentication/signup.password.validation";
import { SignupContextAction, SignupDispatchContext } from "@/util/components/context/authentication/signup.context";
import { SignupData } from "@/util/interfaces/signup.data";

export default function PasswordField({
  children,
  action ,
  val
}: {
  children: React.ReactNode;
  action : Dispatch<SetStateAction<string>>;
  val : string
}) {

  const validatepassword = (password: string): Array<number> => {
    const results = [
      /[A-Z]/.test(password), // 0: uppercase
      /[a-z]/.test(password), // 1: lowercase
      /\d/.test(password), // 2: digit
      password.length >= 8, // 3: length
      /\S$/.test(password), // 4: ends with non-whitespace
    ];

    // return indexes of passed checks
    return results
      .map((passed, index) => (passed ? index : -1))
      .filter((i) => i !== -1).map((c,i) => i).sort();
  };

  const sudc = useContext(signupDispatchContext);
  const sd = useContext(SignupDispatchContext);
  return (
    <>
      <div className="flex w-full">
        <input
          onChange={(e) => {
            const values = validatepassword(e.currentTarget.value);
            sudc!({ type: SignupPasswordActionType.APPEND, num: values });
            action(e.currentTarget.value);
            sd!({type : SignupContextAction.ADD , value : {
                password : e.currentTarget.value
            } as SignupData});
          }}
          name="signup_password"
          id="signup_password"
          type="password"
          value={val}
          placeholder="Password"
          pattern="^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$"
          className="bg-gradient-to-tr placeholder:text-sm from-login-form to-l_f_s  pl-3 text-gray-50  w-full border border-slate-50 rounded-md h-8"
        />
        {children}
      </div>
    </>
  );
}
