import { PoolConfig } from 'pg'
import { SessionOptions } from 'express-session'
import dotenv from 'dotenv'

dotenv.config()

const config: { database: PoolConfig, session: SessionOptions } = {
  database: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    },
  },
  session: {
    secret: process.env.SESSION_SECRET || '',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      secure: 'auto',
      maxAge: Number(process.env.SESSION_MAX_AGE),
    },
  }
}

export default config