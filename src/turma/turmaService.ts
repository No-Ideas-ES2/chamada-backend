import TurmaModel from './turmaModel'

export default class TurmaService {
  static async get(id?: string) {
    if (id) {
      return TurmaModel.findOneById(id)
    }
    return TurmaModel.findAll()
  }

  static async post(disciplina: any) {
    return TurmaModel.save(disciplina)
  }

  static async update(id: string, disciplina: any) {
    return TurmaModel.update(id, disciplina)
  }

  static async delete(id: string) {
    return TurmaModel.delete(id)
  }

  static async getAlunos(id: string) {
    return TurmaModel.findAlunos(id)
  }

  static async postAlunos(id: string, alunosId: string[]) {
    return TurmaModel.addAlunos(id, alunosId)
  }
}