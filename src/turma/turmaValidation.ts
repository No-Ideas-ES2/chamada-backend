import { body, oneOf } from 'express-validator'
import { idValidation } from '../common/commonValidation'

export const insertValidation = [
  body('disciplinaId').isUUID().notEmpty(),
  body('professorId').isUUID().notEmpty(),
  body('descricao').isString().notEmpty()
]

export const updateValidation = [
  ...idValidation,
  oneOf([
    body('professorId').isUUID().notEmpty(),
    body('descricao').isString().notEmpty()
  ])
]

export const insertAlunosValidation = [
  ...idValidation,
  body('alunosId').isArray({ min: 1 })
]