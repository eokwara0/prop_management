/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("user_pass", (table) => {
    table
      .text("userId")
      .notNullable()
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");
    table
      .integer("userTypeId")
      .notNullable()
      .references("id")
      .inTable("user_type")
      .onDelete("CASCADE");

    table.text("passwordHash").notNullable();
    table.text("passwordSalt"); // optional, depending on your hashing strategy

    table.boolean("isActive").defaultTo(true);
    table.timestamp("createdAt", { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp("lastUsedAt", { useTz: true });

    table.index(["userId"], "idx_userPassword_userId");
    table.primary(["userId"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("user_pass");
};
