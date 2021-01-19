import IDisciplina from '../interfaces/disciplinaInterface'
import DisciplinaRepository from '../repositories/disciplinaRepository'

export default class DisciplinaService {
  static async get(id?: string): Promise<IDisciplina | IDisciplina[]> {
    if (id) {
      return DisciplinaRepository.findOneById(id)
    }
    return DisciplinaRepository.findAll()
  }

  static async post(disciplina: any): Promise<IDisciplina> {
    return DisciplinaRepository.save(disciplina)
  }

  static async update(id: string, disciplina: any): Promise<IDisciplina> {
    return DisciplinaRepository.update(id, disciplina)
  }

  static async delete(id: string): Promise<void> {
    await DisciplinaRepository.delete(id)
  }
}