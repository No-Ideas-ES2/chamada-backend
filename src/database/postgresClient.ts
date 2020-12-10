import { Pool } from 'pg'
import bind, { BindInfo, ReplaceObject } from 'pg-bind'

import databaseConfig from '../config/databaseConfig'

export default class PostgresClient {

  static async query(sql: string, binds?: ReplaceObject | ReplaceObject[]) {
    try {
      const pool = PostgresClient.getPool()

      let prepared: BindInfo
      if (Array.isArray(binds)) {
        prepared = bind.insert(sql, binds)
      } else {
        prepared = bind(sql, binds || {})
      }
      console.log(prepared)
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