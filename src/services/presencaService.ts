import PresencaRepository from "../repositories/presencaRepository";

export default class PresencaService {

  static async getAllByAluno(alunoId: string): Promise<any> {
    return PresencaRepository.findByUser(alunoId)
  }

  static async getAllByChamada(chamadaId: string): Promise<any> {
    return PresencaRepository.findByCall(chamadaId)
  }

  static async getAllByAula(aulaId: string): Promise<any> {
    return PresencaRepository.findByClass(aulaId)
  }

  static async save(presenca: any): Promise<any> {
    return PresencaRepository.save(presenca)
  }

}