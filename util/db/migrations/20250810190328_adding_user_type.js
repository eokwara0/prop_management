/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("user_type", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable().unique(); // Admin, Manager, Tenant, Finance
    table.timestamp("createdAt", { useTz: true }).defaultTo(knex.fn.now());
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("user_type");
};
