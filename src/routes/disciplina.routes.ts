import { Router } from 'express'
import CommonValidation from '../validations/commonValidation'
import DisciplinaController from '../controllers/disciplinaController'
import DisciplinaValidation from '../validations/disciplinaValidation'


const router = Router()

router.post('/', DisciplinaValidation.insertValidation, DisciplinaController.post)
router.get('/:id*?', CommonValidation.idOptional, DisciplinaController.get)
router.put('/:id', DisciplinaValidation.updateValidation, DisciplinaController.put)
router.delete('/:id', CommonValidation.id, DisciplinaController.delete)

export default router