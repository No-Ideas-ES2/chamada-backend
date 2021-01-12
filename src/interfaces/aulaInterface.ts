import IBase from './baseInterface'

export default interface IAula extends IBase {
  data: Date
  duracao: number
  turma: string
  turmaId: string
}