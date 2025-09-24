import { BaseModel } from "./base/base.model";
import { Lease } from "./lease.model";
import { Property } from "./property.model";
import { Unit as UU } from "./schemas";

class Unit extends BaseModel {
  static get tableName() {
    return "unit";
  }

  static get idColumn() {
    return "id";
  }

  static async getAllUnits(): Promise<Partial<UU>[] | undefined> {
    try {
      const data = await Unit.query();
      return data as Partial<UU>[];
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  static async getUnitById(id: string): Promise<Unit | undefined> {
    try {
      return await Unit.query().findById(id);
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  static async createUnit(payload: Partial<UU>): Promise<Unit | undefined> {
    let trx;
    try {
      trx = await this.knex().transaction();
      const created = await Unit.query()
        .insertAndFetch(payload)
        .transacting(trx);
      if (created) {
        trx.commit();
        return created;
      }
      throw new Error("Error creating Unit");
    } catch (error) {
      trx?.rollback();
      console.log(error);
      return undefined;
    }
  }

  static async updateUnit(
    id: string,
    payload: Partial<UU>
  ): Promise<Unit | undefined> {
    let trx;
    try {
      trx = await this.knex().transaction();
      const updated = await Unit.query()
        .patchAndFetchById(id, payload)
        .transacting(trx);
      if (updated) {
        trx.commit();
        return updated;
      }
      throw new Error("Error updating unit");
    } catch (error) {
      trx?.rollback();
      console.log(error);
      return undefined;
    }
  }

  static async deleteUnit(id: string): Promise<boolean> {
    let trx;
    try {
      trx = await this.knex().transaction();

      const rowsDeleted = await Unit.query().deleteById(id).transacting(trx);

      if (rowsDeleted > 0) {
        trx.commit();
        return true;
      }
      throw new Error("Error while deleting unit!");
    } catch (error) {
      trx?.rollback();
      console.log(error);
      return false;
    }
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["propertyId", "unitNumber", "rentAmount"],
      properties: {
        id: { type: "string", format: "uuid" },
        propertyId: { type: "string", format: "uuid" },

        // Unit info
        unitNumber: { type: "string", minLength: 1 },
        floor: { type: "integer", default: 1 },
        bedrooms: { type: "integer", minimum: 0 },
        bathrooms: { type: "integer", minimum: 0 },
        squareMeters: { type: ["number", "null"] },
        isFurnished: { type: "boolean", default: false },
        petFriendly: { type: "boolean", default: false },
        hasBalcony: { type: "boolean", default: false },

        // Rent / status
        rentAmount: { type: "number", minimum: 0 },
        currency: { type: "string", default: "ZAR" },
        status: {
          type: "string",
          enum: ["vacant", "occupied", "maintenance"],
          default: "vacant",
        },
        tenants: {
          type: "array",
          items: { type: "string", format: "uuid" },
          default: [],
        },
        // Lease availability
        availableFrom: { type: ["string", "null"], format: "date" },

        // Metadata
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: ["string", "null"], format: "date-time" },
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

export { Unit };
