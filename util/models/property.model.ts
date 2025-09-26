import { BaseModel } from "./base/base.model";
import { Unit } from "./unit.model";
import { Property as PP } from "./schemas";

class Property extends BaseModel {
  static get tableName() {
    return "property";
  }

  static get idColumn() {
    return "id";
  }

   static async getAllProperties(): Promise<Partial<PP>[] | undefined> {
    try {
      const result = await Property.query();
      return result as Partial<PP>[];
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  static async getPropertiesRelatedToUser(
    userId: string
  ): Promise<Property[] | undefined> {
    try {
      const data = await Property.query()
        .where("ownerId", userId)
        .withGraphFetched("[unit]");
      return data;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  /**
   * Retrieve a Property by its identifier.
   *
   * Queries the underlying Property model for a record with the provided id.
   * This method is asynchronous and will return the found Property instance,
   * or undefined if no record is found or if an error occurs during the query.
   *
   * @param id - The unique identifier of the property to retrieve.
   * @returns A promise that resolves to the Property if found, otherwise undefined.
   *
   * @remarks
   * - Errors encountered during the database query are caught and logged; they do not throw from this function.
   * - Consumers should handle the undefined case to account for both "not found" and query failure scenarios.
   *
   * @example
   * const property = await PropertyService.getPropertyById('123');
   * if (!property) {
   *   // handle missing property
   * }
   */
  static async getPropertyById(id: string): Promise<Property | undefined> {
    try {
      return await Property.query().findById(id);
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  /**
   * Creates a new Property record within a database transaction.
   *
   * Attempts to insert the provided payload using Property.query().insertAndFetch(...)
   * inside a Knex transaction. On success the transaction is committed and the
   * newly created Property is returned. On failure the transaction is rolled back,
   * the error is logged, and the function returns undefined.
   *
   * @param payload - Partial<Property> with fields to set on the new record. The payload
   *                  should satisfy model and database constraints (required fields, types, etc.).
   * @returns A Promise that resolves to the created Property on success, or undefined if creation failed.
   *
   * @throws This method catches internal errors and does not re-throw them to callers;
   *         instead it rolls back the transaction and returns undefined. Internal errors
   *         are logged to the console.
   *
   * @remarks
   * - Uses an explicit Knex transaction (knex.transaction()).
   * - Uses Objection/Knex's insertAndFetch to insert and return the created row.
   * - Callers should validate and sanitize payload before invoking this method.
   *
   * @example
   * const property = await PropertyService.createProperty({ name: 'Duplex', address: '123 Main St' });
   * if (property) {
   *   // created successfully
   * } else {
   *   // handle failure
   * }
   */
  static async createProperty(
    payload: Partial<PP>
  ): Promise<Property | undefined> {
    let trx;
    try {
      trx = await this.knex().transaction();
      const created = await Property.query()
        .insertAndFetch(payload)
        .transacting(trx);
      if (created) {
        await trx.commit();
        return created;
      }
      throw new Error("Error creating Property");
    } catch (error) {
      await trx?.rollback();
      throw new Error((error as Error).message);
    }
  }

  /**
   * Update an existing Property record within a database transaction.
   *
   * Attempts to apply the provided payload to the Property with the given id.
   * Uses an explicit Knex transaction and Objection's patchAndFetchById to
   * update and return the modified record.
   *
   * @param id - The unique identifier of the property to update.
   * @param payload - Partial<Property> containing the fields to be updated.
   * @returns A Promise that resolves to the updated Property on success, or undefined if the update failed.
   *
   * @remarks
   * - On failure the transaction is rolled back, the error is logged, and undefined is returned.
   * - Callers should validate and sanitize payload before calling this method.
   *
   * @example
   * const updated = await PropertyService.updateProperty('123', { name: 'Updated Name' });
   * if (!updated) {
   *   // handle failure
   * }
   */
  static async updateProperty(
    id: string,
    payload: Partial<PP>
  ): Promise<Property | undefined> {
    let trx;
    try {
      trx = await this.knex().transaction();
      const updated = await Property.query()
        .patchAndFetchById(id, payload)
        .transacting(trx);
      if (updated) {
        await trx.commit();
        return updated;
      }
      throw new Error("Error updating Property");
    } catch (error) {
      await trx?.rollback();
      console.log(error);
      return undefined;
    }
  }

  /**
   * Delete a property record by its identifier using a database transaction.
   *
   * This method opens a new Knex transaction, attempts to delete the property
   * with the given id, commits the transaction if one or more rows were deleted,
   * and rolls back the transaction on any error or if no rows were deleted.
   *
   * @param id - The identifier of the property to delete.
   * @returns A Promise that resolves to:
   *   - `true` if the property was successfully deleted and the transaction committed,
   *   - `false` if the deletion failed or an error occurred (the transaction will be rolled back).
   *
   * @remarks
   * - The implementation performs an internal throw when no rows are deleted to
   *   trigger the rollback logic; however, that error is caught within the method
   *   and the method returns `false` to callers instead of propagating the error.
   * - Side effects: commits the transaction on success, rolls back on failure.
   * - Errors are logged to the console before returning `false`.
   *
   * @example
   * const success = await PropertyService.deleteProperty("a1b2c3d4-...");
   * if (success) {
   *   // deleted
   * } else {
   *   // handle failure
   * }
   *
   * @since 1.0.0
   */
  static async deleteProperty(id: string): Promise<boolean> {
    let trx;
    try {
      trx = await this.knex().transaction();
      const rowsDeleted = await this.query()
        .deleteById(id)
        .transacting(trx);
      if (rowsDeleted > 0) {
        await trx.commit();
        return true;
      }
      throw new Error("Error while deleting Property!");
    } catch (error) {
      await trx?.rollback();
      console.log(error);
      return false;
    }
  }

  // JSON schema for validation
  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "ownerId"], // 👈 address can be optional (matches your migration)

      properties: {
        id: { type: "string", format: "uuid" },
        name: { type: "string", minLength: 1 },
        description: { type: "string" },
        address: { type: ["string", "null"] },
        city: { type: ["string", "null"] },
        state: { type: ["string", "null"] },
        postalCode: { type: ["string", "null"] },
        country: { type: "string" },
        type: {
          type: "string",
          enum: [
            "house",
            "apartment",
            "townhouse",
            "condo",
            "duplex",
            "commercial",
            "land",
          ],
        },
        bedrooms: { type: "integer", minimum: 0 },
        bathrooms: { type: "integer", minimum: 0 },
        squareFeet: { type: ["number", "null"] },
        hasParking: { type: "boolean" },
        isFurnished: { type: "boolean" },
        ownerId: { type: "string", format: "uuid" },
        price: { type: ["number", "null"] },
        isForRent: { type: "boolean" },
        isForSale: { type: "boolean" },
        mainImage: { type: ["string", "null"] },
        images: { type: "array", items: { type: "string" } },
        isActive: { type: "boolean" },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: ["string", "null"], format: "date-time" },
      },
    };
  }

  // Relations
  static get relationMappings() {
    return {
      units: {
        relation: BaseModel.HasManyRelation,
        modelClass: Unit,
        join: {
          from: "property.id",
          to: "unit.propertyId",
        },
      },
    };
  }
}

export { Property };
