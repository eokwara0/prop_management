"use client";

import { JSX, useContext } from "react";
import signupValidationContext from "../context/authentication/signup.password.validation";

export default function SignupValidation({ length }: { length: number }) {
  const { numbers } = useContext(signupValidationContext);

  // Decide color once per render
  let change_color = "bg-white";
  if (numbers.length < 3) {
    change_color = "bg-red-500";
  } else if (numbers.length < 5) {
    change_color = "bg-amber-500";
  } else if (numbers.length == 5) {
    change_color = "bg-green-500";
  }else{
    change_color = "bg-white"
  }

  return (
    <div className="w-full flex gap-2 pt-3 pb-3 px-2">
      {Array.from({ length }, (_, k) => (
        <div
          key={k}
          className={`w-[25%] rounded h-0.5 ${
            numbers.includes(k) ? change_color : "bg-white"
          }`}
        />
      ))}
    </div>
  );
}
