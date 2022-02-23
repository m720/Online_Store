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
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * from products;";
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`could not get the products ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * from products WHERE id =($1);";
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find product ${id}. Error: ${err}`);
            }
        });
    }
    create(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "INSERT INTO products(name, price, category) VALUES($1, $2, $3) RETURNING *;";
                const result = yield conn.query(sql, [p.name, p.price, p.category]);
                const pr = result.rows[0];
                conn.release();
                return pr;
            }
            catch (err) {
                throw new Error(`could not create product. ERR: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "DELETE FROM products WHERE id=($1);";
                const conn = yield database_1.default.connect();
                yield database_1.default.query(sql, [id]);
                conn.release();
                return "Deleted";
            }
            catch (err) {
                throw new Error(`could not delete Product. ${err}`);
            }
        });
    }
    update(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "UPDATE products SET name=$1, price= $2, category=$3 WHERE id=$4 RETURNING *;";
                const result = yield conn.query(sql, [p.name, p.price, p.category, p.id]);
                const pr = result.rows[0];
                conn.release();
                return pr;
            }
            catch (err) {
                throw new Error(`could not update product. ERR: ${err}`);
            }
        });
    }
}
exports.ProductStore = ProductStore;
