import ChamadaModel from "../models/chamadaModel";

export default class ChamadaService {

  static async get(id?: string) {
    if (id) {
      return ChamadaModel.findOneById(id)
    }
    return ChamadaModel.findAll()
  }

  static async post(chamada: any) {
    return ChamadaModel.save(chamada)
  }

  static async update(id: string, chamada: any) {
    return ChamadaModel.update(id, chamada)
  }

  static async delete(id: string) {
    return ChamadaModel.delete(id)
  }
}