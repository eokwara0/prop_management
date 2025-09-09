import knex from "../auth/database.init";
import { Unit } from "../models/unit.model";

/**
 * Service layer providing CRUD operations for the Unit model.
 *
 * This class exposes static methods to query, create, update, and delete
 * Unit records via the underlying ORM. Methods are designed for simple
 * usage without creating an instance of the service.
 *
 * Error handling:
 * - All methods catch runtime errors and log them to the console.
 * - In error cases methods return undefined (for query/create/update) or false
 *   (for delete) instead of throwing, so callers should explicitly check
 *   returned values to determine success or failure.
 *
 * Usage example:
 * const units = await UnitService.getAllUnits();
 *
 * @remarks
 * This service intentionally avoids rethrowing errors to simplify call sites;
 * adapt behavior if you prefer exceptions to bubble up.
 */
class UnitService {
  static async getAllUnits(): Promise<Unit[] | undefined> {
    try {
      const data = await Unit.query();
      return data;
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

  static async createUnit(payload: Partial<Unit>): Promise<Unit | undefined> {
    let trx;
    try {
      trx = await knex.transaction();
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
    payload: Partial<Unit>
  ): Promise<Unit | undefined> {
    let trx;
    try {
      trx = await knex.transaction();
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
      trx = await knex.transaction();

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
}

export default UnitService;
