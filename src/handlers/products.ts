import express, {Request, Response,  NextFunction} from "express";
import { ProductStore, Product } from "../models/product";

const store = new ProductStore();

const index = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        console.log("product index called");
        const products = await store.index();
        res.json(products).end;
    } catch (err) {
        res.status(400);
        res.send(`could not find products ${err}`)
    }
}

const show = async(req:Request, res: Response, next: NextFunction)=>{
    try {
        const productId = Number.parseInt(req.params.id);
        const product = await store.show(productId);
        res.send(product).end();
    } catch (err) {
        res.status(400);
        res.send(`could not find the product ${err}`)
    }
}

const create = async(req: Request, res: Response, next: NextFunction)=>{
    
    try {
        const product : Product={
            id: -1,
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        }
        const createdProduct = await store.create(product);
        res.send(createdProduct).end();
    } catch (err) {
        res.status(400);
        res.send(`could not create the product ${err}`)
    }
   
}

const destroy = async(req: Request, res: Response, next: NextFunction)=>{
    try{        
        const deleted = await store.delete(Number.parseInt(req.params.id));
        res.send(deleted).end();
    }catch(err){
        res.status(400);
        res.send(`could not delete the product ${err}`);
    }
}

const update = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const product:Product ={
            id: req.body.id,
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        }
        const updated = await store.update(product);
        res.send(updated).end();
    } catch (err) {
        res.status(400);
        res.send(`could not update the product ${err}`)
    }
}

const productRoutes = express.Router();
    productRoutes.get('/:id', show);
    productRoutes.post('/', create);
    productRoutes.get('/', index);
    productRoutes.delete('/:id', destroy);
    productRoutes.put('/:id', update)

export default productRoutes;