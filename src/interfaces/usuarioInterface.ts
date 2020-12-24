import IBase from "./baseInterface";

export enum EnumTipoUsuario {
  ADMIN = 'admin',
  ALUNO = 'aluno',
  PROFESSOR = 'professor'
}

export default interface IUsuario extends IBase {
  nome: string
  email: string
  tipo: EnumTipoUsuario
}