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
const order_1 = require("../models/order");
const store = new order_1.OrderStore();
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield store.index();
        res.json(orders).end;
    }
    catch (err) {
        res.status(404);
        res.send(`could not find orders ${err}`);
    }
});
const show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderID = Number.parseInt(req.params.id);
        const order = yield store.show(orderID);
        res.send(order).end();
    }
    catch (err) {
        res.status(404);
        res.send(`could not find the order ${err}`);
    }
});
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = {
            id: -1,
            userId: req.body.userId,
            status: false,
            orderproducts: -1
        };
        const productsIds = [];
        req.body.productsIds.forEach((i) => {
            productsIds.push(Number.parseInt(i));
        });
        const quantities = [];
        req.body.quantities.forEach((i) => {
            quantities.push(Number.parseInt(i));
        });
        const createdOrder = yield store.create(order, productsIds, quantities);
        res.send(createdOrder).end();
    }
    catch (err) {
        res.status(400);
        res.send(`could not create the Order ${err}`);
    }
});
const destroy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield store.delete(Number.parseInt(req.params.id));
        res.send(deleted).end();
    }
    catch (err) {
        res.status(400);
        res.send(`could not delete the order ${err}`);
    }
});
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number.parseInt(req.params.id);
        const status = req.body.status;
        const updated = yield store.update(id, status);
        res.send(updated).end();
    }
    catch (err) {
        res.status(400);
        res.send(`could not update the Order ${err}`);
    }
});
const orderRoutes = express_1.default.Router();
orderRoutes.get('/:id', show);
orderRoutes.post('/', create);
orderRoutes.get('/', index);
orderRoutes.delete('/:id', destroy);
orderRoutes.put('/:id', update);
exports.default = orderRoutes;
function element(element, arg1) {
    throw new Error("Function not implemented.");
}
