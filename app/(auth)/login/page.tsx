import { redirect } from "next/navigation";
import { signIn, auth, providerMap } from "@/util/auth";
import { AuthError } from "next-auth";
import LoginInfo from "@/util/components/authentication/login.info";

const SIGNIN_ERROR_URL = "/error";

export default async function SignInPage(props: {
  searchParams: { callbackUrl: string | undefined };
}) {
  return (
    <div className=" justify-center items-center content-center  h-screen flex flex-col gap-2 bg-gradient-to-tr from-login-form to-login-form">
      <div className=" bg-gradient-to-tr from-login-form to-80% transition-all  duration-75 w-[400px] max-sm:w-[300px] max-sm:h-[auto]  h-[auto] justify-between flex flex-col rounded-md p-4 border-2 border-white gap-3">
        <form
          action={async (formData) => {
            "use server";
            try {
              await signIn("credentials", formData);
            } catch (error) {
              if (error instanceof AuthError) {
                return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
              }
              throw error;
            }
          }}
          className=" flex flex-col gap-2 w-full"
        >
          <div className="h-[80%] flex flex-col items-left">
            <label className="">
              <p className="text-3xl ">Login</p>
            </label>
            <div className="h-4"></div>
            <label htmlFor="email" className="mb-5">
              <div>
                <p>Email</p>
              </div>
              <div className="h-2"></div>
              <input
                name="email"
                id="email"
                className="bg-gradient-to-tr from-login-form to-l_f_s placeholder:pl-4 pl-3 text-gray-50  w-full border-[0.5px] border-slate-50 rounded-md h-9"
              />
            </label>
            <label htmlFor="password" className="mb-5">
              <div>
                <p>Password</p>
              </div>
              <input
                name="password"
                id="password"
                className="bg-gradient-to-tr from-login-form to-l_f_s placeholder:pl-4 pl-3 text-gray-50  w-full border-[0.5px] border-slate-50 rounded-md h-9"
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
                  redirectTo: props.searchParams?.callbackUrl ?? "",
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
              className="w-full bg-white text-slate-600 p-2 rounded-md"
            >
              <span>Sign in with {provider.name}</span>
            </button>
          </form>
        ))}
      </div>

        <LoginInfo length={5} />
    </div>
  );
}
