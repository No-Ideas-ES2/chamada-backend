import IAula from '../interfaces/aulaInterface'
import AulaRepository from '../repositories/aulaRepository'
import Utils from './utilsService'

export default class AulaService {

  static async get(id?: string): Promise<IAula | IAula[]> {
    if (id) {
      return AulaRepository.findOneById(id)
    }
    return AulaRepository.findAll()
  }

  static async post(aula: any): Promise<IAula> {

    return AulaRepository.save(aula)
  }

  static async update(id: string, aula: any): Promise<IAula> {
    return AulaRepository.update(id, aula)
  }

  static async delete(id: string) {
    return AulaRepository.delete(id)
  }

  static async validaAula(nAula: IAula): Promise<string | undefined> {
    if (nAula.id) {
      const aula = await AulaRepository.findOneById(nAula.id)
      if (!aula) return 'Aula não existe!'

      if (nAula.data) aula.inicio = nAula.data
      if (nAula.duracao) aula.duracao = nAula.duracao
      if (nAula.turmaId) aula.turmaId = nAula.turmaId

      nAula = aula
    }

    nAula.final = Utils.addMinutos(nAula.inicio, nAula.duracao)

    const aulas = (await AulaRepository.findAll(nAula.turmaId))
      .filter((aula) => {
        return (nAula.id !== aula.id) &&
          Utils.datasDobrepostas(nAula.inicio, nAula.final, aula.inicio, aula.final)
      })

    if (aulas.length > 0) {
      return `Horário de aula informado para essa turma possui conflito com outra(s) ${aulas.length} aula(s).`
    }
  }
}