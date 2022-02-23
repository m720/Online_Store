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
const product_1 = require("../../models/product");
const request = (0, supertest_1.default)(index_1.default);
describe("Products APIs", () => __awaiter(void 0, void 0, void 0, function* () {
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
    }));
    it("Create Product", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.post('/products')
            .send({
            name: "book",
            price: 13,
            category: ["groc"]
        }).auth(token, { type: "bearer" });
        expect(result.status).toBe(200);
    }));
    it('Index Products', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.get('/products');
        expect(result.status).toBe(200);
    }));
    it('Show Product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.get("/products/" + '4');
        expect(result.status).toBe(200);
    }));
    it('Update Product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.put("/products/" + "4")
            .send({
            name: "milk",
            price: 15,
            category: ["groc"]
        }).auth(token, { type: "bearer" });
        expect(result.status).toBe(200);
    }));
    it('Delete Product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.delete("/products/" + "4")
            .auth(token, { type: "bearer" });
        expect(result.status).toBe(200);
    }));
}));
describe("Products CURD", () => {
    const store = new product_1.ProductStore();
    let id;
    it("DB Create Product", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.create({
            name: "DBproduct",
            price: 19,
            category: ["cat1"],
            id: -1
        });
        id = result.id;
        expect(result.name).toEqual("DBproduct");
        expect(result.price).toEqual(19);
    }));
    it("DB Index Products", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(typeof (result)).toBe("object");
    }));
    it("DB Show Product", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.show(id);
        expect(result.name).toEqual("DBproduct");
        expect(result.price).toEqual(19);
    }));
    it("DB Upate Product", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.update({
            name: "updatedDBProduct",
            price: 20,
            category: ["cat2"],
            id: id
        });
        expect(result.name).toEqual("updatedDBProduct");
    }));
    it("DB Delete Product", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.delete(id);
        expect(result).toEqual("Deleted");
    }));
});
