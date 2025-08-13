/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("user", (table) => {
    table.text("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.text("name");
    table.text("email").unique();
    table.timestamp("emailVerified");
    table.text("image");
  });

  // accounts table
  await knex.schema.createTable("account", (table) => {
    table
      .text("userId")
      .notNullable()
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");
    table.text("type").notNullable(); // AdapterAccountType
    table.text("provider").notNullable();
    table.text("providerAccountId").notNullable();
    table.text("refresh_token");
    table.text("access_token");
    table.integer("expires_at");
    table.text("token_type");
    table.text("scope");
    table.text("id_token");
    table.text("session_state");

    table.primary(["provider", "providerAccountId"]);
  });

  // sessions table
  await knex.schema.createTable("session", (table) => {
    table.text("sessionToken").primary();
    table
      .text("userId")
      .notNullable()
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");
    table.timestamp("expires").notNullable();
  });

  // verificationTokens table
  await knex.schema.createTable("verificationToken", (table) => {
    table.text("identifier").notNullable();
    table.text("token").notNullable();
    table.timestamp("expires").notNullable();

    table.primary(["identifier", "token"]);
  });

  // authenticators table
  await knex.schema.createTable("authenticator", (table) => {
    table.text("credentialID").notNullable().unique();
    table
      .text("userId")
      .notNullable()
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");
    table.text("providerAccountId").notNullable();
    table.text("credentialPublicKey").notNullable();
    table.integer("counter").notNullable();
    table.text("credentialDeviceType").notNullable();
    table.boolean("credentialBackedUp").notNullable();
    table.text("transports");

    table.primary(["userId", "credentialID"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("authenticator");
  await knex.schema.dropTableIfExists("verificationToken");
  await knex.schema.dropTableIfExists("session");
  await knex.schema.dropTableIfExists("account");
  await knex.schema.dropTableIfExists("user");
};
