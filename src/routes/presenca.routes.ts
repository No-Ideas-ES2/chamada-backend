import { Router } from "express";
import PresencaController from "../controllers/presencaController";
import Validator from "../middlewares/validatorMiddleware";
import PresencaValidation from "../validations/presencaValidation";


const routes = Router()

routes.post('/', PresencaValidation.insert, Validator, PresencaController.save)

export default routes