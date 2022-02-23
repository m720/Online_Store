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
exports.VCreateUser = void 0;
const joi_1 = __importDefault(require("joi"));
const UserSchema = joi_1.default.object({
    // schema for creating User
    id: joi_1.default.number(),
    firstname: joi_1.default.string().min(3).max(60).alphanum().required().messages({
        "string.base": `"firstName" must be Text`,
        "string.min": `"firstName" must be at least 3 letters`,
        "string.max": `"firstName" must be at most 60 letters`,
        "string.regex": `"firstName" must not contain special characters`,
        "any.required": `"firstName" is required`,
    }),
    lastname: joi_1.default.string().min(3).max(60).alphanum().required().messages({
        "string.base": `"lastName" must be Text`,
        "string.min": `"lastName" must be at least 3 letters`,
        "string.max": `"lastName" must be at most 60 letters`,
        "string.regex": `"lastName" must not contain special characters`,
        "any.required": `"lastName" is required`,
    }),
    password: joi_1.default.string().min(8).max(25).required().messages({
        "string.base": `"password" must be Text`,
        "string.min": `"password" must be at least 8 characters`,
        "string.max": `"password" must be at most 25 characters`,
        "any.required": `"password" is required`,
    }),
});
const VCreateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valResult = yield UserSchema.validate(req.body);
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
exports.VCreateUser = VCreateUser;
