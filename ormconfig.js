module.exports = [{
  "name": process.env.DB_CONNECTION,
  "type": process.env.DB_TYPE,
  "url": process.env.DB_URL, 
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