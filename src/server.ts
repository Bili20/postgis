import express from "express";
import "reflect-metadata";
import { DataSource } from "typeorm";
import TypeOrmConfig from "./ormConfig/ormconfig";
import routes from "./routes";

export const AppDataSource = new DataSource(TypeOrmConfig);

AppDataSource.initialize()
  .then(() => {
    console.log("Banco conectado");
  })
  .catch((e) => console.log(e));

const app = express();
routes(app);
const port = 3005;
app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`);
});
export default app;
