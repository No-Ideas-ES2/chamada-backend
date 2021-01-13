import IChamada from '../interfaces/chamadaInterface'
import PostgresClient from '../providers/postgresClient'

export default class ChamadaRepository {
  static selectList = `
    id,
    inicio,
    final,
    carencia,
    turma,
    turma_id AS "turmaId",
    aula_id AS "aulaId",
    criado_em AS "criadoEm",
    atualizado_em "atualizadoEm"`

  static async findOneById(id: string): Promise<IChamada> {
    const sql = `
    SELECT 
      ${ChamadaRepository.selectList}
    FROM
      v_chamada
    WHERE
      excluido_em IS NULL
      AND id = :id
    `

    const result = await PostgresClient.query(sql, { id })
    return result.rows[0]
  }

  static async findAll(aulaId?: string): Promise<IChamada[]> {
    let sql = `
    SELECT 
      ${ChamadaRepository.selectList}
    FROM
      v_chamada
    WHERE
      excluido_em IS NULL`

    if (aulaId) {
      sql += `
      AND aula_id = :aulaId`
    }

    const result = await PostgresClient.query(sql, { aulaId })
    return result.rows
  }

  static async save(chamada: any): Promise<IChamada> {
    const sql = `
    INSERT INTO chamada (
      aula_id, carencia, hora
    )
    VALUES (
      :aulaId, :carencia, :hora
    )
    RETURNING id`

    const result = await PostgresClient.query(sql, chamada)
    return ChamadaRepository.findOneById(result.rows[0].id)
  }

  static async update(id: string, chamada: any): Promise<IChamada> {
    const values: string[] = []

    if (chamada.carencia) {
      values.push('carencia = :carencia')
    }
    if (chamada.hora) {
      values.push('hora = :hora')
    }

    const binds = {
      id,
      ...chamada
    }

    const sql = `
    UPDATE chamada
    SET ${values.join(', ')}
    WHERE id = :id`

    await PostgresClient.query(sql, binds)
    return ChamadaRepository.findOneById(id)
  }

  static async delete(id: string) {
    const sql = `
    UPDATE chamada
    SET excluido_em = NOW()
    WHERE id = :id`

    await PostgresClient.query(sql, { id })
  }
}
