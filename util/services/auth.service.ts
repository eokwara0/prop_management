import { Knex } from "knex";
import User from "../models/auth/user";
import UserPass from "../models/auth/user_pass";
import { AdapterUser } from "next-auth/adapters";

export class AuthService {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  async login(email: string, password: string) : Promise<AdapterUser>{
    const user = await User.query().where({ email: email }).first();

    if (!user) {
      throw new Error("User not found");
    }
    const user_pass = await UserPass.query().where("userId", user.id).first();
    if (!user_pass) {
      throw new Error("User has no password");
    }
    // Here you would typically check the password hash
    // For simplicity, we assume the password is correct
    return user;
  }

  async logout(userId: string) {
    // In a real application, you might invalidate the session or token
    // Here we just return a success message
    return { message: "User logged out successfully" };
  }

  async register(userData: { email: string; password: string; name?: string }) {
    const existingUser = await this.knex("user")
      .where({ email: userData.email })
      .first();
    if (existingUser) {
      throw new Error("User already exists");
    }
    const [newUser] = await this.knex("user").insert(userData).returning("*");
    return newUser;
  }
}
