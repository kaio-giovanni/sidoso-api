module.exports = [{
  "name": process.env.DB_CONNECTION,
  "type": process.env.DB_TYPE,
  "host": process.env.DB_HOST, 
  "port": process.env.DB_PORT,
  "username": process.env.DB_USERNAME,
  "password": process.env.DB_PASSWORD,
  "database": process.env.DB_NAME,
  "entities": [
    process.env.ENVIRONMENT === "developer" ?
      "src/models/**/*.ts":
      "dist/models/**/*.js"
  ],
  "migrations": [
    process.env.ENVIRONMENT === "developer" ?
      "src/database/migrations/**/*.ts" :
      "dist/database/migrations/**/*.js"
  ],
  "cli": {
    "migrationsDir": process.env.ENVIRONMENT === "developer" ?
      "src/database/migrations" :
      "dist/database/migrations"
  },
  "synchronize": false
}]