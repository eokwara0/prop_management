import { Knex } from "knex";

export class AuthService {
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
  }

  async login(email: string, password: string) {
    const user = await this.knex("user").where({ email }).first();
    if (!user) {
      throw new Error("User not found");
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
        const existingUser = await this.knex("user").where({ email: userData.email }).first();
        if (existingUser) {
        throw new Error("User already exists");
        }
        const [newUser] = await this.knex("user").insert(userData).returning("*");
        return newUser;
    }
}
