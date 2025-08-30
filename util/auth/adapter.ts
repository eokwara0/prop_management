import type { Adapter, AdapterSession } from "next-auth/adapters";
import { Knex } from "knex";
import { AuthService } from "../services/auth.service";
import IUser from "../interfaces/iuser";
import Session from "../models/auth/session";
import User from "../models/auth/user";

/**
 * KnexAdapter provides a NextAuth.js-compatible adapter using Knex.js as the data layer.
 *
 * @param knex - A configured Knex instance connected to your database.
 * @returns An object implementing the Adapter interface for NextAuth.js.
 *
 * This adapter implements CRUD operations for:
 * - Users
 * - Accounts (OAuth/OIDC/Email)
 * - Sessions
 * - Verification Tokens
 * - Authenticators (WebAuthn)
 */
export function KnexAdapter(knex: Knex): Adapter {
  return {
    // ----------------------------
    // USERS
    // ----------------------------

    /** Creates a new user in the database. */
    async createUser(user) {
      const [newUser] = await knex("user").insert(user).returning("*");
      return newUser;
    },

    async getSessionAndUser(token) {
      try {
        const session = await Session.query()
          .where("sessionToken", token)
          .first();
        if (!session) {
          throw new Error("user has no session");
        }

        const user = await User.query().where("id", session.userId).first();
        const roles = await AuthService.getUserActivities({
          userId: session.userId,
        });

        return {
          session: session,
          user: {
            ...user,
            roles: roles,
          } as IUser,
        };
      } catch (error) {
        return null;
      }
    },
    /** Returns a user by their ID. */
    async getUser(id) {
      const user = await knex("user").where({ id }).first();
      const roles = await AuthService.getUserActivities({ userId: id });
      return {
        ...user,
        roles: roles,
      } as IUser;
    },

    /** Returns a user by their email. */
    async getUserByEmail(email) {
      return knex("user").where({ email }).first();
    },

    /** Returns a user by a linked account's provider and providerAccountId. */
    async getUserByAccount({ provider, providerAccountId }) {
      const account = await knex("account")
        .where({ provider, providerAccountId })
        .first();
      if (!account) return null;
      return knex("user").where({ id: account.userId }).first();
    },

    /** Updates a user's information. */
    async updateUser(user) {
      const [updated] = await knex("user")
        .where({ id: user.id })
        .update(user)
        .returning("*");
      return updated;
    },

    /** Deletes a user by ID. */
    async deleteUser(userId) {
      await knex("user").where({ id: userId }).del();
    },

    // ----------------------------
    // ACCOUNTS
    // ----------------------------

    /** Links an account to a user. */
    async linkAccount(account) {
      await knex("account").insert(account);
      return account;
    },

    /** Unlinks an account by provider and providerAccountId. */
    async unlinkAccount({ provider, providerAccountId }) {
      await knex("account").where({ provider, providerAccountId }).del();
    },

    /** Returns an account by provider and providerAccountId. */
    async getAccount(providerAccountId, provider) {
      return knex("account").where({ provider, providerAccountId }).first();
    },

    // ----------------------------
    // SESSIONS
    // ----------------------------

    /** Creates a session for a user. */
    async createSession(session) {
      const [newSession] = await knex("session").insert(session).returning("*");
      return newSession;
    },

    /** Updates a session by sessionToken. */
    async updateSession(session) {
      const [updated] = await knex("session")
        .where({ sessionToken: session.sessionToken })
        .update(session)
        .returning("*");
      return updated;
    },

    /** Deletes a session by sessionToken. */
    async deleteSession(sessionToken) {
      await knex("session").where({ sessionToken }).del();
    },

    // ----------------------------
    // VERIFICATION TOKENS
    // ----------------------------

    /** Creates a verification token. */
    async createVerificationToken(token) {
      const [newToken] = await knex("verificationToken")
        .insert(token)
        .returning("*");
      return newToken;
    },

    /** Uses a verification token and deletes it from the database. */
    async useVerificationToken({ identifier, token }) {
      const vt = await knex("verificationToken")
        .where({ identifier, token })
        .first();
      if (!vt) return null;
      await knex("verificationToken").where({ identifier, token }).del();
      return vt;
    },

    // ----------------------------
    // AUTHENTICATORS (WebAuthn)
    // ----------------------------

    /** Retrieves a WebAuthn authenticator by credentialID. */
    async getAuthenticator(credentialID) {
      return knex("authenticator").where({ credentialID }).first();
    },

    /** Creates a new WebAuthn authenticator. */
    async createAuthenticator(authenticator) {
      const [newAuth] = await knex("authenticator")
        .insert(authenticator)
        .returning("*");
      return newAuth;
    },

    /** Lists all authenticators for a given user ID. */
    async listAuthenticatorsByUserId(userId) {
      return knex("authenticator").where({ userId });
    },

    /** Updates the counter for a WebAuthn authenticator. */
    async updateAuthenticatorCounter(credentialID, newCounter) {
      const [updated] = await knex("authenticator")
        .where({ credentialID })
        .update({ counter: newCounter })
        .returning("*");
      return updated;
    },
  };
}
