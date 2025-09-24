import { Transaction } from "objection";
import { BaseModel } from "./base/base.model";
import { LeaseSchema, Lease as LL } from "./schemas";
import { Tenant } from "./tenant.model";
import { Unit } from "./unit.model";

class Lease extends BaseModel {
  static get tableName() {
    return "lease";
  }

  static get idColumn() {
    return "id";
  }


  static async getAllLeases() : Promise<Partial<LL>[] | undefined> {
    try{
      const result = await this.query();
      return result as Partial<LL>[];
    } catch (err){
      console.log(err);
      return undefined;
    }
  }

  static async getLeaseById(id: string): Promise<Lease | undefined> {
    try {
      return await Lease.query()
        .findById(id);
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  static async createLease(
    payload: Partial<LL>
  ): Promise<Lease | undefined> {
    let trx: Transaction | undefined;
    try {
      trx = await this.knex().transaction();
      const created = await Lease.query()
        .insertAndFetch(payload)
        .transacting(trx);

      if (created) {
        await trx.commit();
        return created;
      }
      throw new Error("Error creating lease");
    } catch (error) {
      await trx?.rollback();
      console.log(error);
      return undefined;
    }
  }

  static async updateLease(
    id: string,
    payload: Partial<LL>
  ): Promise<Lease | undefined> {
    let trx: Transaction | undefined;
    try {
      trx = await this.knex().transaction();
      const updated = await Lease.query()
        .patchAndFetchById(id, payload)
        .transacting(trx);

      if (updated) {
        await trx.commit();
        return updated;
      }
      throw new Error("Error updating lease");
    } catch (error) {
      await trx?.rollback();
      console.log(error);
      return undefined;
    }
  }

  static async deleteLease(id: string): Promise<boolean> {
    let trx: Transaction | undefined;
    try {
      trx = await this.knex().transaction();
      const rowsDeleted = await Lease.query()
        .deleteById(id)
        .transacting(trx);

      if (rowsDeleted > 0) {
        await trx.commit();
        return true;
      }
      throw new Error("Error while deleting lease!");
    } catch (error) {
      await trx?.rollback();
      console.log(error);
      return false;
    }
  }
  
  static get jsonSchema() {
    return {
      type: "object",
      required: ["unitId", "tenantId", "startDate", "monthlyRent"],
      properties: {
        id: { type: "string", format: "uuid" },

        // Relationships
        unitId: { type: "string", format: "uuid" },
        tenantId: { type: "string", format: "uuid" },

        // Lease details
        startDate: { type: "string", format: "date" },
        endDate: { type: ["string", "null"], format: "date" },
        monthlyRent: { type: "number", minimum: 0 },
        currency: { type: "string", default: "ZAR" },
        depositAmount: { type: ["number", "null"], minimum: 0 },
        paymentFrequency: {
          type: "string",
          enum: ["monthly", "weekly", "yearly"],
          default: "monthly",
        },

        // Status
        status: {
          type: "string",
          enum: ["active", "terminated", "pending"],
          default: "active",
        },

        // Notes
        notes: { type: ["string", "null"] },

        // Metadata
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: ["string", "null"], format: "date-time" },
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
