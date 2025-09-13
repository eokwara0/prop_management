/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  // property table
  await knex.schema.createTable("property", (table) => {
    table.text("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.text("name").notNullable();
    table.text("address").notNullable();
    table
      .text("ownerId")
      .notNullable()
      .references("id")
      .inTable("user")
      .onDelete("CASCADE"); // property belongs to a user (owner/admin)
    table.timestamp("createdAt", { useTz: true }).defaultTo(knex.fn.now());
  });

  // unit table
  await knex.schema.createTable("unit", (table) => {
    table.text("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table
      .text("propertyId")
      .notNullable()
      .references("id")
      .inTable("property")
      .onDelete("CASCADE");
    table.string("unitNumber").notNullable();
    table.decimal("rentAmount", 10, 2).notNullable();
    table.string("status").defaultTo("vacant"); // vacant, occupied, maintenance
    table.timestamp("createdAt", { useTz: true }).defaultTo(knex.fn.now());
  });

  // tenant table (extra tenant info)
  await knex.schema.createTable("tenant", (table) => {
    table.text("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table
      .text("userId")
      .notNullable()
      .unique()
      .references("id")
      .inTable("user")
      .onDelete("CASCADE"); // each tenant is linked to a user
    table.string("emergencyContact");
    table.string("employmentStatus");
    table.timestamp("createdAt", { useTz: true }).defaultTo(knex.fn.now());
  });

  // lease table
  await knex.schema.createTable("lease", (table) => {
    table.text("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table
      .text("unitId")
      .notNullable()
      .references("id")
      .inTable("unit")
      .onDelete("CASCADE");
    table
      .text("tenantId")
      .notNullable()
      .references("id")
      .inTable("tenant")
      .onDelete("CASCADE"); // tenant must exist in tenant table
    table.date("startDate").notNullable();
    table.date("endDate").notNullable();
    table.decimal("monthlyRent", 10, 2).notNullable();
    table.string("status").defaultTo("active");
    table.timestamp("createdAt", { useTz: true }).defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("lease");
  await knex.schema.dropTableIfExists("tenant");
  await knex.schema.dropTableIfExists("unit");
  await knex.schema.dropTableIfExists("property");
};
