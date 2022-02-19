import client from '../database';

export type Product ={
    id: number;
    name: string;
    price: number;
    category: string[]
};

export class ProductStore {
    async index(): Promise <Product[]>{
        try {
            const conn= await client.connect();
            const sql = 'SELECT * from products;'
            const result = await conn.query(sql)
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`could not get the products ${err}`);
        }
    }
    async show(id: number): Promise<Product>{
        try {
            const conn= await client.connect();
            const sql = 'SELECT * from products WHERE id =($1);';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`Could not find product ${id}. Error: ${err}`);
        }
    }
    async create (p: Product): Promise<Product>{
        try {
            const conn= await client.connect();
            const sql = 'INSERT INTO products(name, price, category) VALUES($1, $2, $3) RETURNING *;';
            const result = await conn.query(sql, [p.name, p.price, p.category]);
            const pr = result.rows[0];
            conn.release();
            return pr;
        } catch (err) {
            throw new Error(`could not create product. ERR: ${err}`);

        }
    }
    async delete(id: number): Promise<Product>{
        try {
            const sql = 'DELETE FROM products WHERE id=($1);'
            const conn = await client.connect();
            const result = await client.query(sql, [id]);
            const pr =result.rows[0];
            conn.release();
            return pr;
        } catch (err) {
            throw new Error(`could not delete Product. ${err}`);
        }
    }
    async update(p: Product): Promise <Product>{
        try {
            const conn= await client.connect();
            const sql = 'UPDATE products SET name=$1, price= $2, category=$3 WHERE id=$4 RETURNING *;';
            const result = await conn.query(sql, [p.name, p.price, p.category, p.id]);
            const pr = result.rows[0];
            conn.release();
            return pr;
        } catch (err) {
            throw new Error(`could not update product. ERR: ${err}`);

        }
    }
}