import { Router } from 'express'
import ChamadaController from '../controllers/chamadaController'
import PresencaController from '../controllers/presencaController'
import ChamadaValidation from '../validations/chamadaValidation'
import CommonValidation from '../validations/commonValidation'

const routes = Router()

routes.get('/:id?', CommonValidation.idOptional, ChamadaController.get)
routes.post('/', ChamadaValidation.insert, ChamadaController.post)
routes.put('/:id', ChamadaValidation.update, ChamadaController.put)
routes.delete('/:id', CommonValidation.id, ChamadaController.delete)

routes.get('/:id/presencas', CommonValidation.id, PresencaController.getAllByChamada)

export default routes