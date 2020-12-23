import { ReplaceObject } from 'pg-bind'
import PostgresClient from '../providers/postgresClient'
import UsuarioRepository from './usuarioRepository'

export default class TurmaRepository {
  static selectList = ['id', 'descricao', 'codigo', 'tipo', 'criado_em', 'atualizado_em', 'excluido_em']

  static async findOneById(id: string) {
    const sql = `
    SELECT
      t.id,
      t.descricao,
      d.codigo ||
      ' - ' ||
      d.nome  AS  disciplina,
      u.nome  AS  professor,
      t.criado_em,
      t.atualizado_em
    FROM
      turma   t
      JOIN disciplina   d ON d.id = t.disciplina_id
      JOIN usuario      u ON u.id = y.professor_id
    WHERE
      excluido_em IS NULL
      AND id = :id`

    const binds = { id }

    const result = await PostgresClient.query(sql, binds)

    if (result.rowCount > 0)
      return result.rows[0]
    return undefined
  }

  static async findAll() {
    const sql = `
    SELECT
      t.id,
      t.descricao,
      d.codigo ||
      ' - ' ||
      d.nome  AS  disciplina,
      u.nome  AS  professor,
      t.criado_em,
      t.atualizado_em
    FROM
      turma   t
      JOIN disciplina   d ON d.id = t.disciplina_id
      JOIN usuario      u ON u.id = y.professor_id
    WHERE
      excluido_em IS NULL`
    const result = await PostgresClient.query(sql)
    return result.rows
  }

  static async save(turma: any) {
    const sql = `
    INSERT INTO 
      turma (
        disciplina_id,
        professor_id,
        descricao
      )
    VALUES (
      :disciplinaId,
      :professorId,
      :descricao
    )
    RETURNING *`
    const result = await PostgresClient.query(sql, turma)
    return result.rows[0]
  }

  static async update(id: string, turma: any) {
    const values: string[] = []

    if (turma.descricao) {
      values.push('descricao = :descricao')
    }
    if (turma.professorId) {
      values.push('professor_id = :professorId')
    }
    const binds = {
      id,
      ...turma
    }
    const sql = `
    UPDATE
    turma
    SET ${values.join(', ')}
    WHERE id = :id`

    const result = await PostgresClient.query(sql, binds)
    return result.rows
  }

  static async delete(id: string) {
    const sql = `
    UPDATE
    turma
    SET excluido_em = NOW()
    WHERE id = : id`

    const result = await PostgresClient.query(sql, { id })
    return result
  }

  static async addAlunos(turmaId: string, alunosId: string[]) {
    const sql = `
    INSERT INTO
      turma_alunos (
        turma_id,
        aluno_id
      )
    VALUES(
      :turmaId,
      :alunoId
    )
    RETURNING *`

    const binds: ReplaceObject[] = alunosId.map((alunoId) => ({
      turmaId,
      alunoId
    }))

    const result = await PostgresClient.query(sql, binds)
    return result.rows
  }

  static async findAlunos(turmaId: string) {
    const sql = `
    SELECT
      ${UsuarioRepository.selectList.join(',')}
    FROM 
      usuario
    WHERE
      excluido_em IS NULL
      AND usuario_id IN (
        SELECT
          aluno_id
        FROM
          turma_alunos
        WHERE
          turma_id = :turmaId
      )
    `
    const result = await PostgresClient.query(sql, { turmaId })
    return result.rows
  }
}