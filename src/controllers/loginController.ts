import { Request, Response } from 'express'
import UsuarioService from '../services/usuarioService'

const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, senha } = req.body
    const usuario = await UsuarioService.login(email, senha)
    if (usuario) {
      req.session.user = usuario
      return res.status(200).json(usuario)
    }
    return res.status(401).json('Email ou senha inválidos!')
  } catch (error) {
    console.error(error)
    const { message } = error
    return res.status(500).json({ error: message })
  }
}

export default login