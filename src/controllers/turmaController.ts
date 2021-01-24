import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import DisciplinaRepository from '../repositories/disciplinaRepository'
import TurmaRepository from '../repositories/turmaRepository'
import UsuarioRepository from '../repositories/usuarioRepository'
import DisciplinaService from '../services/disciplinaService'
import TurmaService from '../services/turmaService'
import UsuarioService from '../services/usuarioService'
import UsuarioController from './usuarioController'


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
      const { disciplinaId, professorId } = req.body

      const disciplina = await DisciplinaRepository.findOneById(disciplinaId)
      if (!disciplina) {
        return res.status(404).json({ error: 'Disciplina não encontrada!' })
      }

      const professor = await UsuarioRepository.findOneById(professorId)
      if (!professor) {
        return res.status(404).json({ error: 'Professor não encontrado!' })
      }
      if (professor.tipo !== 'professor') {
        return res.status(400).json({ error: 'Usuário informado não é "professor"!' })
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
      let turma = await TurmaRepository.findOneById(id)
      if (!turma) {
        return res.status(404).json({ error: 'Turma não encontrada!' })
      }

      const { disciplinaId, professorId } = req.body
      if (disciplinaId) {
        const disciplina = await DisciplinaRepository.findOneById(disciplinaId)
        if (!disciplina) {
          return res.status(404).json({ error: 'Disciplina não encontrada!' })
        }
      }

      if (professorId) {
        const professor = await UsuarioRepository.findOneById(professorId)
        if (!professor) {
          return res.status(404).json({ error: 'Professor não encontrado!' })
        }
        if (professor.tipo !== 'professor') {
          return res.status(400).json({ error: 'Usuário informado não é "professor"!' })
        }
      }


      turma = await TurmaService.update(id, req.body)
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
      let turma = await TurmaRepository.findOneById(id)
      if (!turma) {
        return res.status(404).json({ error: 'Turma não encontrada!' })
      }
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
      let turma = await TurmaRepository.findOneById(id)
      if (!turma) {
        return res.status(404).json({ error: 'Turma não encontrada!' })
      }

      const alunosId: string[] = req.body.alunosId
      let alunoErrors = false
      const promises = alunosId.map((alunoId) => {
        return UsuarioRepository.findOneById(alunoId)
      });

      Promise.all(promises).then((values) => {
        alunoErrors = values.some((aluno) => { (!aluno || aluno.tipo !== 'aluno') })
      })

      if (alunoErrors) {
        return res.status(400).json({ error: 'Um ou mais aluno inválido!' })
      }

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
      let turma = await TurmaRepository.findOneById(id)
      if (!turma) {
        return res.status(404).json({ error: 'Turma não encontrada!' })
      }

      const result = await TurmaService.getAlunos(id)
      return res.status(200).json(result)
    } catch (error) {
      console.error(error)
      const { message } = error
      return res.status(500).json({ error: message })
    }
  }
}