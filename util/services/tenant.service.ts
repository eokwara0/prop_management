import { Transaction } from "objection";
import { Tenant } from "../models/tenant.model";
import knex from "../auth/database.init";

/**
 * TenantService
 *
 * Service layer providing CRUD operations for the Tenant model.
 *
 * This class exposes static methods that wrap Objection.js model queries and
 * use Knex transactions for create, update and delete operations. Errors are
 * caught and logged to the console; methods return undefined (or false for
 * delete) to indicate failure.
 *
 * Methods:
 * - getAllTenants(): Promise<Tenant[] | undefined>
 *   - Fetches all tenants.
 *   - Returns an array of Tenant instances or undefined if an error occurs.
 *
 * - getTenantById(id: string): Promise<Tenant | undefined>
 *   - Fetches a single tenant by its identifier.
 *   - Returns the Tenant instance or undefined if not found or on error.
 *
 * - createTenant(payload: Partial<Tenant>): Promise<Tenant | undefined>
 *   - Inserts a new tenant inside a Knex transaction and returns the created record.
 *   - Commits the transaction on success; rolls back and returns undefined on error.
 *
 * - updateTenant(id: string, payload: Partial<Tenant>): Promise<Tenant | undefined>
 *   - Patches and fetches a tenant by id inside a Knex transaction.
 *   - Commits the transaction on success; rolls back and returns undefined on error.
 *
 * - deleteTenant(id: string): Promise<boolean>
 *   - Deletes a tenant by id inside a Knex transaction.
 *   - Commits the transaction and returns true when a row was deleted.
 *   - Rolls back and returns false on error or when no rows were deleted.
 *
 * Remarks:
 * - The service assumes the presence of the Tenant Objection.js model and a
 *   configured Knex instance as used in the implementation.
 * - Transactions are created per operation (create/update/delete) and always
 *   attempt to commit on success or rollback on failure.
 * - Error handling is centralized to logging to the console; callers should
 *   interpret undefined / false return values as operation failures.
 *
 * Example:
 * const tenants = await TenantService.getAllTenants();
 *
 * @public
 */
class TenantService {
  static async getAllTenants(): Promise<Tenant[] | undefined> {
    try {
      const data = await Tenant.query();
      return data;
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
    payload: Partial<Tenant>
  ): Promise<Tenant | undefined> {
    let trx: Transaction | undefined;
    try {
      trx = await knex.transaction();
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
    payload: Partial<Tenant>
  ): Promise<Tenant | undefined> {
    let trx: Transaction | undefined;
    try {
      trx = await knex.transaction();
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
      trx = await knex.transaction();
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
}

export default TenantService;
