import IDisciplina from '../interfaces/disciplinaInterface'
import PostgresClient from '../providers/postgresClient'

export default class DisciplinaRepository {
  static selectList = 'id, codigo, nome, criado_em AS "criadoEm", atualizado_em AS "atualizadoEm"'

  static async findOneById(id: string): Promise<IDisciplina> {
    const sql = `
    SELECT
      ${DisciplinaRepository.selectList}
    FROM
      disciplina
    WHERE
      excluido_em IS NULL
      AND id = :id`

    const binds = { id }

    const result = await PostgresClient.query(sql, binds)

    return result.rows[0]

  }

  static async findAll(): Promise<IDisciplina[]> {
    const sql = `
    SELECT
      ${DisciplinaRepository.selectList}
    FROM
      disciplina
    WHERE
      excluido_em IS NULL`
    const result = await PostgresClient.query(sql)
    return result.rows
  }

  static async save(disciplina: any): Promise<IDisciplina> {
    const sql = `
    INSERT INTO 
      disciplina (
        codigo, nome
      )
    VALUES (
      :codigo, :nome
    )
    RETURNING id`
    const result = await PostgresClient.query(sql, disciplina)
    return DisciplinaRepository.findOneById(result.rows[0].id)
  }

  static async update(id: string, disciplina: any): Promise<IDisciplina> {
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

    await PostgresClient.query(sql, binds)
    return await DisciplinaRepository.findOneById(id)
  }

  static async delete(id: string): Promise<void> {
    const sql = `
    UPDATE
      disciplina
    SET excluido_em = NOW()
    WHERE id = :id`

    await PostgresClient.query(sql, { id })
  }
}