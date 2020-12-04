import { Pool } from 'pg'
import bind from 'pg-bind'

import databaseConfig from '../config/databaseConfig'

export default class PostgresClient {

  static async query(sql: string, binds?: { [key: string]: any }) {
    try {
      const pool = PostgresClient.getPool()
      const prepared = bind(sql, binds || {})
      const result = await pool.query(prepared.text, prepared.values)
      return result
    } catch (err) {
      const message: string[] = [err.code]
      if (err.message) message.push(err.message)
      if (err.detail) message.push(err.detail)
      throw new Error(`[PostgresClient] ${message.join(' - ')}`)
    }
  }

  private static getPool() {
    return new Pool(databaseConfig)
  }
}