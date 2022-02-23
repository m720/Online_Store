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
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_validator_1 = require("../validators/user.validator");
const store = new user_1.UserStore();
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield store.index();
        res.json(users);
    }
    catch (err) {
        res.status(404);
        res.send(`could not find users ${err}`);
    }
});
const show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = Number.parseInt(req.params.id);
        const user = yield store.show(userID);
        res.send(user).end();
    }
    catch (err) {
        res.status(404);
        res.send(`could not find the User ${err}`);
    }
});
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // to-do hash& tokens
    try {
        const user = {
            id: -1,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
        };
        const createdUserToken = yield store.create(user);
        res.send(createdUserToken);
    }
    catch (err) {
        res.status(400);
        res.send(`could not create the user ${err}`);
    }
});
const destroy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield store.delete(Number.parseInt(req.params.id));
        res.send(deleted).end();
    }
    catch (err) {
        res.status(400);
        res.send(`could not delete the user ${err}`);
    }
});
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            id: req.body.id,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
        };
        const updated = yield store.update(user);
        res.send(updated).end();
    }
    catch (err) {
        res.status(400);
        res.send(`could not update the user ${err}`);
    }
});
const showUserOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const Orders = yield store.showUserOrders(Number.parseInt(id));
        res.send(Orders).end();
    }
    catch (err) {
        res.status(404);
        res.send(`could not find Orders ${err}`);
    }
});
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number.parseInt(req.body.id);
        const password = req.body.password;
        const user = yield store.authenticate(id, password);
        res.send(user).end();
    }
    catch (err) {
        res.status(404);
        res.send(`${err}`);
    }
});
const VerifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const authorizationHeader = (_a = req.headers.authorization) !== null && _a !== void 0 ? _a : "";
        const token = authorizationHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, (_b = process.env.TOKEN_SECRET) !== null && _b !== void 0 ? _b : "randomtoken");
        next();
    }
    catch (err) {
        res.status(401);
        res.json(`invalid token ${err}`);
    }
});
const userRoutes = express_1.default.Router();
userRoutes.get("/:id", VerifyToken, show);
userRoutes.post("/", user_validator_1.VCreateUser, create);
userRoutes.get("/", VerifyToken, index);
userRoutes.delete("/:id", VerifyToken, destroy);
userRoutes.put("/:id", VerifyToken, user_validator_1.VCreateUser, update);
userRoutes.get("/:id/orders", VerifyToken, showUserOrders);
userRoutes.post("/authenticate", authenticate);
exports.default = userRoutes;
