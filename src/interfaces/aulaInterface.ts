import IBase from './baseInterface'

export default interface IAula extends IBase {
  data?: Date
  inicio: Date
  final: Date
  duracao: number
  turma: string
  turmaId: string
}