import AulaModel from "../models/aulaModels";

export default class AulaService {

  static async get(id?: string) {
    if (id) {
      return AulaModel.findOneById(id)
    }
    return AulaModel.findAll()
  }

  static async post(aula: any) {
    return AulaModel.save(aula)
  }

  static async update(id: string, aula: any) {
    return AulaModel.update(id, aula)
  }

  static async delete(id: string) {
    return AulaModel.delete(id)
  }
}