import { BaseModel } from "./base/base.model";
import { Tenant } from "./tenant.model";
import { Unit } from "./unit.model";

class Lease extends BaseModel {
  static get tableName() {
    return "lease";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["unitId", "tenantId", "startDate", "endDate", "monthlyRent"],
      properties: {
        id: { type: "string", format: "uuid" },
        unitId: { type: "string", format: "uuid" },
        tenantId: { type: "string", format: "uuid" },
        startDate: { type: "string", format: "date" },
        endDate: { type: "string", format: "date" },
        monthlyRent: { type: "number", minimum: 0 },
        status: { enum: ["active", "inactive", "terminated"] },
        createdAt: { type: "string", format: "date-time" },
      },
    };
  }

  static get relationMappings() {
    return {
      unit: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Unit,
        join: {
          from: "lease.unitId",
          to: "unit.id",
        },
      },
      tenant: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Tenant,
        join: {
          from: "lease.tenantId",
          to: "tenant.id",
        },
      },
    };
  }
}

export { Lease };
