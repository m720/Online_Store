import express, {Request, Response,  NextFunction} from "express";
import { User, UserStore} from "../models/user";

const store = new UserStore();

const index = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        console.log("product index called");
        const users = await store.index();
        res.json(users).end;
    } catch (err) {
        res.status(404);
        res.send(`could not find users ${err}`)
    }
}

const show = async(req:Request, res: Response, next: NextFunction)=>{
    try {
        const userID = Number.parseInt(req.params.id);
        const user = await store.show(userID);
        res.send(user).end();
    } catch (err) {
        res.status(404);
        res.send(`could not find the User ${err}`)
    }
}

const create = async(req: Request, res: Response, next: NextFunction)=>{
    //to-do hash& tokens
    try {
        const user : User={
            id: -1,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        }
        const createdUser = await store.create(user);
        res.send(createdUser).end();
    } catch (err) {
        res.status(400);
        res.send(`could not create the user ${err}`)
    }
   
}

const destroy = async(req: Request, res: Response, next: NextFunction)=>{
    try{        
        const deleted = await store.delete(Number.parseInt(req.params.id));
        res.send(deleted).end();
    }catch(err){
        res.status(400);
        res.send(`could not delete the user ${err}`);
    }
}

const update = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const user:User ={
            id: req.body.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        }
        const updated = await store.update(user);
        res.send(updated).end();
    } catch (err) {
        res.status(400);
        res.send(`could not update the user ${err}`)
    }
}

const showUserOrders = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const id = req.body.id;
        const Orders = await store.showUserOrders(id);
        res.send(Orders).end();
    } catch (err) {
        res.status(404);
        res.send(`could not find Orders ${err}`)
    }
}

const userRoutes = express.Router();
    userRoutes.get('/:id', show);
    userRoutes.post('/', create);
    userRoutes.get('/', index);
    userRoutes.delete('/:id', destroy);
    userRoutes.put('/:id', update);
    userRoutes.get('/:id/orders', showUserOrders);


export default userRoutes;