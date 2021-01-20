import { Request, Response, NextFunction } from 'express'
import { EnumTipoUsuario } from '../interfaces/usuarioInterface'


export const authorize = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  try {
    const { session } = req

    if (!session) {
      return res.status(401).json('Não há sessão!')
    }

    const date = session.cookie.expires || new Date()
    const current = new Date()

    if (date.getTime() < current.getTime()) {
      return res.status(401).json('Sessão expirada!')
    }

    if (!session.user) {
      return res.status(401).json('Não há usuário na sessão!')
    }

    return next()
  } catch (error) {
    return next(error)
  }
}

export const authorizeUser = (tipos: ('admin' | 'aluno' | 'professor')[]) => {
  return (req: Request, res: Response, next: NextFunction): void | Response => {
    try {
      const { user } = req.session
      if (tipos.includes(user.tipo)) {
        return next()
      }
      return res.status(403).json('Usuário não autorizado!')
    } catch (error) {
      return next(error)
    }
  }
}

