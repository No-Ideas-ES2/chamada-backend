import PostgresClient from '../database/postgresClient'

export default class UsuarioModel {
  static selectList = ['id', 'nome', 'email', 'tipo', 'criado_em', 'atualizado_em', 'excluido_em']

  static async findOneById(id: string) {
    const sql = `
    SELECT
      ${UsuarioModel.selectList.join(',')}
    FROM
      usuario
    WHERE
      excluido_em IS NULL
      AND id = :id`

    const result = await PostgresClient.query(sql, { id })
    if (result.rowCount > 0)
      return result.rows[0]
    return undefined
  }

  static async findOneByEmail(email: string) {
    const sql = `
    SELECT
      ${UsuarioModel.selectList.join(',')}
    FROM
      usuario
    WHERE
      excluido_em IS NULL
      AND email = :id`

    const result = await PostgresClient.query(sql, { email })
    if (result.rowCount > 0)
      return result.rows[0]
    return undefined
  }

  static async findAll(tipo?: string) {
    let sql = `
    SSELECT
      ${UsuarioModel.selectList.join(',')}
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

  static async save(usuario: any) {
    const sql = `
    INSERT INTO 
      usuario (
        nome, email, senha, tipo
      )
    VALUES (
      :nome, :email, :senha, :tipo
    )`

    const result = await PostgresClient.query(sql, usuario)
    return result.rows
  }

  static async update(id: string, usuario: any) {
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

    const result = await PostgresClient.query(sql, binds)
    return result.rows
  }

  static async delete(id: string) {
    const sql = `
    UPDATE
      usuario
    SET excluido_em = NOW()
    WHERE id = :id`

    const result = await PostgresClient.query(sql, { id })
    return result
  }
}