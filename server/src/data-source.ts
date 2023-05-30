import * as dotenv from "dotenv"
import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

dotenv.config({ path: ".env" });

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
