import PostgresClient from '../database/postgresClient'

export default class DisciplinaModel {
  static selectList = ['id', 'codigo', 'nome', 'criado_em', 'atualizado_em', 'excluido_em']

  static async findOneById(id: string) {
    const sql = `
    SELECT
      ${DisciplinaModel.selectList.join(',')}
    FROM
      disciplina
    WHERE
      excluido_em IS NULL
      AND id = :id`

    const binds = { id }

    const result = await PostgresClient.query(sql, binds)

    if (result.rowCount > 0)
      return result.rows
    return undefined
  }

  static async findAll() {
    const sql = `
    SELECT
      ${DisciplinaModel.selectList.join(',')}
    FROM
      disciplina
    WHERE
      excluido_em IS NULL`
    const result = await PostgresClient.query(sql)
    return result.rows
  }

  static async save(disciplina: any) {
    const sql = `
    INSERT INTO 
      disciplina (
        codigo, nome
      )
    VALUES (
      :codigo, :nome
    )`
    const result = await PostgresClient.query(sql, disciplina)
    return result.rows
  }

  static async update(id: string, disciplina: any) {
    const values: string[] = []

    if (disciplina.codigo) {
      values.push('codigo = :codigo')
    }
    if (disciplina.nome) {
      values.push('nome = :nome')
    }
    const binds = {
      id,
      ...disciplina
    }
    const sql = `
    UPDATE
      disciplina
    SET ${values.join(', ')}
    WHERE id = :id`

    const result = await PostgresClient.query(sql, binds)
    return result.rows
  }

  static async delete(id: string) {
    const sql = `
    UPDATE
      disciplina
    SET excluido_em = NOW()
    WHERE id = :id`

    const result = await PostgresClient.query(sql, { id })
    return result
  }
}