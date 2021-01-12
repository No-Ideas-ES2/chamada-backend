import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import TurmaService from '../services/turmaService'


export default class TurmaController {
  static async get(req: Request, res: Response) {
    try {
      const { id } = req.params
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const result = await TurmaService.get(id)
      return res.status(200).json(result)
    } catch (error) {
      console.error(error)
      const { message } = error
      return res.status(500).json({ error: message })
    }
  }

  static async post(req: Request, res: Response) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const turma = await TurmaService.post(req.body)
      return res.status(201).json(turma)
    } catch (error) {
      console.error(error)
      const { message } = error
      return res.status(500).json({ error: message })
    }
  }

  static async put(req: Request, res: Response) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const id = req.params.id as string
      const turma = await TurmaService.update(id, req.body)
      return res.status(200).json(turma)
    } catch (error) {
      console.error(error)
      const { message } = error
      return res.status(500).json({ error: message })
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const id = req.params.id as string
      await TurmaService.delete(id)
      return res.sendStatus(200)
    } catch (error) {
      console.error(error)
      const { message } = error
      return res.status(500).json({ error: message })
    }
  }

  static async postAlunos(req: Request, res: Response) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const id = req.params.id as string
      const alunosId: string[] = req.body.alunosId
      const alunos = await TurmaService.postAlunos(id, alunosId)
      return res.status(201).json(alunos)
    } catch (error) {
      console.error(error)
      const { message } = error
      return res.status(500).json({ error: message })
    }
  }

  static async getAlunos(req: Request, res: Response) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const id = req.params.id as string
      const result = await TurmaService.getAlunos(id)
      return res.status(200).json(result)
    } catch (error) {
      console.error(error)
      const { message } = error
      return res.status(500).json({ error: message })
    }
  }
}