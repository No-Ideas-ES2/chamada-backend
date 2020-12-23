import UsuarioRepository from "../repositories/usuarioRepository"

export default class UsuarioService {
  static async get(id?: string) {
    if (id) {
      return UsuarioRepository.findOneById(id)
    }
    return UsuarioRepository.findAll()
  }

  static async post(disciplina: any) {
    return UsuarioRepository.save(disciplina)
  }

  static async update(id: string, disciplina: any) {
    return UsuarioRepository.update(id, disciplina)
  }

  static async delete(id: string) {
    return UsuarioRepository.delete(id)
  }
}