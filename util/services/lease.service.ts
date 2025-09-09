import { Transaction } from "objection";
import { Lease } from "../models/lease.model"; // adjust path
import knex from "../auth/database.init";

class LeaseService {
  static async getAllLeases(): Promise<Lease[] | undefined> {
    try {
      const data = await Lease.query()
        .withGraphFetched("[unit, tenant]"); // eager load relations
      return data;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  static async getLeaseById(id: string): Promise<Lease | undefined> {
    try {
      return await Lease.query()
        .findById(id)
        .withGraphFetched("[unit, tenant]");
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  static async createLease(
    payload: Partial<Lease>
  ): Promise<Lease | undefined> {
    let trx: Transaction | undefined;
    try {
      trx = await knex.transaction();
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
    payload: Partial<Lease>
  ): Promise<Lease | undefined> {
    let trx: Transaction | undefined;
    try {
      trx = await knex.transaction();
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
      trx = await knex.transaction();
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
}

export default LeaseService;
