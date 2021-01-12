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

  static async validaAula(nAula: { id?: string, turmaId: string, data: Date, duracao: number }): Promise<string | undefined> {
    if (nAula.id) {
      const aula = await AulaRepository.findOneById(nAula.id)

      if (!nAula.data) nAula.data = aula.data
      if (!nAula.duracao) nAula.duracao = aula.duracao
      if (!nAula.turmaId) nAula.turmaId = aula.turmaId
    }

    const nInicio = nAula.data.getTime()
    const nFinal = Utils.addMinutos(nAula.data, nAula.duracao).getTime()

    const aulas = (await AulaRepository.findAll(nAula.turmaId))
      .filter((aula) => {
        const inicio = aula.data.getTime()
        const final = Utils.addMinutos(aula.data, aula.duracao).getTime()

        return (nAula.id !== aula.id) && (
          (inicio >= nInicio && inicio <= nFinal) || (final >= nInicio && final <= nFinal)
        )
      })

    if (aulas.length > 0) {
      return `Horário de aula informado para essa turma possui conflito com outra(s) ${aulas.length} aula(s).`
    }
  }
}