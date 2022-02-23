import express, { Request, Response, NextFunction } from "express";
import { ProductStore, Product } from "../models/product";
import jwt from "jsonwebtoken";

const store = new ProductStore();

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.send(`could not find products ${err}`);
  }
};

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product_id = Number.parseInt(req.params.id);
    const product = await store.show(product_id);
    res.send(product).end();
  } catch (err) {
    res.status(400);
    res.send(`could not find the product ${err}`);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product: Product = {
      id: -1,
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };
    const createdProduct = await store.create(product);
    res.send(createdProduct).end();
  } catch (err) {
    res.status(400);
    res.send(`could not create the product ${err}`);
  }
};

const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await store.delete(Number.parseInt(req.params.id));
    res.send(deleted).end();
  } catch (err) {
    res.status(400);
    res.send(`could not delete the product ${err}`);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product: Product = {
      id: Number.parseInt(req.params.id),
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };
    const updated = await store.update(product);
    res.send(updated).end();
  } catch (err) {
    res.status(400);
    res.send(`could not update the product ${err}`);
  }
};
const VerifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader: String = req.headers.authorization ?? "";
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET ?? "randomtoken");

    next();
  } catch (err) {
    res.status(401);
    res.json(`invalid token ${err}`);
  }
};

const productRoutes = express.Router();
productRoutes.get("/:id", show);
productRoutes.post("/", VerifyToken, create);
productRoutes.get("/", index);
productRoutes.delete("/:id", VerifyToken, destroy);
productRoutes.put("/:id", VerifyToken, update);

export default productRoutes;
