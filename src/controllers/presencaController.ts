import { Request, Response } from 'express'
import PresencaService from '../services/presencaService'

export default class PresencaController {
  static async getAllByAluno(req: Request, res: Response) {
    try {
      const { id } = req.params
      const result = await PresencaService.getAllByAluno(id)
      return res.status(200).json(result)
    } catch (error) {
      console.error(error)
      const { message } = error
      return res.status(500).json({ error: message })
    }
  }

  static async getAllByAula(req: Request, res: Response) {
    try {
      const { id } = req.params
      const result = await PresencaService.getAllByAula(id)
      return res.status(200).json(result)
    } catch (error) {
      console.error(error)
      const { message } = error
      return res.status(500).json({ error: message })
    }
  }

  static async getAllByChamada(req: Request, res: Response) {
    try {
      const { id } = req.params
      const result = await PresencaService.getAllByChamada(id)
      return res.status(200).json(result)
    } catch (error) {
      console.error(error)
      const { message } = error
      return res.status(500).json({ error: message })
    }
  }

  static async save(req: Request, res: Response) {
    try {
      await PresencaService.save(req.body)
      return res.sendStatus(201)
    } catch (error) {
      console.error(error)
      const { message } = error
      return res.status(500).json({ error: message })
    }
  }
}