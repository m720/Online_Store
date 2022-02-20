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
const express_1 = __importDefault(require("express"));
const product_1 = require("../models/product");
const store = new product_1.ProductStore();
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield store.index();
        res.json(products).end;
    }
    catch (err) {
        res.status(400);
        res.send(`could not find products ${err}`);
    }
});
const show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = Number.parseInt(req.params.id);
        const product = yield store.show(productId);
        res.send(product).end();
    }
    catch (err) {
        res.status(400);
        res.send(`could not find the product ${err}`);
    }
});
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = {
            id: -1,
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        };
        const createdProduct = yield store.create(product);
        res.send(createdProduct).end();
    }
    catch (err) {
        res.status(400);
        res.send(`could not create the product ${err}`);
    }
});
const destroy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield store.delete(Number.parseInt(req.params.id));
        res.send(deleted).end();
    }
    catch (err) {
        res.status(400);
        res.send(`could not delete the product ${err}`);
    }
});
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = {
            id: Number.parseInt(req.params.id),
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        };
        const updated = yield store.update(product);
        res.send(updated).end();
    }
    catch (err) {
        res.status(400);
        res.send(`could not update the product ${err}`);
    }
});
const productRoutes = express_1.default.Router();
productRoutes.get('/:id', show);
productRoutes.post('/', create);
productRoutes.get('/', index);
productRoutes.delete('/:id', destroy);
productRoutes.put('/:id', update);
exports.default = productRoutes;
