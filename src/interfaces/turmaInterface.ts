import IBase from "./baseInterface";
import IDisciplina from "./disciplinaInterface";
import IUsuario from "./usuarioInterface";

export default interface ITurma extends IBase {
  descricao: string
  disciplinaId: string
  professorId: string
}