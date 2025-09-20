const { v4: uuidv4 } = require("uuid");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const users = await knex("user").select("id", "name");

  // get units joined to their property's userId (owner)
  const units = await knex("unit as u")
    .join("property as p", "u.propertyId", "p.id")
    .select("u.id as unitId", "p.ownerId as ownerId");

  console.log(units);

  // Insert tenants, each linked to a user
  const tenants = await knex("tenant")
    .insert([
      {
        id: uuidv4(),
        userId: users[0].id,
        emergencyContact: "Jane Johnson - (555) 123-4567",
        employmentStatus: "Full-time",
      },
      {
        id: uuidv4(),
        userId: users[0].id,
        emergencyContact: "Mary Smith - (555) 234-5678",
        employmentStatus: "Full-time",
      },
      {
        id: uuidv4(),
        userId: users[1].id,
        emergencyContact: "Tom Williams - (555) 345-6789",
        employmentStatus: "Self-employed",
      },
      {
        id: uuidv4(),
        userId: users[2].id,
        emergencyContact: "Sarah Brown - (555) 456-7890",
        employmentStatus: "Part-time",
      },
    ])
    .returning("*");

  // Helper function to add months
  const addMonths = (date, months) => {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  };

  const today = new Date();
  const sixMonthsAgo = addMonths(today, -6);
  const oneYearAgo = addMonths(today, -12);
  const threeMonthsAgo = addMonths(today, -3);
  const sixMonthsFromNow = addMonths(today, 6);
  const oneYearFromNow = addMonths(today, 12);
  const nineMonthsFromNow = addMonths(today, 9);

  // lease configs just describe terms + which tenant to use
  const leaseConfigs = [
    {
      tenantIndex: 0,
      startDate: oneYearAgo,
      endDate: oneYearFromNow,
      monthlyRent: 1500,
      status: "active",
    },
    {
      tenantIndex: 1,
      startDate: sixMonthsAgo,
      endDate: sixMonthsFromNow,
      monthlyRent: 1600,
      status: "active",
    },
    {
      tenantIndex: 2,
      startDate: threeMonthsAgo,
      endDate: nineMonthsFromNow,
      monthlyRent: 1750,
      status: "active",
    },
    {
      tenantIndex: 3,
      startDate: oneYearAgo,
      endDate: sixMonthsFromNow,
      monthlyRent: 2200,
      status: "expired",
    },
    {
      tenantIndex: 0,
      startDate: threeMonthsAgo,
      endDate: nineMonthsFromNow,
      monthlyRent: 2500,
      status: "active",
    },
    {
      tenantIndex: 1,
      startDate: sixMonthsAgo,
      endDate: sixMonthsFromNow,
      monthlyRent: 3500,
      status: "active",
    },
    {
      tenantIndex: 2,
      startDate: oneYearAgo,
      endDate: oneYearFromNow,
      monthlyRent: 4200,
      status: "active",
    },
  ];

  // build leases dynamically
  const leasesToInsert = [];

  leaseConfigs.forEach((cfg) => {
    const tenant = tenants[cfg.tenantIndex];

    // find a unit owned by the same user as tenant.userId
    const availableUnit = units.find((u) => u.ownerId === tenant.userId);

    if (availableUnit) {
      leasesToInsert.push({
        id: uuidv4(),
        unitId: availableUnit.unitId,
        tenantId: tenant.id,
        startDate: cfg.startDate,
        endDate: cfg.endDate,
        monthlyRent: cfg.monthlyRent,
        status: cfg.status,
      });
    }
  });

  const leases = await knex("lease").insert(leasesToInsert).returning("*");

  return { tenants, leases };
};
