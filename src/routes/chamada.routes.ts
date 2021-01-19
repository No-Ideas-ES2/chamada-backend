import { Router } from 'express'
import ChamadaController from '../controllers/chamadaController'
import PresencaController from '../controllers/presencaController'
import Validator from '../middlewares/validatorMiddleware'
import ChamadaValidation from '../validations/chamadaValidation'
import CommonValidation from '../validations/commonValidation'

const routes = Router()

routes.get('/:id/presenca', CommonValidation.id, PresencaController.getAllByChamada)

routes.get('/:id?', CommonValidation.idOptional, Validator, ChamadaController.get)
routes.post('/', ChamadaValidation.insert, Validator, ChamadaController.post)
routes.put('/:id', ChamadaValidation.update, Validator, ChamadaController.put)
routes.delete('/:id', CommonValidation.id, Validator, ChamadaController.delete)


export default routes