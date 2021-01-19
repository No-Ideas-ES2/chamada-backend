import { body, oneOf } from 'express-validator'
import CommonValidation from './commonValidation'

export default class UsuarioValidation {

  static insert = [
    body('nome').isString().notEmpty(),
    body('email').normalizeEmail().isEmail(),
    // body('senha').isHash('md5')
    body('senha').isString().notEmpty(),
    body('tipo').isIn(['admin', 'professor', 'aluno'])
  ]

  static update = [
    ...CommonValidation.id,
    oneOf([
      UsuarioValidation.insert[0],
      UsuarioValidation.insert[1],
      UsuarioValidation.insert[2]
    ])
  ]
}