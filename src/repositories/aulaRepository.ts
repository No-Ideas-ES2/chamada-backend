import IAula from '../interfaces/aulaInterface'
import PostgresClient from '../providers/postgresClient'

export default class AulaRepository {
  static selectList = 'id, turma, data, duracao, turma_id AS "turmaId", criado_em AS "criadoEm", atualizado_em AS "atualizadoEm"'

  static async findOneById(id: string): Promise<IAula> {
    const sql = `
    SELECT
      ${AulaRepository.selectList}
    FROM
      v_aula
    WHERE
      excluido_em IS NULL
      AND id = :id`

    const result = await PostgresClient.query(sql, { id })

    return result.rows[0]
  }

  static async findAll(turmaId?: string): Promise<IAula[]> {
    let sql = `
    SELECT
      ${AulaRepository.selectList}
    FROM
      v_aula
    WHERE
      excluido_em IS NULL`

    if (turmaId) {
      sql += `
      AND turma_id = :turmaId`
    }

    const result = await PostgresClient.query(sql, { turmaId })
    return result.rows
  }

  static async save(aula: any): Promise<IAula> {
    const sql = `
    INSERT INTO aula (
      turma_id, data, duracao
    )
    VALUES (
      :turmaId, :data, :duracao
    )
    RETURNING id`

    const result = await PostgresClient.query(sql, aula)
    return AulaRepository.findOneById(result.rows[0].id)
  }

  static async update(id: string, aula: any): Promise<IAula> {
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
    WHERE id = :id`

    await PostgresClient.query(sql, binds)
    return AulaRepository.findOneById(id)
  }

  static async delete(id: string) {
    const sql = `
    UPDATE aula
    SET excluido_em = NOW()
    WHERE id = : id`

    await PostgresClient.query(sql, { id })
  }
}