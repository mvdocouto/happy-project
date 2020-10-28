import { Router } from "express"
import multer from 'multer'

import uploadConfig from './config/upload'
import OrphanagesController from "./controllers/OrphanagesController";
import UsersController from "./controllers/UsersController";
import authenticate from "./middleware/authenticate";

const routes = Router();
const upload = multer(uploadConfig)
 
routes.get("/orphanages", authenticate, OrphanagesController.index) 
routes.get("/orphanages/:id", authenticate, OrphanagesController.show); 
routes.post("/orphanages", upload.array('images' ), OrphanagesController.create) 

routes.get("/users", authenticate, UsersController.index);
routes.get("/users/:id", authenticate, UsersController.show);
routes.post("/users", authenticate,  UsersController.create); 
routes.post("/authenticate", UsersController.authenticate); 

export default routes;