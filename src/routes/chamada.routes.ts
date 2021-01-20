import { Router } from 'express'
import { authorizeUser } from '../auth/authorization'
import ChamadaController from '../controllers/chamadaController'
import PresencaController from '../controllers/presencaController'
import Validator from '../middlewares/validatorMiddleware'
import ChamadaValidation from '../validations/chamadaValidation'
import CommonValidation from '../validations/commonValidation'

const routes = Router()

routes.get('/:id/presenca', authorizeUser(['admin', 'professor']), CommonValidation.id, PresencaController.getAllByChamada)

routes.get('/:id?', authorizeUser(['admin', 'professor']), CommonValidation.idOptional, Validator, ChamadaController.get)
routes.post('/', authorizeUser(['admin', 'professor']), ChamadaValidation.insert, Validator, ChamadaController.post)
routes.put('/:id', authorizeUser(['admin', 'professor']), ChamadaValidation.update, Validator, ChamadaController.put)
routes.delete('/:id', authorizeUser(['admin', 'professor']), CommonValidation.id, Validator, ChamadaController.delete)

export default routes