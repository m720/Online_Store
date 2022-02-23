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
exports.VupdateOrder = exports.VCreateOrder = void 0;
const joi_1 = __importDefault(require("joi"));
const OrderSchema = joi_1.default.object({
    // schema for creating Order
    user_id: joi_1.default.number().min(1).required().messages({
        "number.base": `"user_id" must be a number`,
        "number.min": `"user_id" must be at least 1`,
        "any.required": `"user_id" is required`,
    }),
    status: joi_1.default.boolean().required().messages({
        "boolean.base": `"status" must be boolean`,
        "any.required": `"status" is required`,
    }),
    productsIds: joi_1.default.array()
        .items(joi_1.default.number().min(1).required())
        .min(1)
        .max(15)
        .messages({
        "array.base": `"productsIds" must be array of values`,
        "array.items.number": `"productsIds" must be array of numbers`,
        "array.items.number.min": `"productsId" must be at leats 1`,
        "array.max": `"productsIds" must be at most 15`,
        "array.min": `"productsIds" must be at least 1`,
        "any.required": `"productsIds" is required`,
    }),
    quantities: joi_1.default.array()
        .items(joi_1.default.number().min(1).required())
        .min(1)
        .max(15)
        .messages({
        "array.base": `"quantities" must be array of values`,
        "array.items.number": `"quantities" must be array of numbers`,
        "array.items.number.min": `"quantities" must be at leats 1`,
        "array.max": `"quantities" must be at most 15`,
        "array.min": `"quantities" must be at least 1`,
        "any.required": `"quantities" is required`,
    }),
});
const ValidatestatusSchema = joi_1.default.object({
    status: joi_1.default.boolean().required().messages({
        "boolean.base": `"status" must be boolean`,
        "any.required": `"status" is required`,
    }),
});
const VCreateOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valResult = yield OrderSchema.validate(req.body);
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
exports.VCreateOrder = VCreateOrder;
const VupdateOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valResult = yield ValidatestatusSchema.validate(req.body);
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
exports.VupdateOrder = VupdateOrder;
