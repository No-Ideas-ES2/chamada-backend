import { Router } from 'express'
import { idOptionalValidation, idValidation } from '../common/commonValidation'
import DisciplinaController from './disciplinaController'
import { insertValidation, updateValidation } from './disciplinaValidation'

const router = Router()

router.post('/', insertValidation, DisciplinaController.post)
router.get('/:id*?', idOptionalValidation, DisciplinaController.get)
router.put('/:id', updateValidation, DisciplinaController.put)
router.delete('/:id', idValidation, DisciplinaController.delete)

export default router