import express, { Request, Response, NextFunction, Errback } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import router from './routes/routes'

class App {
  express: express.Application

  constructor() {
    this.express = express()

    this.express.disable('x-powered-by')
    this.express.disable('etag')

    this.express.use(cors({
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true
    }))
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: true }))

    this.express.use('/', router)

  }
}

export default new App()