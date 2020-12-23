import PostgresClient from "../providers/postgresClient"

export default class ChamadaRepository {
  static async findOneById(id: string): Promise<any> {
    const sql = `
    SELECT 
      id,
      aula_id
      data,
      carencia,
      turma,
      criado_em,
      atualizado_em
    FROM
      v_chamada
    WHERE
      excluido_em IS NULL
      AND id = :id
    `

    const result = await PostgresClient.query(sql, { id })
    return result.rows[0]
  }

  static async findAll(): Promise<any> {
    const sql = `
    SELECT 
      id,
      aula_id
      data,
      carencia,
      turma,
      criado_em,
      atualizado_em
    FROM
      v_chamada
    WHERE
      excluido_em IS NULL
    `

    const result = await PostgresClient.query(sql)
    return result.rows[0]
  }

  static async save(chamada: any): Promise<any> {
    const sql = `
    INSERT INTO chamada (
      aula_id, carencia
    )
    VALUES (
      :aulaId, :carencia
    )
    RETURNNING *`

    const result = await PostgresClient.query(sql, chamada)
    return result.rows[0]
  }

  static async update(id: string, chamada: any): Promise<any> {
    const values: string[] = []

    if (chamada.carencia) {
      values.push('carencia = :carencia')
    }

    const binds = {
      id,
      ...chamada
    }

    const sql = `
    UPDATE chamada
    SET ${values.join(', ')}
    WHERE id = :id
    RETURNIG *`

    const result = await PostgresClient.query(sql, binds)
    return result.rows[0]
  }

  static async delete(id: string): Promise<any> {
    const sql = `
    UPDATE chamada
    SET excluido_em = NOW()
    WHERE id = :id`

    const result = await PostgresClient.query(sql)
    return result.rows[0]
  }
}
