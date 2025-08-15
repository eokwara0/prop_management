import { Model } from "objection";
import User from "./user";
// assuming you have a User model

export default class UserPass extends Model {
  userId!: string;
  passwordHash!: string;
  passwordSalt?: string;
  isActive!: boolean;
  createdAt!: Date;
  lastUsedAt?: Date;

  static get tableName() {
    return "user_pass";
  }

  static get idColumn() {
    return "userId"; // since your migration sets userId as primary key
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["userId", "passwordHash"],
      properties: {
        userId: { type: "string" },
        passwordHash: { type: "string" },
        passwordSalt: { type: ["string", "null"] },
        isActive: { type: "boolean" },
        createdAt: { type: "string", format: "date-time" },
        lastUsedAt: { type: ["string", "null"], format: "date-time" },
      },
    };
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "user_pass.userId",
          to: "user.id",
        },
      },
    };
  }
}
