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
}
export { SettingsServices }