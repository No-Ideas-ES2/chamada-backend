import { Router } from 'express'

import DisciplinaRoutes from '../disciplina/disciplinaRoutes'

const router = Router()

router.use('/disciplina', DisciplinaRoutes)

export default router