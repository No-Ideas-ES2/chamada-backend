import { body, oneOf } from "express-validator";
import CommonValidation from "./commonValidation";

export default class AulaValidation {
  static insert = [
    body('turma_id').isUUID().notEmpty(),
    body('data').isDate().notEmpty(),
    body('duracao').isNumeric().notEmpty()
  ]

  static update = [
    ...CommonValidation.id,
    oneOf([
      body('data').isDate(),
      body('duracao').isNumeric()
    ])
  ]
}