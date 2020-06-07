const dbConfig: any = {
    name: "default_connection",
    type: process.env.TYPEORM_CONNECTION || "mysql",
    host: process.env.TYPEORM_HOST || "localhost",
    port: parseInt(process.env.TYPEORM_PORT || "3306", 10),
    username: process.env.TYPEORM_USERNAME || "",
    password: process.env.TYPEORM_PASSWORD || "",
    database: process.env.TYPEORM_DATABASE || "",
    synchronize: process.env.TYPEORM_SYNCHRONIZE || false
}

export default dbConfig;
