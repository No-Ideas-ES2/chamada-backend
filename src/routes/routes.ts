import { Router } from 'express'

import DisciplinaRoutes from './disciplina.routes'
import UsuarioRoutes from './usuario.routes'
import TurmaRoutes from './turma.routes'
import AulaRoutes from './aula.routes'
import ChamadaRoutes from './chamada.routes'

const router = Router()

router.use('/disciplina', DisciplinaRoutes)
router.use('/usuario', UsuarioRoutes)
router.use('/turma', TurmaRoutes)
router.use('/aula', AulaRoutes)
router.use('/chamada', ChamadaRoutes)


export default router