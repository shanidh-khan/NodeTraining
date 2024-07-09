import dotenv from "dotenv";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

dotenv.config();

const dataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "postgres",
	password: "password",
	database: "training",
	extra: { max: 5, min: 2 },
	synchronize: false,
	logging: true,
	namingStrategy: new SnakeNamingStrategy(),
	entities: ["dist/src/entity/*.js"],
	migrations: ["dist/src/db/migrations/*.js"],
});

export default dataSource;
