import { Request, Response } from "express";
import { UserServices } from "../services/UserServices";

class UserController{
    async create(request:Request,response:Response):Promise<Response>{
        const {email}= request.body;
        const usersServires = new UserServices()

        const user=await usersServires.create(email)
        
        return response.json(user);
    }
}

export {UserController}