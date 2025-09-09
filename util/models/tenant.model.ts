import { BaseModel } from "./base/base.model";
import { Lease } from "./lease.model";

class Tenant extends BaseModel {
  static get tableName() {
    return "tenant";
  }

  static get idColumn() {
    return "id";
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