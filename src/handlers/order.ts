import express, {Request, Response,  NextFunction} from "express";
import { Order, OrderStore } from "../models/order";
const store = new OrderStore();

const index = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const orders = await store.index();
        res.json(orders).end;
    } catch (err) {
        res.status(404);
        res.send(`could not find orders ${err}`)
    }
}

const show = async(req:Request, res: Response, next: NextFunction)=>{
    try {
        const orderID = Number.parseInt(req.params.id);
        const order = await store.show(orderID);
        res.send(order).end();
    } catch (err) {
        res.status(404);
        res.send(`could not find the order ${err}`)
    }
}

const create = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const order : Order={
            id: -1,
            userId: req.body.firstName,
            status: false,
            OrderProductsIds: -1
        }
        const productsIds =req.body.productsIds;
        const quantities = req.body.quantities;
        const createdOrder = await store.create(order, productsIds, quantities);
        res.send(createdOrder).end();
    } catch (err) {
        res.status(400);
        res.send(`could not create the Order ${err}`)
    }
   
}

const destroy = async(req: Request, res: Response, next: NextFunction)=>{
    try{        
        const deleted = await store.delete(Number.parseInt(req.params.id));
        res.send(deleted).end();
    }catch(err){
        res.status(400);
        res.send(`could not delete the order ${err}`);
    }
}

const update = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        
        const id= req.body.id;
        const status= req.body.status;
        const updated = await store.update(id, status);
        res.send(updated).end();
    } catch (err) {
        res.status(400);
        res.send(`could not update the Order ${err}`);
    }
}

const orderRoutes = express.Router();
    orderRoutes.get('/:id', show);
    orderRoutes.post('/', create);
    orderRoutes.get('/', index);
    orderRoutes.delete('/:id', destroy);
    orderRoutes.put('/:id', update);


export default orderRoutes;