"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = __importDefault(require("./handlers/products"));
const user_1 = __importDefault(require("./handlers/user"));
const order_1 = __importDefault(require("./handlers/order"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const urlencodedParser = body_parser_1.default.urlencoded({ extended: false });
const jsonParser = body_parser_1.default.json();
app.use(urlencodedParser);
app.use(jsonParser);
app.use("/products", products_1.default);
app.use("/users", user_1.default);
app.use("/orders", order_1.default);
app.use("/", (req, res, next) => {
    res.status(200).json({ name: "hello" });
    res.end();
});
app.listen(3000);
console.log("app is running on http://localhost:3000");
exports.default = app;
