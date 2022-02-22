import express, {Request, Response,  NextFunction} from "express";
import { User, UserStore} from "../models/user";
import jwt from 'jsonwebtoken';

const store = new UserStore();

const index = async(req: Request, res: Response, next: NextFunction)=>{
    try {
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
        const createdUserToken:String = await store.create(user);
        res.send(createdUserToken).end();
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
        const id = req.params.id;
        const Orders = await store.showUserOrders(Number.parseInt(id));
        res.send(Orders).end();
    } catch (err) {
        res.status(404);
        res.send(`could not find Orders ${err}`);
    }
}

const authenticate = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const id: number = Number.parseInt(req.body.id);
        const password: string =req.body.password;
        const user = await store.authenticate(id, password);
        res.send(user).end();
    } catch (err) {
        res.status(404);
        res.send(`${err}`);
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
 

const userRoutes = express.Router();
    userRoutes.get('/:id', show);
    userRoutes.post('/', create);
    userRoutes.get('/', index);
    userRoutes.delete('/:id', VerifyToken, destroy);
    userRoutes.put('/:id', VerifyToken, update);
    userRoutes.get('/:id/orders', VerifyToken, showUserOrders);
    userRoutes.post('/authenticate',authenticate);


export default userRoutes;