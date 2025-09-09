import { BaseModel } from "./base/base.model";
import { Lease } from "./lease.model";
import { Property } from "./property.model";

class Unit extends BaseModel {
  static get tableName() {
    return "unit";
  }

  static get idColumn() {
    return "id";
  }

   static get jsonSchema() {
    return {
      type: "object",
      required: ["propertyId", "unitNumber", "rentAmount"],
      properties: {
        id: { type: "string", format: "uuid" },
        propertyId: { type: "string", format: "uuid" },
        unitNumber: { type: "string", minLength: 1 },
        rentAmount: { type: "number", minimum: 0 },
        status: { enum: ["vacant", "occupied", "maintenance"] },
        createdAt: { type: "string", format: "date-time" },
      },
    };
  }

  static get relationMappings() {
    return {
      property: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Property,
        join: {
          from: "unit.propertyId",
          to: "property.id",
        },
      },
      leases: {
        relation: BaseModel.HasManyRelation,
        modelClass: Lease,
        join: {
          from: "unit.id",
          to: "lease.unitId",
        },
      },
    };
  }
}

export { Unit }