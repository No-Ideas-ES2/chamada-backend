import TurmaRepository from '../repositories/turmaRepository'

export default class TurmaService {
  static async get(id?: string) {
    if (id) {
      return TurmaRepository.findOneById(id)
    }
    return TurmaRepository.findAll()
  }

  static async post(turma: any) {
    return TurmaRepository.save(turma)
  }

  static async update(id: string, turma: any) {
    return TurmaRepository.update(id, turma)
  }

  static async delete(id: string) {
    return TurmaRepository.delete(id)
  }

  static async getAlunos(id: string) {
    return TurmaRepository.findAlunos(id)
  }

  static async postAlunos(id: string, alunosId: string[]) {
    return TurmaRepository.addAlunos(id, alunosId)
  }
}