import express from 'express'
import session from 'express-session'
import cors from 'cors'
import bodyParser from 'body-parser'

import router from './routes/routes'
import protectedRouter from './routes/protected.routes'
import config from './config'
import { authorize } from './auth/authorization'


class App {
  express: express.Application

  constructor() {
    this.express = express()

    this.express.disable('x-powered-by')
    this.express.disable('etag')

    this.express.use(session(config.session))

    this.express.use(cors({
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true
    }))
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: true }))


    this.express.use('/', router)
    this.express.use('/', authorize)
    this.express.use('/', protectedRouter)
  }
}

export default new App()