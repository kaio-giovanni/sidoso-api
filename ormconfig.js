module.exports = [{
  "name": process.env.DB_CONNECTION,
  "type": process.env.DB_TYPE,
  "host": process.env.DB_HOST, 
  "port": process.env.DB_PORT,
  "username": process.env.DB_USERNAME,
  "password": process.env.DB_PASSWORD,
  "database": process.env.DB_NAME,
  "entities": [
    "src/models/**/*.ts"
  ],
  "migrations": [
    "src/database/migrations/**/*.ts"
  ],
  "cli": {
    "migrationsDir": "src/database/migrations"
  },
  "synchronize": false
}]