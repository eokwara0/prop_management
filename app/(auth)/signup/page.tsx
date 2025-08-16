import SignupValidation from "@/util/components/authentication/signup.password.validation.component";
import SignupPasswordValidationProvider from "@/util/components/context/authentication/signup.password.validation.provider";

export default function SignUpPage() {
  return (
    <>
      <SignupPasswordValidationProvider>
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-tr from-l_f_s to-l_f_f">
          <div className=" bg-gradient-to-tr from-l_f_s to-l_f_f   transition-all  duration-75 w-fit max-sm:w-fit max-sm:h-[auto]  h-[auto] justify-between flex flex-col rounded-md p-4 gap-3">
            <form className=" flex flex-col gap-2 w-fit">
              <div className="h-[80%] flex flex-col items-left">
                <label className="">
                  <p className="text-3xl ">Domio</p>
                </label>
                <div className="h-4"></div>
                <label htmlFor="email" className="mb-5">
                  <div className="h-2"></div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="email address"
                    className="bg-gradient-to-tr placeholder:text-sm from-login-form to-l_f_s pl-3 text-gray-50  w-full border-[0.5px] border-slate-50 rounded-md h-9"
                  />
                </label>
                <label htmlFor="password" className="">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    pattern="^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?]).*$"
                    className="bg-gradient-to-tr placeholder:text-sm from-login-form to-l_f_s  pl-3 text-gray-50  w-full border-[0.5px] border-slate-50 rounded-md h-9"
                  />
                </label>
                <SignupValidation length={5} />
                <label htmlFor="retypepass" className="mb-5">
                  <input
                    type="password"
                    name="password"
                    id="retypepass"
                    pattern="^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?]).*$"
                    placeholder="Retype Password"
                    className="bg-gradient-to-tr placeholder:text-sm from-login-form to-l_f_s  pl-3 text-gray-50  w-full border-[0.5px] border-slate-50 rounded-md h-9"
                  />
                </label>
              </div>

              <input
                type="submit"
                value="Continue"
                className=" align-bottom h-10 rounded-md  w-full bg-button "
              />
            </form>
          </div>
        </div>
      </SignupPasswordValidationProvider>
    </>
  );
}
