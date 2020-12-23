import { Router } from 'express'
import UsuarioController from '../controllers/usuarioController'
import CommonValidation from '../validations/commonValidation'
import UsuarioValidation from '../validations/usuarioValidation'

const router = Router()

router.post('/', UsuarioValidation.insert, UsuarioController.post)
router.get('/:id*?', CommonValidation.idOptional, UsuarioController.get)
router.put('/:id', UsuarioValidation.update, UsuarioController.put)
router.delete('/:id', CommonValidation.id, UsuarioController.delete)

export default router