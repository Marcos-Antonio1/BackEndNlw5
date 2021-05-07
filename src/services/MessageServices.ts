import { getCustomRepository, Repository } from "typeorm"
import { Message } from "../entities/Message";
import { MessagesRepository } from "../repositories/MessagesRepository";

interface iMessageCreate{
    text:string,
    user_id:string,
    admin_id?:string,
}

class MessageService{
    private messagesRepository : Repository<Message>

    constructor(){
        this.messagesRepository = getCustomRepository(MessagesRepository)
    }
    async create({admin_id,text,user_id}:iMessageCreate){
    
        const message= this.messagesRepository.create({
            text,
            user_id,
            admin_id
        })

        await this.messagesRepository.save(message)
        return message;
    }
    async listByUser(user_id:string){

        const list =await this.messagesRepository.find({
            user_id
        })

        return list;
    }
}

export{ MessageService }