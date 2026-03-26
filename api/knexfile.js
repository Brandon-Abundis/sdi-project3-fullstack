// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'postgres',
    connection: process.env.DATABASE_URL || {
      host: '127.0.0.1',
      port: 5432,
      user: 'postgres',
      password: 'docker',
      database: 'countries'
    }
  }
};