// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 't_db',
      user:     'postgres',
      password: '04041975'
    },
    pool: {
      min: 2,
      max: 10
    },
     migrations: {
      tableName: 'prop_migrations',
      directory: './util/db/migrations',
      getNewMigrationName: (m) => {
        return `prop_migration_${new Date().toISOString().replace(/[-:.]/g, '')}_${m}.ts`;
      },
      extension : 'js'
    },
    seeds : {
      directory: './util/db/seeds',
      extension: 'js',
      loadExtensions: ['.js', '.ts'],
    }
  },

  staging: {
    client: 'pg',
    connection: {
      database: 't_db',
      user:     'postgres',
      password: '04041975'
    },
    pool: {
      min: 2,
      max: 10
    },
     migrations: {
      tableName: 'prop_migrations',
      directory: './util/db/migrations',
      getNewMigrationName: (m) => {
        return `prop_migration_${new Date().toISOString().replace(/[-:.]/g, '')}_${m}.ts`;
      },
      extension : 'js'
    },
    seeds : {
      directory: './util/db/seeds',
      extension: 'js'
    }
  },

  production: {
    client: 'pg',
    connection: {
      database: 't_db',
      user:     'postgres',
      password: '04041975'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'prop_migrations',
      directory: './util/db/migrations',
      getNewMigrationName: (m) => {
        return `prop_migration_${new Date().toISOString().replace(/[-:.]/g, '')}_${m}.ts`;
      },
      extension : 'js'
    },
    seeds : {
      directory: './util/db/seeds',
      extension: 'js'
    }
  }

};
