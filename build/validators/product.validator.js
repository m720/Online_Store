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
exports.VCreateProduct = void 0;
const joi_1 = __importDefault(require("joi"));
const ProductSchema = joi_1.default.object({
    // schema for creating Product
    id: joi_1.default.number(),
    name: joi_1.default.string().min(3).max(60).required().messages({
        "string.base": `"name" must be Text`,
        "string.min": `"name" must be at least 3 letters`,
        "string.max": `"name" must be at most 60 letters`,
        "any.required": `"name" is required`,
    }),
    price: joi_1.default.number().min(0.1).max(99999999).required().messages({
        "number.base": `"price" must be number`,
        "number.min": `"price" must be at least .1 dollar`,
        "number.max": `"price" must be at most 99999999 dollar`,
        "any.required": `"price" is required`,
    }),
    category: joi_1.default.array().items(joi_1.default.string().required()).min(1).max(15).messages({
        "array.base": `"category" must be array of values`,
        "array.items.string": `"category" must be string values`,
        "array.min": `"category" must be at least 1 item`,
        "array.max": `"category" must be at most 15 item`,
        "any.required": `"category" is required`,
    }),
});
const VCreateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valResult = yield ProductSchema.validate(req.body);
        if (!valResult.error) {
            next();
        }
        else {
            throw new Error(`could not procced: ${valResult.error.message}`);
        }
    }
    catch (err) {
        res.status(400).end(`${err}`);
    }
});
exports.VCreateProduct = VCreateProduct;
