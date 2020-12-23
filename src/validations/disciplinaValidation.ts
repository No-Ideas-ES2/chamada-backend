import { body, oneOf } from 'express-validator'
import CommonValidation from '../validations/commonValidation'

export default class DisciplinaValidation {

  static insertValidation = [
    body('codigo').isString().notEmpty(),
    body('nome').isString().notEmpty()
  ]

  static updateValidation = [
    ...CommonValidation.id,
    oneOf(DisciplinaValidation.insertValidation)
  ]
}
