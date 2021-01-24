import IPresenca from '../interfaces/presencaInterface'
import PostgresClient from '../providers/postgresClient'

export default class PresencaRepository {
  static selectList = `
  aula_id AS "aulaId",
  chamada_id AS "chamadaId",
  aluno_id AS "alunoId",
  data,
  aluno,
  turma`

  static async findByAluno(alunoId: string): Promise<IPresenca[]> {
    const sql = `
    SELECT
      ${PresencaRepository.selectList}
    FROM
      v_presenca
    WHERE
      aluno_id = :alunoId`

    const result = await PostgresClient.query(sql, { alunoId })
    return result.rows
  }

  static async findByChamada(chamadaId: string): Promise<IPresenca[]> {
    const sql = `
    SELECT
      ${PresencaRepository.selectList}
    FROM
      v_presenca
    WHERE
      chamada_id = :chamadaId`

    const result = await PostgresClient.query(sql, { chamadaId })
    return result.rows
  }

  static async findByAula(aulaId: string): Promise<IPresenca[]> {
    const sql = `
    SELECT
      ${PresencaRepository.selectList}
    FROM
      v_presenca
    WHERE
      aula_id = :aulaId`

    const result = await PostgresClient.query(sql, { aulaId })
    return result.rows
  }

  static async save(presenca: any) {
    const sql = `
    INSERT INTO presenca (
      chamada_id, aluno_id, data
    )
    VALUES (
      :chamadaId, :alunoId, :agora
    )`

    await PostgresClient.query(sql, presenca)
  }
}