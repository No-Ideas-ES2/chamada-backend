import { body, oneOf } from 'express-validator'
import CommonValidation from './commonValidation'

export default class TurmaValidation {
  static insert = [
    body('disciplinaId').isUUID().notEmpty(),
    body('professorId').isUUID().notEmpty(),
    body('descricao').isString().notEmpty()
  ]

  static update = [
    ...CommonValidation.id,
    oneOf([
      body('professorId').isUUID().notEmpty(),
      body('descricao').isString().notEmpty()
    ])
  ]

  static insertAlunos = [
    ...CommonValidation.id,
    body('alunosId').isArray({ min: 1 })
  ]
}