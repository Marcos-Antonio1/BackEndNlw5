import { Entity, EntityRepository, Repository } from "typeorm"
import { Setting } from "../entities/Setting";

@EntityRepository(Setting)
class SettinsRepository extends  Repository <Setting>{
    
}

export {SettinsRepository}