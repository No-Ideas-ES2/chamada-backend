import IUsuario from '../interfaces/usuarioInterface'
import UsuarioRepository from '../repositories/usuarioRepository'

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
}