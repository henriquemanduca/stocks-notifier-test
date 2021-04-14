import { getRepository, LessThan, Repository } from 'typeorm'

import ICriptoDTO from '@modules/cripto/dtos/ICriptoDTO'
import ICriptoRepository from '@modules/cripto/repositories/ICriptoRepository'

import Cripto from '../entities/Cripto'

class CriptosRepository implements ICriptoRepository {
  private ormRepository: Repository<Cripto>;

  constructor () {
    this.ormRepository = getRepository(Cripto)
  }

  public getRepository (): Repository<Cripto> {
    return this.ormRepository
  }

  public async findAll (): Promise<Cripto[]> {
    return await this.ormRepository.find()
  }

  public async findById (id: string): Promise<Cripto | undefined> {
    return await this.ormRepository.findOne(id)
  }

  public async findByTicker (ticker: string): Promise<Cripto | undefined> {
    const cripto = await this.ormRepository.findOne({
      where: { ticker }
    })
    return cripto
  }

  public async create (criptoDTO: ICriptoDTO): Promise<Cripto> {
    const cripto = this.ormRepository.create(criptoDTO)
    await this.ormRepository.save(cripto)
    return cripto
  }

  public async save (cripto: Cripto): Promise<Cripto> {
    return this.ormRepository.save(cripto)
  }

  public async deleteBeforeDate (date: Date): Promise<number> {
    const { affected } = await this.ormRepository.delete({
      created_at: LessThan(date)
    })
    return affected
  }
}

export default CriptosRepository
