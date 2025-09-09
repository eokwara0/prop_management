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

export { Lease }