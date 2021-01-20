import { Router } from "express";
import { authorizeUser } from "../auth/authorization";
import PresencaController from "../controllers/presencaController";
import Validator from "../middlewares/validatorMiddleware";
import PresencaValidation from "../validations/presencaValidation";


const routes = Router()

routes.post('/', authorizeUser(['aluno', 'professor']), PresencaValidation.insert, Validator, PresencaController.save)

export default routes