import { Model } from "objection";
import Account from "./account";
import Session from "./session";
import Authenticator from "./authenticator";
import IUser from "@/util/interfaces/iuser";
import { Knex } from "knex";



class User extends IUser {
  static get tableName() {
    return "user";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "string" },
        name: { type: ["string", "null"] },
        email: { type: ["string", "null"] },
        emailVerified: { type: ["string", "null"], format: "date-time" },
        image: { type: ["string", "null"] },
      },
    };
  }

  static get relationMappings() {
    // Require here to avoid circular dependencies

    return {
      accounts: {
        relation: Model.HasManyRelation,
        modelClass: Account,
        join: {
          from: "user.id",
          to: "account.userId",
        },
      },

      sessions: {
        relation: Model.HasManyRelation,
        modelClass: Session,
        join: {
          from: "user.id",
          to: "session.userId",
        },
      },

      authenticators: {
        relation: Model.HasManyRelation,
        modelClass: Authenticator,
        join: {
          from: "user.id",
          to: "authenticator.userId",
        },
      },
    };
  }
}
export default User;
