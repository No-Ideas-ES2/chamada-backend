import { Router } from 'express'
import TurmaController from '../controllers/turmaController'
import CommonValidation from '../validations/commonValidation'
import TurmaValidation from '../validations/turmaValidation'

const routes = Router()

// Turma-alunos
routes.get('/:id/alunos', CommonValidation.id, TurmaController.getAlunos)
routes.post('/:id/alunos', TurmaValidation.insertAlunos, TurmaController.postAlunos)

// Turma
routes.post('/', TurmaValidation.insert, TurmaController.post)
routes.get('/:id*?/', CommonValidation.idOptional, TurmaController.get)
routes.put('/:id/', TurmaValidation.update, TurmaController.put)
routes.delete('/:id/', CommonValidation.id, TurmaController.delete)


export default routes