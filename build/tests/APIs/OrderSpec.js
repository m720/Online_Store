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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
const order_1 = require("../../models/order");
const request = (0, supertest_1.default)(index_1.default);
describe("Order APIs", () => {
    let token = ''; // using let insted of const to be assigned later;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // this step is to get token to use it for authorization    
        const result = yield request.post("/users")
            .set('Content-Type', 'application/json')
            .send({
            firstname: "ahmed",
            lastname: "mahmoud",
            password: "12345@Mh"
        });
        token = result.text;
        yield request.post('/products')
            .send({
            name: "DBbook",
            price: 13,
            category: ["groc"]
        }).auth(token, { type: "bearer" });
        yield request.post('/products')
            .send({
            name: "DBmilk",
            price: 13,
            category: ["groc"]
        }).auth(token, { type: "bearer" });
        yield request.post('/products')
            .send({
            name: "DBcacke",
            price: 25,
            category: ["groc"]
        }).auth(token, { type: "bearer" });
    }));
    it('Create Order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.post("/orders")
            .set('Content-Type', 'application/json')
            .send({
            user_id: 1,
            status: false,
            productsIds: [2, 1, 2],
            quantities: [2, 1]
        }).auth(token, { type: "bearer" });
        expect(result.status).toBe(200);
    }));
    it('Index Orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.get('/orders')
            .auth(token, { type: "bearer" });
        expect(result.status).toBe(200);
    }));
    it('Show Order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.get("/orders/" + '1')
            .auth(token, { type: "bearer" });
        expect(result.status).toBe(200);
    }));
    it('Update Order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.put("/orders/" + "1")
            .send({
            status: true
        }).auth(token, { type: "bearer" });
        expect(result.status).toBe(200);
    }));
    it('Delete Order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.delete("/orders/" + "1")
            .auth(token, { type: "bearer" });
        expect(result.status).toBe(200);
    }));
});
describe("Orders CURD", () => {
    const store = new order_1.OrderStore();
    let DBorderProducts;
    let DBorderid;
    it("DB Create Order", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.create({
            id: -1,
            user_id: 1,
            status: false,
            orderproducts: -1
        }, [2, 1], [2, 1]);
        DBorderid = result.id;
        DBorderProducts = result.orderproducts;
        expect(result.user_id).toEqual(1);
    }));
    it("DB index Orders", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(typeof (result)).toBe("object");
    }));
    it("DB Show Order", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.show(DBorderid);
        expect(result.orderproducts).toBe(DBorderProducts);
    }));
    it("DB Update Order", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.update(DBorderid, true);
        expect(result.orderproducts).toBe(DBorderProducts);
    }));
    it("DB delete Orders", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.delete(DBorderid);
        expect(result).toBe("Deleted");
    }));
});
