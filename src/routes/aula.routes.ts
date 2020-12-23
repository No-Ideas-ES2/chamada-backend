import { Router } from 'express'
import AulaController from '../controllers/aulaController'
import PresencaController from '../controllers/presencaController'
import AulaValidation from '../validations/aulaValidation'
import CommonValidation from '../validations/commonValidation'

const routes = Router()

routes.get('/:id?', CommonValidation.idOptional, AulaController.get)
routes.post('/', AulaValidation.insert, AulaController.post)
routes.put('/:id', AulaValidation.update, AulaController.put)
routes.delete('/:id', CommonValidation.id, AulaController.delete)

routes.get('/:id/presencas', CommonValidation.id, PresencaController.getAllByAula)

export default routes