module.exports = {
    type: "sqlite",
    database: "./src/database/db.sqlite",
    migrations: [
        "./src/database/migrations/*.ts"
    ],
    cli: {
        migrationsDir: "./src/database/migrations"
    }
}