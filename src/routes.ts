import { request, Router} from 'express';
import { SettingController } from './controller/SettingController';

const routes=Router();

const SettingsController =new SettingController()

routes.post("/settings",SettingsController.create)

export {routes};