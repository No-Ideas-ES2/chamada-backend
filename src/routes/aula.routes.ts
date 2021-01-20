import { Router } from 'express'
import AulaController from '../controllers/aulaController'
import PresencaController from '../controllers/presencaController'
import AulaValidation from '../validations/aulaValidation'
import CommonValidation from '../validations/commonValidation'
import Validator from '../middlewares/validatorMiddleware'
import { authorizeUser } from '../auth/authorization'

const routes = Router()

routes.get('/:id/presenca', authorizeUser(['admin', 'professor']), CommonValidation.id, PresencaController.getAllByAula)

routes.get('/:id?', CommonValidation.idOptional, Validator, AulaController.get)
routes.post('/', authorizeUser(['admin', 'professor']), AulaValidation.insert, Validator, AulaController.post)
routes.put('/:id', authorizeUser(['admin', 'professor']), AulaValidation.update, Validator, AulaController.put)
routes.delete('/:id', authorizeUser(['admin']), CommonValidation.id, Validator, AulaController.delete)


export default routes