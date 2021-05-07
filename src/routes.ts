import { request, Router} from 'express';
import { MessagesController } from './controller/MessagesController';
import { SettingController } from './controller/SettingController';
import { UserController } from './controller/UserController';
const routes=Router();

const SettingsController =new SettingController();
const usersController = new UserController();
const messageController = new MessagesController();

routes.post("/user",usersController.create);
routes.post("/settings",SettingsController.create);
routes.get("/settings/:username",SettingsController.findByUserName);
routes.put("/settings/:username",SettingsController.update);
routes.post("/messages",messageController.create);
routes.get("/messages/:id",messageController.showByUser);


export {routes};