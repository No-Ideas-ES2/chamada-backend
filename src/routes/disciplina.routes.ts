import { Router } from 'express'
import CommonValidation from '../validations/commonValidation'
import DisciplinaController from '../controllers/disciplinaController'
import DisciplinaValidation from '../validations/disciplinaValidation'
import { authorizeUser } from '../auth/authorization'


const router = Router()

router.post('/', authorizeUser(['admin']), DisciplinaValidation.insertValidation, DisciplinaController.post)
router.get('/:id*?', CommonValidation.idOptional, DisciplinaController.get)
router.put('/:id', authorizeUser(['admin']), DisciplinaValidation.updateValidation, DisciplinaController.put)
router.delete('/:id', authorizeUser(['admin']), CommonValidation.id, DisciplinaController.delete)

router.use(router)

export default router