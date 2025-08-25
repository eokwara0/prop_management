/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("user_type_activity", (table) => {
    table.increments("id").primary();

    table
      .integer("userTypeId")
      .notNullable()
      .references("id")
      .inTable("user_type")
      .onDelete("CASCADE");

    // Store multiple role IDs as an array
    table.specificType("roleIds", "integer[]").notNullable();

    table.timestamp("createdAt", { useTz: true }).defaultTo(knex.fn.now());
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("user_type_activity");
};
