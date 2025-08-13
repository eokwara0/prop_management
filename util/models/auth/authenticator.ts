import { Model } from "objection";
import User from "./user";
import { AdapterAuthenticator } from "next-auth/adapters";

class Authenticator extends Model implements AdapterAuthenticator {
  userId!: string;
  providerAccountId!: string;
  counter!: number;
  credentialBackedUp!: boolean;
  credentialID!: string;
  credentialPublicKey!: string;
  transports?: string | null | undefined;
  credentialDeviceType!: string;
  static get tableName() {
    return "authenticator";
  }

  static get idColumn() {
    return ["userId", "credentialID"];
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [
        "credentialID",
        "userId",
        "providerAccountId",
        "credentialPublicKey",
        "counter",
        "credentialDeviceType",
        "credentialBackedUp",
      ],
      properties: {
        credentialID: { type: "string" },
        userId: { type: "string" },
        providerAccountId: { type: "string" },
        credentialPublicKey: { type: "string" },
        counter: { type: "integer" },
        credentialDeviceType: { type: "string" },
        credentialBackedUp: { type: "boolean" },
        transports: { type: ["string", "null"] },
      },
    };
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "authenticator.userId",
          to: "user.id",
        },
      },
    };
  }
}

export default Authenticator;
