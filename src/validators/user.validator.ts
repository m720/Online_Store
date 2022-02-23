import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const UserSchema = Joi.object({
  // schema for creating User
  id: Joi.number(),
  firstname: Joi.string().min(3).max(60).alphanum().required().messages({
    "string.base": `"firstName" must be Text`,
    "string.min": `"firstName" must be at least 3 letters`,
    "string.max": `"firstName" must be at most 60 letters`,
    "string.regex": `"firstName" must not contain special characters`,
    "any.required": `"firstName" is required`,
  }),
  lastname: Joi.string().min(3).max(60).alphanum().required().messages({
    "string.base": `"lastName" must be Text`,
    "string.min": `"lastName" must be at least 3 letters`,
    "string.max": `"lastName" must be at most 60 letters`,
    "string.regex": `"lastName" must not contain special characters`,
    "any.required": `"lastName" is required`,
  }),
  password: Joi.string().min(8).max(25).required().messages({
    "string.base": `"password" must be Text`,
    "string.min": `"password" must be at least 8 characters`,
    "string.max": `"password" must be at most 25 characters`,
    "any.required": `"password" is required`,
  }),
});

export const VCreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const valResult = await UserSchema.validate(req.body);
    if (!valResult.error) {
      next();
    } else {
      throw new Error(`could not procced: ${valResult.error.message}`);
    }
  } catch (err) {
    res.status(400).end(`${err}`);
  }
};
