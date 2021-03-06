import client from "../database";

export type Order = {
  id: number;
  user_id: number;
  status: Boolean;
  orderproducts: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * from orders;";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`could not get the orders ${err}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * from orders WHERE id =($1);";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async create(
    o: Order,
    productsIds: number[],
    quantities: number[]
  ): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO orders(user_id, status) VALUES($1, $2) RETURNING *;";
      const result = await conn.query(sql, [o.user_id, o.status]);
      const order = result.rows[0];
      const sql2 =
        "INSERT INTO Order_Products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *;";
      const result2 = await conn.query(sql2, [
        order.id,
        productsIds,
        quantities,
      ]);
      const orderProducts = result2.rows[0];
      const sql3 =
        "UPDATE orders SET orderproducts=$1 WHERE id=$2 RETURNING *;";
      await conn.query(sql3, [orderProducts.id, order.id]);
      order.orderproducts = orderProducts.id;
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`could not create Order. ERR: ${err}`);
    }
  }

  async delete(id: number): Promise<string> {
    try {
      const sql = "DELETE FROM Orders WHERE id=($1);";
      const conn = await client.connect();
      await client.query(sql, [id]);
      conn.release();
      return "Deleted";
    } catch (err) {
      throw new Error(`could not delete Order. ${err}`);
    }
  }

  async update(id: number, status: boolean): Promise<Order> {
    // this updates order status only
    try {
      const conn = await client.connect();
      const sql = "UPDATE orders SET status= $1 WHERE id=$2 RETURNING *;";
      const result = await conn.query(sql, [status, id]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`could not update order. ERR: ${err}`);
    }
  }
}
