import { Request, Response } from "express";
import { getCustomRepository } from 'typeorm';
import { SettinsRepository } from '../repositories/SettingsRepository';

class SettingController {
    async create(request:Request,response:Response){
        const {chat ,username}=request.body;
        const settingRepository = getCustomRepository(SettinsRepository)
        
        const setting =settingRepository.create({
            chat,
            username
        })
        
        await settingRepository.save(setting);
        response.json(setting);
        }
}

export {SettingController}