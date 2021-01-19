import { body, oneOf } from 'express-validator'
import CommonValidation from './commonValidation'

export default class ChamadaValidation {

  static insert = [
    body('aulaId').isUUID().notEmpty(),
    body('hora').custom((value: string) => {
      return value.match(/\d{2}:\d{2}/g)
    }).notEmpty(),
    body('carencia').isNumeric().notEmpty()
  ]

  static update = [
    ...CommonValidation.id,
    oneOf([
      ChamadaValidation.insert[1],
      ChamadaValidation.insert[2]

    ])
  ]
}