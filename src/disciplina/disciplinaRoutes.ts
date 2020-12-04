import { Router } from 'express'
import DisciplinaController from './disciplinaController'
import { idValidation, insertValidation, updateValidation } from './disciplinaValidation'

const router = Router()

router.post('/', insertValidation, DisciplinaController.post)
router.get('/:id*?', idValidation, DisciplinaController.get)
router.put('/:id', updateValidation, DisciplinaController.put)
router.delete('/:id', idValidation, DisciplinaController.delete)

export default router