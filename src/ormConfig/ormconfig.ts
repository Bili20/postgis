import { DataSourceOptions } from "typeorm";

const TypeOrmConfig: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5433,
  username: "user",
  password: "password",
  database: "geolocalizacao",
  entities: ["./src/entities/*.ts"],
  migrations: ["./src/migrations/*.ts"],
  migrationsRun: true,
};

export default TypeOrmConfig;
