import AulaRepository from "../repositories/aulaRepository";

export default class AulaService {

  static async get(id?: string) {
    if (id) {
      return AulaRepository.findOneById(id)
    }
    return AulaRepository.findAll()
  }

  static async post(aula: any) {
    return AulaRepository.save(aula)
  }

  static async update(id: string, aula: any) {
    return AulaRepository.update(id, aula)
  }

  static async delete(id: string) {
    return AulaRepository.delete(id)
  }
}