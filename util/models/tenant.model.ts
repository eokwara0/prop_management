import { BaseModel } from "./base/base.model";
import { Lease } from "./lease.model";

class Tenant extends BaseModel {
  static get tableName() {
    return "tenant";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["userId"],
      properties: {
        id: { type: "string", format: "uuid" },
        userId: { type: "string", format: "uuid" },
        emergencyContact: { type: "string" },
        employmentStatus: { type: "string" },
        createdAt: { type: "string", format: "date-time" },
      },
    };
  }
  
  static get relationMappings() {
    return {
      leases: {
        relation: BaseModel.HasManyRelation,
        modelClass: Lease,
        join: {
          from: "tenant.id",
          to: "lease.tenantId",
        },
      },
    };
  }
}

export { Tenant }