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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../models/user");
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const request = (0, supertest_1.default)(index_1.default);
const pepper = (_a = process.env.BCRYPT_PASSWORD) !== null && _a !== void 0 ? _a : "random_pass";
const saltRounds = (_b = process.env.SALT_ROUNDS) !== null && _b !== void 0 ? _b : "10";
describe("Users DB CURD", () => {
    const store = new user_1.UserStore();
    it('DB Create User', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.create({
            id: -1,
            firstname: "ahmeddB",
            lastname: "mahmoud",
            password: "12345@Mh"
        });
        expect(typeof (result)).toBe("string"); //cant compare the value as token value is unkown
    }));
    it('DB Index Users', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(typeof (result)).toBe("object"); //cant compare the value as pass value is unkown
    }));
    it('DB Show User', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.show(1);
        expect(result.id).toBe(1);
    }));
    it('DB Update User', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.update({
            id: 1,
            firstname: "ahmeddddddDB",
            lastname: "mahmoud",
            password: "12345@Mh"
        });
        const hashedPass = bcrypt_1.default.hashSync("12345@Mh" + pepper, parseInt(saltRounds));
        expect(result.id).toEqual(1);
        expect(result.firstname).toEqual("ahmeddddddDB");
        expect(result.lastname).toEqual("mahmoud");
    }));
    it('DB Delete User', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.delete(1);
        expect(result).toBe("Deleted");
    }));
});
describe("Users APIs", () => {
    let token = ''; // using let insted of const to be assigned later;
    it('Create User', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.post("/users")
            .set('Content-Type', 'application/json')
            .send({
            firstname: "ahmedApi",
            lastname: "mahmoud",
            password: "12345@Mh"
        });
        token = result.text;
        expect(result.status).toBe(200);
    }));
    it('Index Users', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.get('/users');
        expect(result.status).toBe(200);
    }));
    it('Show User', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.get("/users/" + '4');
        expect(result.status).toBe(200);
    }));
    it('Update User', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.put("/users/" + "4")
            .send({ "id": 4,
            "firstname": "AHMEDDDAPI",
            "lastname": "mahmoud",
            "password": "12345@Mh"
        }).auth(token, { type: "bearer" });
        expect(result.status).toBe(200);
    }));
    it('Show User Orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield request.get("/users/" + "4" + "/orders")
            .auth(token, { type: "bearer" });
        expect(result.status).toBe(200);
    }));
    // it('Delete User', async()=>{
    //     const result = await request.delete("/users/"+"4")
    //                             .auth(token, {type: "bearer"});
    //     expect(result.status).toBe(200);
    //     })
});
