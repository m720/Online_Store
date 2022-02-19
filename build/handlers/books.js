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
Object.defineProperty(exports, "__esModule", { value: true });
const book_1 = require("../models/book");
const store = new book_1.BookStore();
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield store.index;
    res.json(books).end;
});
const show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield store.show(req.body.id);
    res.json(book).end();
});
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = {
            title: req.body.type,
            author: req.body.author,
            total_pages: req.body.total_pages,
            type: req.body.type,
            summary: req.body.summary,
            id: ''
        };
        console.log(book);
        const result = yield store.create(book);
        res.json(result).end();
    }
    catch (err) {
        res.status(400);
        res.send(`couldn't create the book: ${err}`);
    }
});
const destroy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield store.delete(req.body.id);
        res.json(deleted).end();
    }
    catch (err) {
        res.status(400);
        res.send(`could not delete the book: ${err}`);
    }
});
const bookRoutes = (app) => {
    app.get('/books', index);
    app.get('/books:id', show);
    app.post('/books', create);
    app.delete('/books', destroy);
};
exports.default = bookRoutes;
