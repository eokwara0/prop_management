import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import { KnexAdapter } from "./adapter";
import knex from "./database.init";
import { Provider } from "next-auth/providers";
import { AuthService } from "../services/auth.service";

AuthService.getInstance(knex);

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: {
        type: "email",
        label: "Email",
        placeholder: "exampleemail@emailserver.co.za <email>",
      },
      password: {
        type: "password",
        label: "Password",
        placeholder: "********** <password>",
      },
    },
    authorize: async (credentials) => {
      try {
         if (
        credentials &&
        typeof credentials.email === "string" &&
        typeof credentials.password === "string"
      ) {
        return AuthService.login(credentials.email, credentials.password);
      }
      } catch (error) {
        console.log('The error went on!', error);
      }
      return null;
    },
  }),
  GitHub({
    clientId: process.env.AUTH_GITHUB_ID,
    clientSecret: process.env.AUTH_GITHUB_SECRET,
  }),
];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const { auth, handlers, signIn, signOut } = NextAuth({
  trustHost: true,
  debug: true,
  adapter: KnexAdapter(knex),
  providers: providers,
  callbacks : {
    
  },
  pages: {
    signIn: "/login",
    error : "/error"
    // newUser : '/signup/oauth_'
  },
});
