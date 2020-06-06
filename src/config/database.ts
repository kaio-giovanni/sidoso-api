const dbConfig: any = {
    name: "default_connection",
    type: process.env.DB_DIALECT || "mysql",
    host: process.env.HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306", 10),
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "",
    entities: ["../models/*.ts"],
    migrations: ["../migrations/*.ts"],
    cli: {
        migrationsDir: "../migrations"
    }
}

export default dbConfig;