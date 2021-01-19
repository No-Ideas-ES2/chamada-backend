import { body, oneOf } from 'express-validator'
import CommonValidation from './commonValidation'

export default class AulaValidation {
  static insert = [
    body('turmaId').isUUID().notEmpty(),
    body('data').isISO8601().notEmpty(),
    body('duracao').isNumeric().notEmpty()
  ]

  static update = [
    ...CommonValidation.id,
    oneOf(
      AulaValidation.insert
    )
  ]
}