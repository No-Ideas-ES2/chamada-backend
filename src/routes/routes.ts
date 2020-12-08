import { Router } from 'express'

import DisciplinaRoutes from '../disciplina/disciplinaRoutes'
import UsuarioRoutes from '../usuario/usuarioRoutes'
import TurmaRoutes from '../turma/turmaRoutes'

const router = Router()

router.use('/disciplina', DisciplinaRoutes)
router.use('/usuario', UsuarioRoutes)
router.use('/turma', TurmaRoutes)


export default router