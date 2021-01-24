import { Request, Response } from 'express'
import ChamadaRepository from '../repositories/chamadaRepository'
import UsuarioRepository from '../repositories/usuarioRepository'
import PresencaService from '../services/presencaService'
import TurmaService from '../services/turmaService'
import Utils from '../services/utilsService'
import UsuarioController from './usuarioController'

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
      const agora = new Date()
      const { chamadaId, alunoId } = req.body
      const chamada = await ChamadaRepository.findOneById(chamadaId)
      if (!chamada) {
        return res.status(404).json({ error: 'Chamada não encontrada!' })
      }
      if (!Utils.dataDobreposta(chamada.inicio, chamada.final, agora)) {
        return res.status(400).json({ error: 'Tentativa de presença fora do intervalo permitido pela chamada!' })
      }

      const aluno = await UsuarioRepository.findOneById(alunoId)
      if (!aluno || aluno.tipo !== 'aluno') {
        return res.status(404).json({ error: 'Aluno não econtrado!' })
      }

      const alunoTurma = await TurmaService.existAluno(chamada.turmaId, alunoId)
      if (!alunoTurma) {
        return res.status(400).json({ error: 'Aluno não regitrado pra essa turma!' })
      }

      await PresencaService.save({ chamadaId, alunoId, agora })
      return res.sendStatus(201)
    } catch (error) {
      console.error(error)
      const { message } = error
      return res.status(500).json({ error: message })
    }
  }
}