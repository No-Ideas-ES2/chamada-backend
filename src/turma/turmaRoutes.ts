import { Router } from 'express'
import { idValidation } from '../common/commonValidation'
import { updateValidation } from '../disciplina/disciplinaValidation'
import TurmaController from './turmaController'
import { insertAlunosValidation, insertValidation } from './turmaValidation'

const routes = Router()

routes.post('/', insertValidation, TurmaController.post)
routes.get('/:id*?', idValidation, TurmaController.get)
routes.put('/:id', updateValidation, TurmaController.put)
routes.delete('/:id', updateValidation, TurmaController.delete)

// Alunos
routes.get('/:id/alunos', idValidation, TurmaController.getAlunos)
routes.post('/:id/alunos', insertAlunosValidation, TurmaController.postAlunos)

export default routes