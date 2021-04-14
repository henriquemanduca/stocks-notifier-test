import { injectable, inject } from 'tsyringe'

import Cripto from '../infra/typeorm/entities/Cripto'
import ICriptoRepository from '../repositories/ICriptoRepository'

@injectable()
class ListCriptoService {
  constructor (
    @inject('CriptoRepository')
    private criptoRepository: ICriptoRepository
  ) {}

  /**
   * execute
   */
  public async execute (): Promise<Cripto[]> {
    return await this.criptoRepository.findAll()
  }
}

export default ListCriptoService
