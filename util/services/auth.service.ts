import { Knex } from "knex";
import User from "../models/auth/user";
import UserPass from "../models/auth/user_pass";
import { AdapterUser } from "next-auth/adapters";
import { EncryptPassword } from "../util/helper.function";
import { email } from "zod";

export class AuthService {
  static knex: Knex;

  static getInstance(knex: Knex): AuthService {
    if (!AuthService.knex) {
      AuthService.knex = knex;
    }
    return new AuthService();
  }

  static async login(email: string, password: string): Promise<AdapterUser> {
    let trx;
    try {
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      trx = await this.knex.transaction();

      const user = await User.query()
        .where({ email: email })
        .first()
        .transacting(trx);

      if (!user) {
        throw new Error("User not found");
      }
      const user_pass = await UserPass.query()
        .where("userId", user.id)
        .first()
        .transacting(trx);
      if (!user_pass) {
        throw new Error("User has no password");
      }
      // Here you would typically check the password hash
      // For simplicity, we assume the password is correct
      trx.commit();
      return user;
    } catch (error) {
      trx?.rollback();
      throw error;
    }
  }

  static async logout(userId: string) {
    // In a real application, you might invalidate the session or token
    // Here we just return a success message
    return { message: "User logged out successfully" };
  }

  static async register(userData: {
    email: string;
    password: string;
    name: string;
    userType: string;
  }) {
    let trx;
    try {
      trx = await this.knex.transaction();

      const existingUser = await this.knex("user")
        .where({ email: userData.email })
        .first()
        .transacting(trx);
      if (existingUser) {
        throw new Error("User already exists");
      }

      const [user] = await this.knex("user")
        .insert({
          email: userData.email,
          name: userData.name,
        })
        .returning("*")
        .transacting(trx);
      if (!user) {
        throw new Error("Failed to create user");
      }

      const [account] = await this.knex("account")
        .insert({
          userId: user.id,
          provider: "credentials",
          type: "credentials",
          providerAccountId: userData.email,
        })
        .returning("*")
        .transacting(trx);
      if (!account) {
        throw new Error("Failed to create account");
      }
      const userType = await this.knex("user_type")
        .where({ name: userData.userType })
        .first()
        .transacting(trx);

      if (!userType) {
        throw new Error("Invalid user type");
      }
      const [userPass] = await this.knex("user_pass")
        .insert({
          userId: user.id,
          passwordHash: await EncryptPassword(userData.password), // In a real application, hash the password
          passwordSalt: process.env.PASS_SALT,
          userTypeId: userType.id,
        })
        .returning("*")
        .transacting(trx);

      if (!userPass) {
        throw new Error("Failed to create user password");
      }
      await trx.commit();
      return { user };
    } catch (error) {
      await trx!.rollback();
      throw error;
    }
  }
}
