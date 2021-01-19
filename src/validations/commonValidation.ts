import { param } from 'express-validator'

export default class CommonValidation {
  static id = [
    param('id').isUUID()
  ]

  static idOptional = [
    param('id').isUUID().optional()
  ]

}