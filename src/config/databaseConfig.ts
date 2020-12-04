import { PoolConfig } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const databaseConfig: PoolConfig = {
  connectionString: process.env.PG_URL,
  ssl: {
    rejectUnauthorized: false
  },
}

export default databaseConfig