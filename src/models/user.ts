import client from "../database";
import { Order } from "./order";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export type User = {
  id: number;
  firstname: string;
  lastname: string;
  password: string;
};

const pepper = process.env.BCRYPT_PASSWORD ?? "random_pass";
const saltRounds = process.env.SALT_ROUNDS ?? "10";
const tokenSecret = process.env.TOKEN_SECRET ?? "randomtoken";

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * from users;";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`could not get the users ${err}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * from users WHERE id =($1);";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<String> {
    try {
      // to do: hash& token
      const conn = await client.connect();
      const sql =
        "INSERT INTO users(firstname, lastname, password) VALUES($1, $2, $3) RETURNING *;";
      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));
      const result = await conn.query(sql, [u.firstname, u.lastname, hash]);
      const user = result.rows[0];

      // Generating JWT token
      const token = jwt.sign(user, tokenSecret);
      conn.release();
      return token;
    } catch (err) {
      throw new Error(`could not create user. ERR: ${err}`);
    }
  }

  async delete(id: number): Promise<String> {
    try {
      const sql = "DELETE FROM users WHERE id=($1);";
      const conn = await client.connect();
      await client.query(sql, [id]);
      conn.release();
      return "Deleted";
    } catch (err) {
      throw new Error(`could not delete user. ${err}`);
    }
  }

  async update(u: User): Promise<User> {
    try {
      const conn = await client.connect();
      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));
      const sql =
        "UPDATE users SET firstname=$1, lastname= $2, password=$3 WHERE id=$4 RETURNING *;";
      const result = await conn.query(sql, [
        u.firstname,
        u.lastname,
        hash,
        u.id,
      ]);
      const user = result.rows[0];
      conn.release();

      return user;
    } catch (err) {
      throw new Error(`could not update user. ERR: ${err}`);
    }
  }

  async showUserOrders(id: number): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders WHERE user_id =$1";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find Orders ${err}`);
    }
  }

  async authenticate(id: number, password: string): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = "SELECT password from users where id = $1";
      const result = await conn.query(sql, [id]);
      conn.release();
      if (result.rows.length) {
        const user: User = result.rows[0];
        if (bcrypt.compareSync(password + pepper, user.password)) {
          return user;
        }
      }
      throw new Error("user not found");
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
