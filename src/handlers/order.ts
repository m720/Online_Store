import express, {Request, Response,  NextFunction} from "express";
import { type } from "os";
import { Order, OrderStore } from "../models/order";
import jwt from 'jsonwebtoken';
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
            userId: req.body.userId,
            status: false,
            orderproducts: -1
        }
        const productsIds: number[] =[];
        req.body.productsIds.forEach((i: string)  => {
            productsIds.push(Number.parseInt(i))
        });
        const quantities: number[] = [];
        req.body.quantities.forEach((i: string)  => {
            quantities.push(Number.parseInt(i))
        });
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
        
        const id= Number.parseInt(req.params.id);
        const status= req.body.status;
        const updated = await store.update(id, status);
        res.send(updated).end();
    } catch (err) {
        res.status(400);
        res.send(`could not update the Order ${err}`);
    }
}
const VerifyToken =async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const authorizationHeader: String = req.headers.authorization??'';
        const token = authorizationHeader.split(' ')[1];
        jwt.verify(token, process.env.TOKEN_SECRET??'randomtoken');
        
        next();
    }catch(err){
        res.status(401);
        res.json(`invalid token ${err}`);
    }
}
 

const orderRoutes = express.Router();
    orderRoutes.get('/:id', show);
    orderRoutes.post('/', VerifyToken,create);
    orderRoutes.get('/', index);
    orderRoutes.delete('/:id', VerifyToken,destroy);
    orderRoutes.put('/:id', VerifyToken,update);


export default orderRoutes;

function element(element: any, arg1: (String: any) => void) {
    throw new Error("Function not implemented.");
}
