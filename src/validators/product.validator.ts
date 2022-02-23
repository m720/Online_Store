import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const ProductSchema = Joi.object({
  // schema for creating Product
  id: Joi.number(),
  name: Joi.string().min(3).max(60).required().messages({
    "string.base": `"name" must be Text`,
    "string.min": `"name" must be at least 3 letters`,
    "string.max": `"name" must be at most 60 letters`,
    "any.required": `"name" is required`,
  }),
  price: Joi.number().min(0.1).max(99999999).required().messages({
    "number.base": `"price" must be number`,
    "number.min": `"price" must be at least .1 dollar`,
    "number.max": `"price" must be at most 99999999 dollar`,
    "any.required": `"price" is required`,
  }),
  category: Joi.array().items(Joi.string().required()).min(1).max(15).messages({
    "array.base": `"category" must be array of values`,
    "array.items.string": `"category" must be string values`,
    "array.min": `"category" must be at least 1 item`,
    "array.max": `"category" must be at most 15 item`,
    "any.required": `"category" is required`,
  }),
});

export const VCreateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const valResult = await ProductSchema.validate(req.body);
    if (!valResult.error) {
      next();
    } else {
      throw new Error(`could not procced: ${valResult.error.message}`);
    }
  } catch (err) {
    res.status(400).end(`${err}`);
  }
};
