import { body, oneOf } from 'express-validator'
import { idValidation } from '../common/commonValidation'

export const insertValidation = [
  body('nome').isString().notEmpty(),
  body('email').normalizeEmail().isEmail(),
  // body('senha').isHash('md5')
  body('senha').isString().notEmpty(),
  body('tipo').isIn(['admin', 'professor', 'aluno'])
]

export const updateValidation = [
  ...idValidation,
  oneOf([
    insertValidation[0],
    insertValidation[1],
    insertValidation[2]
  ])
]