"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_TEST_NAME, ENV } = process.env;
const client = new pg_1.Pool({
    host: DB_HOST,
    user: DB_USER,
    database: (ENV === 'dev') ? DB_NAME : DB_TEST_NAME,
    password: DB_PASS
});
exports.default = client;
