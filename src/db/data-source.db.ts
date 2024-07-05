import dotenv from "dotenv";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

dotenv.config();

const dataSource = new DataSource({
	type: "postgres",
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	extra: { max: 5, min: 2 },
	synchronize: false,
	logging: true,
	namingStrategy: new SnakeNamingStrategy(),
	entities: ["dist/src/entity/*.js"],
	migrations: ["dist/src/db/migrations/*.js"],
});

export default dataSource;
