export default class Utils {
  static addMinutos(data: Date, minutos: number): Date {
    return new Date(data.getTime() + minutos * 60000)
  }


  /**
   * Adiciona as horas no formato '00:00' em dataA
   */
  static addTime(dataA: Date, horas: string): Date {
    const [hora, minuto] = horas.split(':')
    const ret = new Date(dataA)
    ret.setHours(Number(hora))
    ret.setMinutes(Number(minuto))

    return ret
  }

  /**
   * Verifica se as datas se sobrepõem
   */
  static datasDobrepostas(inicioA: Date, finalA: Date, inicioB: Date, finalB: Date): Boolean {
    const tInicioA = inicioA.getTime()
    const tFinalA = finalA.getTime()
    const tInicioB = inicioB.getTime()
    const tFinalB = finalB.getTime()

    return (tInicioB >= tInicioA && tInicioB <= tFinalA) ||
      (tFinalB >= tInicioA && tFinalB <= tFinalA)
  }

  /**
   * Verifica se a dataB está entre inicioA e finalA
   */
  static dataDobreposta(inicioA: Date, finalA: Date, dataB: Date): Boolean {
    const tInicioA = inicioA.getTime()
    const tFinalA = finalA.getTime()
    const tDataB = dataB.getTime()

    return tDataB >= tInicioA && tDataB <= tFinalA
  }
}