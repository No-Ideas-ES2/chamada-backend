import IUsuario from '../interfaces/usuarioInterface'
import PostgresClient from '../providers/postgresClient'

export default class UsuarioRepository {
  static selectList = 'id, nome, email, tipo, criado_em AS "criadoEm", atualizado_em AS "atualizadoEm"'

  static async findOneById(id: string): Promise<IUsuario> {
    const sql = `
    SELECT
      ${UsuarioRepository.selectList}
    FROM
      usuario
    WHERE
      excluido_em IS NULL
      AND id = :id`

    const result = await PostgresClient.query(sql, { id })
    return result.rows[0]
  }

  static async findOneByEmail(email: string): Promise<IUsuario> {
    const sql = `
    SELECT
      ${UsuarioRepository.selectList}
    FROM
      usuario
    WHERE
      excluido_em IS NULL
      AND email = :email`

    const result = await PostgresClient.query(sql, { email })
    return result.rows[0]
  }

  static async findAll(tipo?: string): Promise<IUsuario[]> {
    let sql = `
    SELECT
      ${UsuarioRepository.selectList}
    FROM
      usuario
    WHERE
      excluido_em IS NULL`

    if (tipo) {
      sql += `
      AND tipo = :tipo`
    }

    const result = await PostgresClient.query(sql, { tipo })
    return result.rows
  }

  static async save(usuario: any): Promise<IUsuario> {
    const sql = `
    INSERT INTO 
      usuario (
        nome, email, senha, tipo
      )
    VALUES (
      :nome, :email, :senha, :tipo
    )
    RETURNING id`

    const result = await PostgresClient.query(sql, usuario)
    return UsuarioRepository.findOneById(result.rows[0].id)
  }

  static async update(id: string, usuario: any): Promise<IUsuario> {
    const values: string[] = []

    if (usuario.nome) {
      values.push('nome = :nome')
    }
    if (usuario.email) {
      values.push('email = :email')
    }
    if (usuario.senha) {
      values.push('senha = :senha')
    }

    const binds = {
      id,
      ...usuario
    }

    const sql = `
    UPDATE
      usuario
    SET ${values.join(', ')}
    WHERE id = :id`

    await PostgresClient.query(sql, binds)
    return UsuarioRepository.findOneById(id)
  }

  static async delete(id: string) {
    const sql = `
    UPDATE
      usuario
    SET excluido_em = NOW()
      WHERE id = :id`

    await PostgresClient.query(sql, { id })
  }
}