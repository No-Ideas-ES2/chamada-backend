import PostgresClient from "../database/postgresClient"

export default class AulaModel {
  static async findOneById(id: string): Promise<any> {
    const sql = `
    SELECT
      a.id,
      d.codigo || '-' || t.descricao AS turma,
      a.data,
      a.duracao,
      a.criado_em,
      a.atualizado_em
    FROM
      aula a
      JOIN turma t ON t.turma_id = a.turma_id
      JOIN disciplina d ON d.disciplina_id = t.disciplina_id
    WHERE
      a.excluido_em IS NULL
      AND a.id = :id`

    const result = await PostgresClient.query(sql, { id })

    return result.rows[0]
  }

  static async findAll(): Promise<any> {
    const sql = `
    SELECT
      a.id,
      d.codigo || '-' || t.descricao AS turma,
      a.data,
      a.duracao,
      a.criado_em,
      a.atualizado_em
    FROM
      aula a
      JOIN turma t ON t.turma_id = a.turma_id
      JOIN disciplina d ON d.disciplina_id = t.disciplina_id
    WHERE
      a.excluido_em IS NULL`

    const result = await PostgresClient.query(sql)
    return result.rows
  }

  static async save(aula: any): Promise<any> {
    const sql = `
    INSERT INTO aula (
      turma_id, data, duracao
    )
    VALUES (
      :turmaId, :data, :duracao
    )
    RETURNING *`

    const result = await PostgresClient.query(sql, aula)
    return result.rows[0]
  }

  static async update(id: string, aula: any): Promise<any> {
    const values: string[] = []

    if (aula.data) {
      values.push('data = :data')
    }
    if (aula.duracao) {
      values.push('duracao = :duracao')
    }
    const binds = {
      id,
      ...aula
    }
    const sql = `
    UPDATE aula
    SET ${values.join(', ')}
    WHERE id = :id
    RETURNING *`

    const result = await PostgresClient.query(sql, binds)
    return result.rows
  }

  static async delete(id: string): Promise<any> {
    const sql = `
    UPDATE aula
    SET excluido_em = NOW()
    WHERE id = : id`

    const result = await PostgresClient.query(sql, { id })
  }
}