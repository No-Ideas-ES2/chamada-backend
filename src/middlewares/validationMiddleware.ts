import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

const validation = (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    } else {
      return res.status(400).json(errors.array())
    }
  } catch (error) {
    return next(error)
  }
}