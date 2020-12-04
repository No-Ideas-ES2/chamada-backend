import DisciplinaModel from './disciplinaModel'

export default class DisciplinaService {
  static async get(id?: string) {
    if (id) {
      return DisciplinaModel.findOneById(id)
    }
    return DisciplinaModel.findAll()
  }

  static async post(disciplina: any) {
    return DisciplinaModel.save(disciplina)
  }

  static async update(id: string, disciplina: any) {
    return DisciplinaModel.update(id, disciplina)
  }

  static async delete(id: string) {
    return DisciplinaModel.delete(id)
  }
}