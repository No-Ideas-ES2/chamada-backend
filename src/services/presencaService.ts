import IPresenca from '../interfaces/presencaInterface'
import PresencaRepository from '../repositories/presencaRepository'

export default class PresencaService {

  static async getAllByAluno(alunoId: string): Promise<IPresenca[]> {
    return PresencaRepository.findByAluno(alunoId)
  }

  static async getAllByChamada(chamadaId: string): Promise<IPresenca[]> {
    return PresencaRepository.findByChamada(chamadaId)
  }

  static async getAllByAula(aulaId: string): Promise<IPresenca[]> {
    return PresencaRepository.findByAula(aulaId)
  }

  static async save(presenca: any) {
    await PresencaRepository.save(presenca)
  }

}