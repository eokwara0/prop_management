import { redirect, RedirectType } from "next/navigation";
import { signIn, providerMap } from "@/util/auth";
import { AuthError } from "next-auth";
import LoginInfoPage from "@/util/components/authentication/login.info";

const SIGNIN_ERROR_URL = "/error";
export const dynamic = 'force-dynamic';

export default async function SignInPage({
  searchParams
} : { searchParams : Promise<{ [key : string] : string | string[] | undefined }>} ) {
  return (
    <div className=" justify-between items-center content-center  h-screen flex flex-col gap-2 bg-gradient-to-tr from-l_f_s to-l_f_f">
      <div className="justify-center items-center content-center  h-screen flex flex-col gap-2 bg-gradient-to-tr from-l_f_s to-l_f_f">
        <div className=" bg-gradient-to-tr from-l_f_s to-l_f_f   transition-all  duration-75 w-fit max-sm:w-fit max-sm:h-[auto]  h-[auto] justify-between flex flex-col rounded-md p-4 gap-3">
          <form
            action={async (formData) => {
              "use server";
              try {
                await signIn("credentials", formData ,redirect('/app' , RedirectType.push));
              } catch (error) {
                if (error instanceof AuthError) {
                  return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
                }
                throw error;
              }
            }}
            className=" flex flex-col gap-2 w-fit"
          >
            <div className="h-[80%] flex flex-col items-left">
              <label className="">
                <p className="text-3xl ">Domio</p>
              </label>
              <div className="h-4"></div>
              <label htmlFor="email" className="mb-5">
                <div className="h-2"></div>
                <input
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="bg-gradient-to-tr placeholder:text-sm from-login-form to-l_f_s pl-3 text-gray-50  w-full border-[0.5px] border-slate-50 rounded-md h-9"
                />
              </label>
              <label htmlFor="password" className="mb-5">
                <input
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="bg-gradient-to-tr placeholder:text-sm from-login-form to-l_f_s  pl-3 text-gray-50  w-full border-[0.5px] border-slate-50 rounded-md h-9"
                />
              </label>
            </div>

            <input
              type="submit"
              value="Sign In"
              className=" align-bottom h-10 rounded-md  w-full bg-button "
            />
          </form>

          {Object.values(providerMap).map((provider) => (
            <form
              key={provider.id}
              action={async () => {
                "use server";
                try {
                  await signIn(provider.id, {
                    redirectTo: (await searchParams).callbackUrl as string ?? ""
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
