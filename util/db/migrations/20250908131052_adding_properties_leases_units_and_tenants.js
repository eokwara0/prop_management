/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  // property table
  await knex.schema.createTable("property", (table) => {
    // Primary key
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    // Core property details
    table.string("name").notNullable();
    table.text("description");
    table.string("address").nullable();
    table.string("city").nullable();
    table.string("state").nullable();
    table.string("postalCode").nullable();
    table.string("country").notNullable().defaultTo("South Africa");
    // Property type (apartment, house, commercial, etc.)
    table.string("streetName").nullable().defaultTo("");
    table.integer("streetNumber").nullable().defaultTo(10);
    table.string("suburb").nullable().defaultTo("suburb");
    table
      .enum("type", [
        "house",
        "apartment",
        "townhouse",
        "condo",
        "duplex",
        "commercial",
        "land",
      ])
      .notNullable().defaultTo("house");
    // Size and features
    table.integer("bedrooms").defaultTo(0);
    table.integer("bathrooms").defaultTo(0);
    table.decimal("squareFeet").nullable();
    table.boolean("hasParking").defaultTo(false);
    table.boolean("isFurnished").defaultTo(false);
    // Ownership
    table
      .text("ownerId")
      .notNullable()
      .references("id")
      .inTable("user")
      .onDelete("CASCADE"); // property belongs to a user
    // Pricing / valuation (optional, depending on your system)
    table.decimal("price", 12, 2).nullable();
    table.boolean("isForRent").defaultTo(true);
    table.boolean("isForSale").defaultTo(false);
    // Main Image
    table.text("mainImage").nullable();
    // Media
    table.jsonb("images").defaultTo("[]"); // store property images as array of URLs
    // Status
    table.boolean("isActive").defaultTo(true);
    // Timestamps
    table.timestamp("createdAt", { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp("updatedAt", { useTz: true }).nullable();
  });
  // Units
  await knex.schema.createTable("unit", (table) => {
  // Primary key
  table.text("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
  // Link to property
  table.uuid("propertyId")
    .notNullable()
    .references("id")
    .inTable("property")
    .onDelete("CASCADE");
  // Unit info
  table.string("unitNumber").notNullable(); // e.g., "101", "2B"
  table.integer("floor").defaultTo(1);
  table.integer("bedrooms").defaultTo(0);
  table.integer("bathrooms").defaultTo(0);
  table.decimal("squareMeters", 10, 2).nullable();
  table.boolean("isFurnished").defaultTo(false);
  table.boolean("petFriendly").defaultTo(false);
  table.boolean("hasBalcony").defaultTo(false);
  // Rent / status
  table.decimal("rentAmount", 10, 2).notNullable();
  table.string("currency").defaultTo("ZAR");
  table.enum("status", [
        "vacant",
        "occupied",
        "maintenance",
      ]).defaultTo("vacant") // vacant, occupied, maintenance
  // Tenants array
  table.specificType("tenants", "text[]").defaultTo("{}"); 
  // stores tenant IDs (UUIDs) as an array
  // Lease info (if needed at unit level)
  table.date("availableFrom").nullable();
  // Metadata
  table.timestamp("createdAt", { useTz: true }).defaultTo(knex.fn.now());
  table.timestamp("updatedAt", { useTz: true }).nullable();
});

  // tenant table (extra tenant info)
  await knex.schema.createTable("tenant", (table) => {
    // Primary key
    table.text("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.text("userId").notNullable().references("id").inTable("user");

    // Personal info
    table.string("firstName").notNullable();
    table.string("lastName").notNullable();
    table.string("email").unique().notNullable();
    table.string("phoneNumber").nullable();
    table.date("dateOfBirth").nullable();
    table.text("idNumber").nullable(); // national ID or passport number

    // Address info
    table.string("currentAddress").nullable();
    table.string("city").nullable();
    table.string("postalCode").nullable();
    table.string("country").defaultTo("South Africa");

    // Lease / unit info
    table
      .text("unitId")
      .notNullable()
      .references("id")
      .inTable("unit")
      .onDelete("CASCADE");
    table.decimal("monthlyRent", 10, 2).nullable();
    table.boolean("isActive").defaultTo(true); // currently renting?

    // Emergency contact (optional)
    table.string("emergencyContactName").nullable();
    table.string("emergencyContactPhone").nullable();

    // Metadata
    table.timestamp("createdAt", { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp("updatedAt", { useTz: true }).nullable();
  });

  // lease table
  await knex.schema.createTable("lease", (table) => {
    // Primary key
    table.text("id").primary().defaultTo(knex.raw("gen_random_uuid()"));

    // Relationships
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
      .onDelete("CASCADE");

    // Lease details
    table.date("startDate").notNullable();
    table.date("endDate").nullable(); // optional if open-ended lease
    table.decimal("monthlyRent", 10, 2).notNullable();
    table.string("currency").defaultTo("ZAR");
    table.decimal("depositAmount", 10, 2).nullable();
    table.string("paymentFrequency").defaultTo("monthly"); // monthly, weekly, yearly

    // Status
    table.string("status").defaultTo("active"); // active, terminated, pending

    // Terms & notes
    table.text("notes").nullable();

    // Metadata
    table.timestamp("createdAt", { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp("updatedAt", { useTz: true }).nullable();
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
