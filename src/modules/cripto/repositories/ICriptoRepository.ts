import { Repository } from 'typeorm'

import ICriptoDTO from '../dtos/ICriptoDTO'
import Cripto from '../infra/typeorm/entities/Cripto'

export default interface ICriptoRepository {
  getRepository(): Repository<Cripto>
  findAll(): Promise<Cripto[]>
  findById(id: string): Promise<Cripto | undefined>
  findByTicker(code: string): Promise<Cripto | undefined>
  create(data: ICriptoDTO): Promise<Cripto>
  save(data: Cripto): Promise<Cripto>
  deleteBeforeDate(date: Date): Promise<number>
}
