"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_1 = __importDefault(require("./handlers/books"));
const products_1 = __importDefault(require("./handlers/products"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const urlencodedParser = body_parser_1.default.urlencoded({ extended: false });
const jsonParser = body_parser_1.default.json();
app.use(urlencodedParser);
app.use(jsonParser);
app.use('/books', books_1.default);
app.use('/products', products_1.default);
app.listen(3000);
console.log("app is running on http://localhost:3000");
