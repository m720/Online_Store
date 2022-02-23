import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const OrderSchema = Joi.object({
  // schema for creating Order
  user_id: Joi.number().min(1).required().messages({
    "number.base": `"user_id" must be a number`,
    "number.min": `"user_id" must be at least 1`,
    "any.required": `"user_id" is required`,
  }),
  status: Joi.boolean().required().messages({
    "boolean.base": `"status" must be boolean`,
    "any.required": `"status" is required`,
  }),
  productsIds: Joi.array()
    .items(Joi.number().min(1).required())
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
  quantities: Joi.array()
    .items(Joi.number().min(1).required())
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

const ValidatestatusSchema = Joi.object({
  status: Joi.boolean().required().messages({
    "boolean.base": `"status" must be boolean`,
    "any.required": `"status" is required`,
  }),
});

export const VCreateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const valResult = await OrderSchema.validate(req.body);
    if (!valResult.error) {
      next();
    } else {
      throw new Error(`could not procced: ${valResult.error.message}`);
    }
  } catch (err) {
    res.status(400).end(`${err}`);
  }
};

export const VupdateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const valResult = await ValidatestatusSchema.validate(req.body);
    if (!valResult.error) {
      next();
    } else {
      throw new Error(`could not procced: ${valResult.error.message}`);
    }
  } catch (err) {
    res.status(400).end(`${err}`);
  }
};
