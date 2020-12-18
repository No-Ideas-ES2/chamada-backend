import { body } from "express-validator";
import CommonValidation from "./commonValidation";

export default class ChamadaValidation {
  static insert = [
    body('aula_id').isUUID().notEmpty(),
    body('carencia').isNumeric().notEmpty()
  ]

  static update = [
    ...CommonValidation.id,
    body('carencia').isNumeric().notEmpty()
  ]
}