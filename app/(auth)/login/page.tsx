import { redirect } from "next/navigation";
import { signIn, providerMap } from "@/util/auth";
import { AuthError } from "next-auth"
import AppLogo from '@/assets/logo/icon2.png';
import LoginInfoPage from "@/util/components/authentication/login.info";
import Image from "next/image";

const SIGNIN_ERROR_URL = "/error";
export const dynamic = "force-dynamic";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div className="min-h-[calc(100vh-2rem)] justify-center items-center content-center flex flex-col gap-2 bg-gradient-to-tr from-l_f_s to-l_f_f">
      <div className="justify-center items-center content-center  h-full flex flex-col gap-2 ">
        <div className=" transition-all  duration-75 w-full max-sm:w-full max-sm:h-[auto]  h-[auto] justify-between  flex flex-col rounded-md p-4 gap-3">
          <form
            action={async (formData) => {
              "use server";
              try {
                await signIn(
                  "credentials",
                  formData
                  // redirect("/app", RedirectType.push)
                );
              } catch (error) {
                if (error instanceof AuthError) {
                  return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
                }
                throw error;
              }
            }}
            className=" flex flex-col gap-2 w-full"
          >
            <div className="h-[100%] flex flex-col items-left">
              <label className=" mb-6">
                <div className="flex  gap-3 justify-start items-center">
                 <Image src={AppLogo} alt={"app logo"} width={50} height={50} />
                <p className="text-xl ">Domio</p>

                </div>
              </label>
              <label htmlFor="email" className="mb-5">
                <div className="h-2"></div>
                <input
                  name="email"
                  id="email"
                  placeholder="Email or username"
                  className="bg-gradient-to-tr placeholder:text-sm from-login-form to-l_f_s pl-3 text-gray-50  w-full border border-slate-50 rounded-md h-8"
                />
              </label>
              <label htmlFor="password" className="mb-5">
                <input
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="bg-gradient-to-tr placeholder:text-sm from-login-form to-l_f_s  pl-3 text-gray-50  w-full border border-slate-50 rounded-md h-8"
                />
              </label>
            </div>

            <input
              type="submit"
              value="Sign In"
              className=" align-bottom h-10 p-2 rounded-md  w-full bg-button "
            />
            <div className="text-[0.7rem] flex flex-col  gap mt-3">
              <div className=" w-full flex justify-start text-button">
                <a href="" className="text-xs">
                  Forgot password ?
                </a>
              </div>
              <div className="flex gap-2">
                <p className=" font-extralight">Don&apos;t have an account?</p>{" "}
                <span>
                  <a href="/signup" className="border-b-white text-button ">
                    Sign up
                  </a>
                </span>
              </div>
            </div>
          </form>
         
          {Object.values(providerMap).map((provider) => (
            <form
              key={provider.id}
              action={async () => {
                "use server";
                try {
                  await signIn(provider.id, {
                    redirectTo:
                      ((await searchParams).callbackUrl as string) ?? "",
                  });
                } catch (error) {
                  // Signin can fail for a number of reasons, such as the user
                  // not existing, or the user not having the correct role.
                  // In some cases, you may want to redirect to a custom error
                  if (error instanceof AuthError) {
                    return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
                  }

                  // Otherwise if a redirects happens Next.js can handle it
                  // so you can just re-thrown the error and let Next.js handle it.
                  // Docs:
                  // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
                  throw error;
                }
              }}
            >
              <button
                type="submit"
                className="    w-full bg-white text-slate-600 p-2 rounded-md"
              >
                <span>Sign in with {provider.name}</span>
              </button>
            </form>
          ))}
        </div>
        <LoginInfoPage length={7} />
      </div>
      <div className="p-3 text-xs">
        <p>© 2025. All rights reserved.</p>
      </div>
    </div>
  );
}
