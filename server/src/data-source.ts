import * as dotenv from "dotenv"
import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Listing } from "./entity/Listing";

dotenv.config({ path: ".env" });

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: false,
    entities: [User, Listing],
    migrations: [],
    subscribers: [],
})
