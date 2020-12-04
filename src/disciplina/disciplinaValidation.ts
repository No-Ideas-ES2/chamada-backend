import { body, param, oneOf } from 'express-validator'

export const idValidation = [
  param('id').isUUID()
]

export const insertValidation = [
  body('codigo').isString().notEmpty(),
  body('nome').isString().notEmpty()
]

export const updateValidation = [
  ...idValidation,
  oneOf(insertValidation)
]