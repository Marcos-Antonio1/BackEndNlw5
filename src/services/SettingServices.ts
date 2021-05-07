import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";
import { SettinsRepository } from '../repositories/SettingsRepository';
interface ISettingsCreate{
    chat:boolean;
    username:string;
}
class SettingsServices{
    private settingRepository:Repository<Setting>
    constructor(){
        this.settingRepository=getCustomRepository(SettinsRepository)
    }
    async create({chat,username}:ISettingsCreate){

        // select * from settings where username= username 
        const userAlreadyExists = await  this.settingRepository.findOne({
            username
        })

        if(userAlreadyExists){
            throw new Error("User already Exists!");    
        }
        
        const setting = this.settingRepository.create({
            chat,
            username
        })
        
        await this.settingRepository.save(setting);
        return setting;
    }

    async findByUserName(username:string){
        const settigs = await this.settingRepository.findOne({
            username,
        })

        return settigs;
    }

    async update (username:string,chat:boolean){
        const settings= await this.settingRepository.createQueryBuilder().
        update(Setting). 
        set({chat}). 
        where("username = :username",{
            username
        }).execute() 
    }
}
export { SettingsServices }