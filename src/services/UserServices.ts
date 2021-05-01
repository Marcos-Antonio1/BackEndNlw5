import { getCustomRepository, Repository } from "typeorm"
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository"

class UserServices{
    private userRepository: Repository<User>
    constructor(){
        this.userRepository=getCustomRepository(UserRepository);
    }
    async create(email){
        
        const userExists= await this.userRepository.findOne({
            email
        })
        // verificar se existe
        if(userExists){
            return userExists; 
        }
        const user = this.userRepository.create({
            email
        })

        await this.userRepository.save(user)
        //se não existir salva no bd
        //se existir, retornar user 
        return user;
    }
}

export {UserServices}