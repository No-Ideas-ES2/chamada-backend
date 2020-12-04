import UsuarioModel from './usuarioModel'

export default class UsuarioService {
  static async get(id?: string) {
    if (id) {
      return UsuarioModel.findOneById(id)
    }
    return UsuarioModel.findAll()
  }

  static async post(disciplina: any) {
    return UsuarioModel.save(disciplina)
  }

  static async update(id: string, disciplina: any) {
    return UsuarioModel.update(id, disciplina)
  }

  static async delete(id: string) {
    return UsuarioModel.delete(id)
  }
}