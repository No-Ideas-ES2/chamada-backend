import { ReplaceObject } from 'pg-bind'
import ITurma from '../interfaces/turmaInterface'
import IUsuario from '../interfaces/usuarioInterface'
import PostgresClient from '../providers/postgresClient'
import UsuarioRepository from './usuarioRepository'

export default class TurmaRepository {
  static selectList = 'id, descricao, disciplina, professor, criado_em AS "criadoEm", atualizado_em AS "atualizadoEm"'

  static async findOneById(id: string): Promise<ITurma> {
    const sql = `
    SELECT
      ${TurmaRepository.selectList}
    FROM
      v_turma
    WHERE
      excluido_em IS NULL
      AND id = :id`

    const binds = { id }

    const result = await PostgresClient.query(sql, binds)
    return result.rows[0]
  }

  static async findAll(): Promise<ITurma[]> {
    const sql = `
    SELECT
      ${TurmaRepository.selectList}
    FROM
      v_turma
    WHERE
      excluido_em IS NULL`
    const result = await PostgresClient.query(sql)
    return result.rows
  }

  static async save(turma: any): Promise<ITurma> {
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
    RETURNING id`
    const result = await PostgresClient.query(sql, turma)
    return TurmaRepository.findOneById(result.rows[0].id)
  }

  static async update(id: string, turma: any): Promise<ITurma> {
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

    await PostgresClient.query(sql, binds)
    return TurmaRepository.findOneById(id)
  }

  static async delete(id: string) {
    const sql = `
    UPDATE
      turma
    SET excluido_em = NOW()
      WHERE id = : id`

    await PostgresClient.query(sql, { id })
  }

  static async addAlunos(turmaId: string, alunosId: string[]): Promise<IUsuario[]> {
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

    await PostgresClient.query(sql, binds)
    return TurmaRepository.findAlunos(turmaId)
  }

  static async findAlunos(turmaId: string): Promise<IUsuario[]> {
    const sql = `
    SELECT
      ${UsuarioRepository.selectList}
    FROM 
      usuario
      JOIN turma_alunos ta ON id = aluno_id
    WHERE
      excluido_em IS NULL
      AND turma_id = :turmaId`

    const result = await PostgresClient.query(sql, { turmaId })
    return result.rows
  }

  static async existAluno(turmaId: string, alunoId: string): Promise<boolean> {
    const sql = `
    SELECT
      COUNT(ta.aluno_id) AS "count"
    FROM 
      turma_alunos ta 
      JOIN usuario u ON u.id = aluno_id
      JOIN turma t ON t.id = turma_id
    WHERE
      u.excluido_em IS NULL
      AND t.excluido_em IS NULL
      AND turma_id = :turmaId
      AND aluno_id = :alunoId`

    const result = await PostgresClient.query(sql, { turmaId, alunoId })
    return result.rows[0].count > 0
  }
}