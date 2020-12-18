import { Request, Response } from 'express'
import ChamadaService from '../services/chamadaService'

export default class ChamadaController {
  static async get(req: Request, res: Response) {
    try {
      const { id } = req.params
      const result = await ChamadaService.get(id)
      return res.status(200).json(result)
    } catch (error) {
      console.error(error)
      const { message } = error
      return res.status(500).json({ error: message })
    }
  }

  static async post(req: Request, res: Response) {
    try {
      const result = await ChamadaService.post(req.body)
      return res.status(201).json(result)
    } catch (error) {
      console.error(error)
      const { message } = error
      return res.status(500).json({ error: message })
    }
  }

  static async put(req: Request, res: Response) {
    try {
      const { id } = req.params
      const result = await ChamadaService.update(id, req.body)
      return res.status(200).json(result)
    } catch (error) {
      console.error(error)
      const { message } = error
      return res.status(500).json({ error: message })
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params
      const result = await ChamadaService.delete(id)
      return res.status(200).json(result)
    } catch (error) {
      console.error(error)
      const { message } = error
      return res.status(500).json({ error: message })
    }
  }
}