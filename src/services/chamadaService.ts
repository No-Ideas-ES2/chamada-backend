import ChamadaRepository from "../repositories/chamadaRepository";

export default class ChamadaService {

  static async get(id?: string) {
    if (id) {
      return ChamadaRepository.findOneById(id)
    }
    return ChamadaRepository.findAll()
  }

  static async post(chamada: any) {
    return ChamadaRepository.save(chamada)
  }

  static async update(id: string, chamada: any) {
    return ChamadaRepository.update(id, chamada)
  }

  static async delete(id: string) {
    return ChamadaRepository.delete(id)
  }
}