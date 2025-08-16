"use client";

import { useContext } from "react";
import signupValidationContext, {
  signupDispatchContext,
} from "../context/authentication/signup.password.validation";

export default function SignupValidation({ length }: { length: number }) {
  const signupvalidationcontext = useContext(signupValidationContext);

  const default_color = "bg-white";
  let change_color = "";
  if (signupvalidationcontext.numbers.length < 3) {
    change_color = "bg-red-500";
  } else if (
    signupvalidationcontext.numbers.length > 2 &&
    signupvalidationcontext.numbers.length < 5
  ) {
    change_color = "bg-amber-500";
  } else {
    change_color = "bg-green-500";
  }
  const values = Array.from({ length }, (v, k) => {
    return (
      <div
        key={k}
        className={`w-[25%] rounded h-1 ${
          signupvalidationcontext.numbers.includes(k)
            ? change_color
            : default_color
        }`}
      >
        {/* {`${k}`} */}
      </div>
    );
  });
  return (
    <>
      <div className=" w-full flex gap-2 pt-2 pb-4 ">{...values}</div>
    </>
  );
}
