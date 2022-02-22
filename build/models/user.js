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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const pepper = (_a = process.env.BCRYPT_PASSWORD) !== null && _a !== void 0 ? _a : 'random_pass';
const saltRounds = (_b = process.env.SALT_ROUNDS) !== null && _b !== void 0 ? _b : '10';
const token_secret = (_c = process.env.TOKEN_SECRET) !== null && _c !== void 0 ? _c : 'randomtoken';
class UserStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * from users;';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`could not get the users ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * from users WHERE id =($1);';
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find user ${id}. Error: ${err}`);
            }
        });
    }
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //to do: hash& token
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO users(firstName, lastName, password) VALUES($1, $2, $3) RETURNING *;';
                const hash = bcrypt_1.default.hashSync(u.password + pepper, parseInt(saltRounds));
                const result = yield conn.query(sql, [u.firstName, u.lastName, hash]);
                const user = result.rows[0];
                //Generating JWT token
                const token = jsonwebtoken_1.default.sign(user, token_secret);
                conn.release();
                return token;
            }
            catch (err) {
                throw new Error(`could not create user. ERR: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM users WHERE id=($1);';
                const conn = yield database_1.default.connect();
                const result = yield database_1.default.query(sql, [id]);
                const pr = result.rows[0];
                conn.release();
                return pr;
            }
            catch (err) {
                throw new Error(`could not delete user. ${err}`);
            }
        });
    }
    update(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'UPDATE users SET firstName=$1, lastName= $2, password=$3 WHERE id=$4 RETURNING *;';
                const result = yield conn.query(sql, [u.firstName, u.lastName, u.password, u.id]);
                const user = result.rows[0];
                conn.release();
                return user;
            }
            catch (err) {
                throw new Error(`could not update user. ERR: ${err}`);
            }
        });
    }
    showUserOrders(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders WHERE userId =$1';
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not find Orders ${err}`);
            }
        });
    }
    authenticate(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT password from users where id = $1';
                const result = yield conn.query(sql, [id]);
                conn.release();
                if (result.rows.length) {
                    const user = result.rows[0];
                    if (bcrypt_1.default.compareSync(password + pepper, user.password)) {
                        return user;
                    }
                }
                throw new Error('user not found');
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        });
    }
}
exports.UserStore = UserStore;
