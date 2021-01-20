import hash from 'object-hash'
import IUsuario from '../interfaces/usuarioInterface'
import UsuarioRepository from '../repositories/usuarioRepository'

const hashOptions = { algorithm: 'md5', encoding: 'base64' }

export default class UsuarioService {
  static async get(id?: string): Promise<IUsuario | IUsuario[]> {
    if (id) {
      return UsuarioRepository.findOneById(id)
    }
    return UsuarioRepository.findAll()
  }

  static async post(usuario: any): Promise<IUsuario> {
    return UsuarioRepository.save(usuario)
  }

  static async update(id: string, usuario: any): Promise<IUsuario> {
    return UsuarioRepository.update(id, usuario)
  }

  static async delete(id: string) {
    return UsuarioRepository.delete(id)
  }

  static async login(login: string, senha: string): Promise<IUsuario> {
    return UsuarioRepository.findOneByEmailSenha(login, hash(senha, hashOptions))
  }
}