import PostgresClient from "../database/postgresClient"

export default class PresencaModel {
  static async findByUser(alunoId: string): Promise<any> {
    const sql = `
    SELECT
      aula_id,
      chamada_id,
      aluno_id,
      data,
      nome,
      turma
    FROM
      v_presenca
    WHERE
      aluno_id = :alunoId`

    const result = await PostgresClient.query(sql, { alunoId })
    return result.rows[0]
  }

  static async findByCall(chamadaId: string): Promise<any> {
    const sql = `
    SELECT
      aula_id,
      chamada_id,
      aluno_id,
      data,
      nome,
      turma
    FROM
      v_presenca
    WHERE
      chamada_id = :chamadaId`

    const result = await PostgresClient.query(sql, { chamadaId })
    return result.rows[0]
  }

  static async findByClass(aulaId: string): Promise<any> {
    const sql = `
    SELECT
      aula_id,
      chamada_id,
      aluno_id,
      data,
      nome,
      turma
    FROM
      v_presenca
    WHERE
      aula_id = :aulaId`

    const result = await PostgresClient.query(sql, { aulaId })
    return result.rows[0]
  }

  static async save(presenca: any): Promise<any> {
    const sql = `
    INSERT INTO presenca (
      chamada_id, aluno_id, data
    )
    VALUES (
      :chamadaId, :alunoId, :data
    )`

    const result = await PostgresClient.query(sql, presenca)
    return result.rows[0]

  }
}