import { BaseModel } from "./base/base.model";
import { Unit } from "./unit.model";


class Property extends BaseModel {
  static get tableName() {
    return "property";
  }

  static get idColumn() {
    return "id";
  }



  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "address", "ownerId"],

      properties: {
        id: { type: "string", format: "uuid" },
        name: { type: "string", minLength: 1 },
        address: { type: "string", minLength: 1 },
        ownerId: { type: "string", format: "uuid" },
        createdAt: { type: "string", format: "date-time" },
      },
    };
  }

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

export { Property }