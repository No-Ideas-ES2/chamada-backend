import { Request, Response } from 'express'
import PresencaService from '../services/presencaService'

export default class PresencaController {
  static async getAllByAluno(req: Request, res: Response) {
    try {
      const { alunoId } = req.params
      const result = await PresencaService.getAllByAluno(alunoId)
      return res.status(200).json(result)
    } catch (error) {
      console.error(error)
      const { message } = error
      return res.status(500).json({ error: message })
    }
  }

  static async getAllByAula(req: Request, res: Response) {
    try {
      const { aulaId } = req.params
      const result = await PresencaService.getAllByAula(aulaId)
      return res.status(200).json(result)
    } catch (error) {
      console.error(error)
      const { message } = error
      return res.status(500).json({ error: message })
    }
  }

  static async getAllByChamada(req: Request, res: Response) {
    try {
      const { chamadaId } = req.params
      const result = await PresencaService.getAllByChamada(chamadaId)
      return res.status(200).json(result)
    } catch (error) {
      console.error(error)
      const { message } = error
      return res.status(500).json({ error: message })
    }
  }

  static async save(req: Request, res: Response) { }
}