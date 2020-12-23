import PresencaModel from "../models/presencaModel";
import UsuarioModel from "../usuario/usuarioModel";

export default class PresencaService {

  static async getAllByAluno(alunoId: string): Promise<any> {
    return PresencaModel.findByUser(alunoId)
  }

  static async getAllByChamada(chamadaId: string): Promise<any> {
    return PresencaModel.findByCall(chamadaId)
  }

  static async getAllByAula(aulaId: string): Promise<any> {
    return PresencaModel.findByClass(aulaId)
  }

  static async save(presenca: any): Promise<any> {
    return PresencaModel.save(presenca)
  }

}