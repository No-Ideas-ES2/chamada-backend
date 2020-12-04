import { body, oneOf } from 'express-validator'
import { idValidation } from '../common/commonValidation'



export const insertValidation = [
  body('codigo').isString().notEmpty(),
  body('nome').isString().notEmpty()
]

export const updateValidation = [
  ...idValidation,
  oneOf(insertValidation)
]