import { body } from "express-validator";

export default class PresencaValidation {
  static insert = [
    body('chamadaId').isUUID().notEmpty(),
    body('alunoId').isUUID().notEmpty()
  ]
}