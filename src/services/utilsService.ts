export default class Utils {
  static addMinutos(data: Date, minutos: number): Date {
    return new Date(data.getTime() + minutos * 60000)
  }
}