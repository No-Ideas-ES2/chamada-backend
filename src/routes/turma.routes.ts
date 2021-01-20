import { Router } from 'express'
import { authorizeUser } from '../auth/authorization'
import TurmaController from '../controllers/turmaController'
import CommonValidation from '../validations/commonValidation'
import TurmaValidation from '../validations/turmaValidation'

const routes = Router()

// Turma-alunos
routes.get('/:id/alunos', CommonValidation.id, TurmaController.getAlunos)
routes.post('/:id/alunos', authorizeUser(['admin']), TurmaValidation.insertAlunos, TurmaController.postAlunos)

// Turma
routes.post('/', authorizeUser(['admin']), TurmaValidation.insert, TurmaController.post)
routes.get('/:id*?/', CommonValidation.idOptional, TurmaController.get)
routes.put('/:id/', authorizeUser(['admin']), TurmaValidation.update, TurmaController.put)
routes.delete('/:id/', authorizeUser(['admin']), CommonValidation.id, TurmaController.delete)

export default routes