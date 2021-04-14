import { injectable, inject } from 'tsyringe'

import logging from '@shared/infra/log'

import ICriptoDTO from '../dtos/ICriptoDTO'
import Cripto from '../infra/typeorm/entities/Cripto'
import ICriptoRepository from '../repositories/ICriptoRepository'

@injectable()
class CreateCriptoService {
  constructor (
    @inject('CriptoRepository')
    private criptoRepository: ICriptoRepository
  ) {}

  public async execute (cripto: ICriptoDTO): Promise<Cripto> {
    try {
      return await this.criptoRepository.create(cripto)
    } catch (error) {
      logging.error('CreateCriptService', 'execute', error.message)
    }
  }
}

export default CreateCriptoService
