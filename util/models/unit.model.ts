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