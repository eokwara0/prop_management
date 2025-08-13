import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import { KnexAdapter } from "./adapter";
import knex from "./database.init";

export const { auth, handlers, signIn, signOut } = NextAuth({
  trustHost: true,
  debug: true,
  adapter: KnexAdapter(knex),
  providers: [
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
        return null;
      },
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
});
