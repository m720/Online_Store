"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * from orders;";
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`could not get the orders ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * from orders WHERE id =($1);";
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find order ${id}. Error: ${err}`);
            }
        });
    }
    create(o, productsIds, quantities) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "INSERT INTO orders(user_id, status) VALUES($1, $2) RETURNING *;";
                const result = yield conn.query(sql, [o.user_id, o.status]);
                const order = result.rows[0];
                const sql2 = "INSERT INTO Order_Products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *;";
                const result2 = yield conn.query(sql2, [
                    order.id,
                    productsIds,
                    quantities,
                ]);
                const orderProducts = result2.rows[0];
                const sql3 = "UPDATE orders SET orderproducts=$1 WHERE id=$2 RETURNING *;";
                yield conn.query(sql3, [orderProducts.id, order.id]);
                order.orderproducts = orderProducts.id;
                conn.release();
                return order;
            }
            catch (err) {
                throw new Error(`could not create Order. ERR: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "DELETE FROM Orders WHERE id=($1);";
                const conn = yield database_1.default.connect();
                yield database_1.default.query(sql, [id]);
                conn.release();
                return "Deleted";
            }
            catch (err) {
                throw new Error(`could not delete Order. ${err}`);
            }
        });
    }
    update(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            // this updates order status only
            try {
                const conn = yield database_1.default.connect();
                const sql = "UPDATE orders SET status= $1 WHERE id=$2 RETURNING *;";
                const result = yield conn.query(sql, [status, id]);
                const order = result.rows[0];
                conn.release();
                return order;
            }
            catch (err) {
                throw new Error(`could not update order. ERR: ${err}`);
            }
        });
    }
}
exports.OrderStore = OrderStore;
