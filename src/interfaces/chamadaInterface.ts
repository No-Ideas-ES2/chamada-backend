import IBase from './baseInterface'

export default interface IChamada extends IBase {
  carencia: number
  inicio: Date
  final: Date
  hora?: string
  turma: string
  turmaId: string
  aulaId: string
}