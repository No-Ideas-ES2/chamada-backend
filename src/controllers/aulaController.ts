import { Request, Response } from 'express'
import TurmaRepository from '../repositories/turmaRepository'
import AulaService from '../services/aulaService'

export default class AulaController {
  static async get(req: Request, res: Response) {
    try {
      const { id } = req.params
      const result = await AulaService.get(id)
      return res.status(200).json(result)
    } catch (error) {
      console.error(error)
      const { message } = error
      return res.status(500).json({ error: message })
    }
  }

  static async post(req: Request, res: Response) {
    try {
      const msg = await AulaService.validaAula(req.body)
      if (msg) res.status(400).json({ error: msg })

      const { turmaId } = req.body
      const turma = await TurmaRepository.findOneById(turmaId)
      if (!turma) {
        return res.status(404).json({ error: 'Turma não encontrada!' })
      }

      const result = await AulaService.post(req.body)
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
      const aula = {
        id,
        ...req.body
      }
      const msg = await AulaService.validaAula(aula)
      if (msg) res.status(400).json({ error: msg })

      const result = await AulaService.update(id, req.body)
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
      await AulaService.delete(id)
      return res.sendStatus(200)
    } catch (error) {
      console.error(error)
      const { message } = error
      return res.status(500).json({ error: message })
    }
  }
}