import DisciplinaRepository from '../repositories/disciplinaRepository'

export default class DisciplinaService {
  static async get(id?: string) {
    if (id) {
      return DisciplinaRepository.findOneById(id)
    }
    return DisciplinaRepository.findAll()
  }

  static async post(disciplina: any) {
    return DisciplinaRepository.save(disciplina)
  }

  static async update(id: string, disciplina: any) {
    return DisciplinaRepository.update(id, disciplina)
  }

  static async delete(id: string) {
    return DisciplinaRepository.delete(id)
  }
}