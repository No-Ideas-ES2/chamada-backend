import { Router } from 'express'
import AulaController from '../controllers/aulaController'
import PresencaController from '../controllers/presencaController'
import AulaValidation from '../validations/aulaValidation'
import CommonValidation from '../validations/commonValidation'
import Validator from '../middlewares/validatorMiddleware'

const routes = Router()

routes.get('/:id/presencas', CommonValidation.id, PresencaController.getAllByAula)

routes.get('/:id?', CommonValidation.idOptional, Validator, AulaController.get)
routes.post('/', AulaValidation.insert, Validator, AulaController.post)
routes.put('/:id', AulaValidation.update, Validator, AulaController.put)
routes.delete('/:id', CommonValidation.id, Validator, AulaController.delete)


export default routes