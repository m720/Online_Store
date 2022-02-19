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
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const product_1 = require("../models/product");
// const app = express();
// app.use(bodyParser.json());
const store = new product_1.ProductStore();
const urlencodedParser = body_parser_1.default.urlencoded({ extended: false });
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("product index called");
    const products = yield store.index();
    res.json(products).end;
});
const show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = Number.parseInt(req.params.id);
    const product = yield store.show(productId);
    res.send(product).end();
});
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('create methode called !!!!!!!!!!!!!!');
    console.log(req.body);
    console.log(req);
    console.log(`name: ${req.body.name}`);
    console.log(`price: ${req.body.price}`);
    console.log(`category: ${req.body.category}`);
    const product = {
        id: -1,
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    };
    const createdProduct = yield store.create(product);
    res.send(createdProduct).end();
});
const destroy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("destroy called");
        console.log(req.params.id);
        const deleted = yield store.delete(Number.parseInt(req.params.id));
        res.send(deleted).end();
    }
    catch (err) {
        res.status(400);
        res.send(`could not delete the product ${err}`);
    }
});
const productRoutes = express_1.default.Router();
productRoutes.get('/:id', show);
productRoutes.post('/', create);
productRoutes.get('/', index);
productRoutes.delete('/:id', destroy);
exports.default = productRoutes;
