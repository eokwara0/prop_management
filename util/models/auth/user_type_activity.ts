import { Model, RelationMappings } from "objection";
import Role from "./role";
import UserType from "./user.type";

class UserTypeActivity extends Model {
  id!: number;
  userTypeId!: number;
  roleIds!: number[];
  createdAt!: Date;

  static override get tableName(): string {
    return "user_type_activity";
  }

  static override get idColumn(): string {
    return "id";
  }

  static override get jsonSchema() {
    return {
      type: "object",
      required: ["userTypeId", "roleIds"],
      properties: {
        id: { type: "integer" },
        userTypeId: { type: "integer" },
        roleIds: {
          type: "array",
          items: { type: "integer" },
          minItems: 1,
        },
        createdAt: { type: "string", format: "date-time" },
      },
    };
  }

  static override get relationMappings(): RelationMappings {
    return {
      userType: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserType,
        join: {
          from: "user_type_activity.userTypeId",
          to: "user_type.id",
        },
      },
      roles: {
        relation: Model.ManyToManyRelation,
        modelClass: Role,
        join: {
          from: "user_type_activity.roleIds", // array, will need raw queries
          to: "role.id",
        },
      },
    };
  }
}

export default UserTypeActivity;
