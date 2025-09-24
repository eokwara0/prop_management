import { Model } from "objection";
import Knex from "knex";

const knex = Knex({
  client: "pg",
  connection: {
    host: "localhost",
    connectionString: process.env.DATABASE_URL || "postgres://postgres:04041975@localhost:5432/t_db",
  },
    pool: { min: 10, max: 20 },
});

Model.knex(knex);

export default knex;