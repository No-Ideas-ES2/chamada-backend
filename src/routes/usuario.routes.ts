import { Router } from 'express'
import { authorizeUser } from '../auth/authorization'
import PresencaController from '../controllers/presencaController'
import UsuarioController from '../controllers/usuarioController'
import CommonValidation from '../validations/commonValidation'
import UsuarioValidation from '../validations/usuarioValidation'

const router = Router()

router.post('/:id/presenca', CommonValidation.id, PresencaController.getAllByAluno)

router.post('/', authorizeUser(['admin']), UsuarioValidation.insert, UsuarioController.post)
router.get('/:id*?', authorizeUser(['admin']), CommonValidation.idOptional, UsuarioController.get)
router.put('/:id', authorizeUser(['admin']), UsuarioValidation.update, UsuarioController.put)
router.delete('/:id', authorizeUser(['admin']), CommonValidation.id, UsuarioController.delete)

export default router