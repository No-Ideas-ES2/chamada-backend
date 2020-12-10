import { param } from 'express-validator'

export const idValidation = [
  param('id').isUUID()
]

export const idOptionalValidation = [
  param('id').isUUID().optional()
]