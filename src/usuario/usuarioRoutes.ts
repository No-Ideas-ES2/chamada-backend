import { Router } from 'express'
import { idOptionalValidation, idValidation } from '../common/commonValidation'
import UsuarioController from './usuarioController'
import { insertValidation, updateValidation } from './usuarioValidation'

const router = Router()

router.post('/', insertValidation, UsuarioController.post)
router.get('/:id*?', idOptionalValidation, UsuarioController.get)
router.put('/:id', updateValidation, UsuarioController.put)
router.delete('/:id', idValidation, UsuarioController.delete)

export default router