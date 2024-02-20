import { Request, Response } from "express";
import { AppDataSource } from "../server";

class userController {
  static async createUser(req: Request, res: Response) {
    try {
      const { name, latitude, longitude } = req.body;

      await AppDataSource.query(
        "INSERT INTO users (name, location) VALUES ($1, ST_SetSRID(ST_MakePoint($2, $3), 4326))",
        [name, latitude, longitude]
      );
      res.json({ message: "User registrado" });
    } catch (e) {
      console.log(e);
    }
  }

  static async converteBinario(req: Request, res: Response) {
    try {
      const { binario } = req.body;

      const [valor] = await AppDataSource.query("SELECT ST_AsText($1)", [
        binario,
      ]);
      console.log(valor);
      res.json({ message: "deu boa" });
    } catch (e) {
      console.log(e);
    }
  }

  static async findDistancesUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const distances = await AppDataSource.query(
        `SELECT name, ST_Distance(users.location, eu.location) AS distance
    FROM users, LATERAL(select id, location FROM users WHERE id=$1) AS eu
    WHERE users.id <> eu.id ORDER BY distance
    `,
        [id]
      );

      res.json({ message: "success", distances });
    } catch (e) {
      console.log(e);
    }
  }

  static async findDistancesUserFromRadius(req: Request, res: Response) {
    const { id, radius } = req.params;

    const distances = await AppDataSource.query(
      `SELECT name, ST_Distance(users.location, eu.location) AS distance
    FROM users, LATERAL(select id, location FROM users WHERE id=$1) AS eu
    WHERE users.id <> eu.id 
    AND ST_Distance(users.location, eu.location) < $2
    ORDER BY distance`,
      [id, radius]
    );

    res.json({ message: "success", distances });
  }
}
export default userController;
