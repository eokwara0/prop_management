"use client";
import SignupValidation from "@/util/components/authentication/signup.password.validation.component";
import SignupPasswordValidationProvider from "@/util/components/context/authentication/signup.password.validation.provider";
import AppLogo from "@/assets/logo/icon.png";
import Image from "next/image";
import PasswordField from "@/util/components/authentication/signup.password.field";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SignupProvider from "@/util/components/authentication/signup.provider";
import { SignupContext } from "@/util/components/context/authentication/signup.context";

export default function SignUpPage() {
  const [retype, setretype] = useState("");
  const [password, setpassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();
  const signupcontext = useContext(SignupContext)

  useEffect(() => {
    // password validity check
    console.log(signupcontext.password);
    const strongPasswordRegex =
      /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,})\S$/;

    if (
      password.length > 0 &&
      retype.length > 0 &&
      password === retype &&
      strongPasswordRegex.test(password)
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [password, retype]);

  return (
    <SignupProvider >
    <SignupPasswordValidationProvider>
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-tr from-l_f_s to-l_f_f">
        <div className="transition-all duration-75 w-full max-sm:w-full max-sm:h-auto h-auto justify-between flex flex-col rounded-md p-4 gap-3 items-center">
          <form
            id="signup_form"
            name="signup_form"
            className="transition-all duration-75 flex flex-col gap-2 justify-center items-center w-1/5 max-sm:w-fit max-md:w-fit"
          >
            <div className="transition-all duration-75 flex flex-col items-left w-full">
              <label>
                <div className="flex justify-start items-center gap-3">
                  <Image src={AppLogo} alt={"logo"} width={40} height={40} />
                  <p className="text-3xl text-white">Domio</p>
                </div>
              </label>
              <div className="h-4" />
              <label htmlFor="signup_email" className="mb-5">
                <input
                  type="email"
                  name="signup_email"
                  id="signup_email"
                  placeholder="Email address"
                  className="bg-gradient-to-tr placeholder:text-sm from-login-form to-l_f_s pl-3 text-gray-50 w-full border border-slate-50 rounded-md h-9"
                  required
                />
              </label>
              <label htmlFor="signup_password">
                <PasswordField action={setpassword} val={password}>
                  <p></p>
                </PasswordField>
              </label>
              <SignupValidation length={5} />
              <label htmlFor="retypepass" className="mb-5">
                <input
                  value={retype}
                  onChange={(e) => {

                    setretype(e.currentTarget.value)
                  }}
                  type="password"
                  name="retypepass"
                  id="retypepass"
                  placeholder="Retype Password"
                  className="bg-gradient-to-tr placeholder:text-sm from-login-form to-l_f_s pl-3 text-gray-50 w-full border border-slate-50 rounded-md h-9"
                  required
                />
              </label>
            </div>
            <button
              onClick={
                () => {
                  router.push("/signup?details")
                }
              }
              type="submit"
              disabled={!isValid}
              className={`align-bottom h-10 rounded-md w-full ${
                isValid
                  ? "bg-button cursor-pointer"
                  : "bg-slate-500 cursor-not-allowed"
              }`}
            >
              Continue
            </button>

            <p className="self-start flex gap-3 text-xs text-left justify-start items-start">
              Already have an account?
              <a href="/login" className="text-button text-xs font-extralight">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </SignupPasswordValidationProvider>
    </SignupProvider>

  );
}
