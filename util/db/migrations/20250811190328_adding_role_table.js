/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("role", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable(); // e.g. "Property Manager", "Finance Auditor"
    table.string("description").notNullable();
    table.timestamp("createdAt", { useTz: true }).defaultTo(knex.fn.now());
    table.unique(["name",]); // prevents duplicate role names in same type
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("role");
};
