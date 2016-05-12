// Update with your config settings.
// Tells program everything it needs to connect to our db.
// passwords etc.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      filename: 'middleendian_demo'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    // process is available in every node.js file
    // put secrets in the environment and manage them
    // hashi, corpse, and vault can do that for us.
    pool: { // pool: use same cnxn for multiple instances at once that
            // are running at the same time.
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
