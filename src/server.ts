import express from "express";
import "reflect-metadata";

const app = express();
const port = 3005;
app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`);
});
