// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/lambda.sqlite3' // from root
    },
    useNullAsDefault: true, // new configuration for SQLite
    debug: true // logs sql command in terminal
  },

};
