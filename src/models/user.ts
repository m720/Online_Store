import client from '../database';
import { Order } from './order';

export type User ={
    id: number;
    firstName: string;
    lastName: string;
    password: number;
};

export class UserStore {
    async index(): Promise <User[]>{
        try {
            const conn= await client.connect();
            const sql = 'SELECT * from users;'
            const result = await conn.query(sql)
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`could not get the users ${err}`);
        }
    }
    async show(id: number): Promise<User>{
        try {
            const conn= await client.connect();
            const sql = 'SELECT * from users WHERE id =($1);';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }
    async create (u: User): Promise<User>{
        try {
            //to do: hash& token
            const conn= await client.connect();
            const sql = 'INSERT INTO users(firstName, lastName, password) VALUES($1, $2, $3) RETURNING *;';
            const result = await conn.query(sql, [u.firstName, u.lastName, u.password]);
            const user = result.rows[0];
            conn.release();
            return user;
        } catch (err) {
            throw new Error(`could not create user. ERR: ${err}`);

        }
    }
    async delete(id: number): Promise<User>{
        try {
            const sql = 'DELETE FROM users WHERE id=($1);'
            const conn = await client.connect();
            const result = await client.query(sql, [id]);
            const pr =result.rows[0];
            conn.release();
            return pr;
        } catch (err) {
            throw new Error(`could not delete user. ${err}`);
        }
    }
    async update(u: User): Promise <User>{
        try {
            const conn= await client.connect();
            const sql = 'UPDATE users SET firstName=$1, lastName= $2, password=$3 WHERE id=$4 RETURNING *;';
            const result = await conn.query(sql, [u.firstName, u.lastName, u.password, u.id]);
            const user = result.rows[0];
            conn.release();
            return user;
        } catch (err) {
            throw new Error(`could not update user. ERR: ${err}`);

        }
    }
    async showUserOrders(id: number): Promise <Order[]>{
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders WHERE userId =$1'
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not find Orders ${err}`);
        }
    }
}