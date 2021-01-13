import IChamada from '../interfaces/chamadaInterface'
import AulaRepository from '../repositories/aulaRepository'
import ChamadaRepository from '../repositories/chamadaRepository'
import Utils from './utilsService'

export default class ChamadaService {

  static async get(id?: string): Promise<IChamada | IChamada[]> {
    if (id) {
      return ChamadaRepository.findOneById(id)
    }
    return ChamadaRepository.findAll()
  }

  static async post(chamada: any): Promise<IChamada> {
    return ChamadaRepository.save(chamada)
  }

  static async update(id: string, chamada: any): Promise<IChamada> {
    return ChamadaRepository.update(id, chamada)
  }

  static async delete(id: string) {
    return ChamadaRepository.delete(id)
  }

  static async validaChamada(nChamada: IChamada): Promise<string | undefined> {
    if (nChamada.id) {
      const chamada = await ChamadaRepository.findOneById(nChamada.id)
      if (!chamada) return 'Chamada informada não existe!'

      if (nChamada.carencia) chamada.carencia = nChamada.carencia
      if (nChamada.hora) chamada.hora = nChamada.hora
      else chamada.hora = chamada.inicio.toLocaleTimeString()
      if (nChamada.aulaId) chamada.aulaId = nChamada.aulaId

      nChamada = chamada
    }

    const aula = await AulaRepository.findOneById(nChamada.aulaId)
    if (!aula) return 'Aula informada não existe!'

    if (nChamada.carencia === 0) nChamada.carencia = aula.duracao
    else if (nChamada.carencia > aula.duracao) return 'Tempo de carência da Chamada é maior que a duração da Aula!'

    nChamada.inicio = Utils.addTime(aula.inicio, nChamada.hora!)
    nChamada.final = Utils.addMinutos(nChamada.inicio, nChamada.carencia)

    if (
      !Utils.dataDobreposta(aula.inicio, aula.final, nChamada.inicio) ||
      !Utils.dataDobreposta(aula.inicio, aula.final, nChamada.final)
    ) return `Duração da Chamada (${nChamada.final.toLocaleTimeString()} - ${nChamada.final.toLocaleTimeString()})` +
      ` está fora da duração da Aula (${aula.inicio.toLocaleTimeString()} - ${aula.final.toLocaleTimeString()})`


    const chamadas = (await ChamadaRepository.findAll(nChamada.aulaId))
      .filter((chamada) => {

        return (nChamada.id !== chamada.id) &&
          Utils.datasDobrepostas(nChamada.inicio, nChamada.final, chamada.inicio, chamada.final)
      })

    if (chamadas.length > 0) {
      return `Horário de chamada informado para essa aula possui conflito com outra(s) ${chamadas.length} chamadas(s).`
    }
  }
}