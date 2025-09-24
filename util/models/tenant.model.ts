import { Transaction } from "objection";
import { BaseModel } from "./base/base.model";
import { Lease } from "./lease.model";
import { Tenant as TT } from "./schemas";

class Tenant extends BaseModel {
  static get tableName() {
    return "tenant";
  }

  static get idColumn() {
    return "id";
  }

  static async getAllTenants(): Promise<Partial<TT>[] | undefined> {
    try {
      const data = await Tenant.query();
      return data as Partial<TT>[];
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  static async getTenantById(id: string): Promise<Tenant | undefined> {
    try {
      return await Tenant.query().findById(id);
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  static async createTenant(
    payload: Partial<TT>
  ): Promise<Tenant | undefined> {
    let trx: Transaction | undefined;
    try {
      trx = await this.knex().transaction();
      const created = await Tenant.query()
        .insertAndFetch(payload)
        .transacting(trx);

      if (created) {
        await trx?.commit();
        return created;
      }
      throw new Error("Error creating tenant");
    } catch (error) {
      await trx?.rollback();
      console.log(error);
      return undefined;
    }
  }

  static async updateTenant(
    id: string,
    payload: Partial<TT>
  ): Promise<Tenant | undefined> {
    let trx: Transaction | undefined;
    try {
      trx = await this.knex().transaction();
      const updated = await Tenant.query()
        .patchAndFetchById(id, payload)
        .transacting(trx);

      if (updated) {
        await trx?.commit();
        return updated;
      }
      throw new Error("Error updating tenant");
    } catch (error) {
      await trx?.rollback();
      console.log(error);
      return undefined;
    }
  }

  static async deleteTenant(id: string): Promise<boolean> {
    let trx: Transaction | undefined;
    try {
      trx = await this.knex().transaction();
      const rowsDeleted = await Tenant.query()
        .deleteById(id)
        .transacting(trx);

      if (rowsDeleted > 0) {
        await trx?.commit();
        return true;
      }
      throw new Error("Error while deleting tenant!");
    } catch (error) {
      await trx?.rollback();
      console.log(error);
      return false;
    }
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: ["userId", "firstName", "lastName", "email", "unitId"],
      properties: {
        id: { type: "string", format: "uuid" },
        userId: { type: "string", format: "uuid" },

        // Personal info
        firstName: { type: "string", minLength: 1 },
        lastName: { type: "string", minLength: 1 },
        email: { type: "string", format: "email" },
        phoneNumber: { type: ["string", "null"] },
        dateOfBirth: { type: ["string", "null"], format: "date" },
        idNumber: { type: ["string", "null"] }, // national ID / passport

        // Address info
        currentAddress: { type: ["string", "null"] },
        city: { type: ["string", "null"] },
        postalCode: { type: ["string", "null"] },
        country: { type: "string", default: "South Africa" },

        // Lease / unit info
        unitId: { type: "string", format: "uuid" },
        monthlyRent: { type: ["number", "null"], minimum: 0 },
        isActive: { type: "boolean", default: true },

        // Emergency contact
        emergencyContactName: { type: ["string", "null"] },
        emergencyContactPhone: { type: ["string", "null"] },

        // Metadata
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: ["string", "null"], format: "date-time" },
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

export { Tenant };
