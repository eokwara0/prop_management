/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('user').del();

  // Inserts sample users
  await knex('user').insert([
    {
      id: knex.fn.uuid(),
      name: 'Alice',
      email: 'alice@example.com',
      emailVerified: null,
      image: null,
    },
    {
      id: knex.fn.uuid(),
      name: 'Bob',
      email: 'bob@example.com',
      emailVerified: null,
      image: null,
    },
  ]);
};
