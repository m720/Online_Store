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
exports.BookStore = void 0;
const database_1 = __importDefault(require("../database"));
class BookStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * from books;';
                const result = yield conn.query(sql);
                console.log(result.rows);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`could not get books. ERR: ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * from books WHERE id=($1);';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find book ${id}. Error: ${err}`);
            }
        });
    }
    create(b) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO books (title, author, total_pages, type, summary) VALUES ($1, $2, $3, $4, $5) RETURNING *;';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [b.title, b.author, b.total_pages, b.type, b.summary]);
                const book = result.rows[0];
                console.log(book);
                conn.release();
                return book;
            }
            catch (err) {
                throw new Error(`could not create book. ERR: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM books WHERE id=($1);';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                const book = result.rows[0];
                conn.release();
                return book;
            }
            catch (err) {
                throw new Error(`could delete the bok ${err}`);
            }
        });
    }
}
exports.BookStore = BookStore;
