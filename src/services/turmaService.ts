import ITurma from '../interfaces/turmaInterface'
import IUsuario from '../interfaces/usuarioInterface'
import TurmaRepository from '../repositories/turmaRepository'

export default class TurmaService {
  static async get(id?: string): Promise<ITurma | ITurma[]> {
    if (id) {
      return TurmaRepository.findOneById(id)
    }
    return TurmaRepository.findAll()
  }

  static async post(turma: any): Promise<ITurma> {
    return TurmaRepository.save(turma)
  }

  static async update(id: string, turma: any): Promise<ITurma> {
    return TurmaRepository.update(id, turma)
  }

  static async delete(id: string) {
    return TurmaRepository.delete(id)
  }

  static async getAlunos(id: string): Promise<IUsuario[]> {
    return TurmaRepository.findAlunos(id)
  }

  static async postAlunos(id: string, alunosId: string[]): Promise<IUsuario[]> {
    return TurmaRepository.addAlunos(id, alunosId)
  }
}