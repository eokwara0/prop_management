import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import { KnexAdapter } from "./adapter";
import knex from "./database.init";
import { Provider } from "next-auth/providers";
import { AuthService } from "../services/auth.service";
import { encode } from "next-auth/jwt";

AuthService.getInstance(knex);
const adapter = KnexAdapter(knex);

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
          const result = await AuthService.login(
            credentials.email,
            credentials.password
          );
          if (!result) {
            return null;
          }
          return {
            id: String(result.id),
            name: result.name,
            email: result.email,
          };
        }
      } catch (error) {
        //console.log("Authentication error:", error);
        return null;
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
  debug: false,
  adapter: adapter,
  providers: providers,
  callbacks: {
    async session(params) {
      //console.log("Session callback session:", params.session);

      if (!params.session.user) {
        throw new Error("No user in session");
      }
      return params.session;
    },
  },
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    encode: async ({ token, salt, secret }) => {
      const tk_data = await encode({
        token: token,
        salt: salt,
        secret: secret,
      });

      if (!tk_data) {
        throw new Error("Failed to encode JWT token");
      }
      const result = await adapter.createSession!({
        userId: token!.sub!,
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        sessionToken: tk_data,
      });
      if (!result) {
        throw new Error("Failed to create session");
      }
      return result.sessionToken;
    },
  },
  pages: {
    signIn: "/login",
    error: "/error",
    // newUser : '/signup/oauth_'
  },
});
