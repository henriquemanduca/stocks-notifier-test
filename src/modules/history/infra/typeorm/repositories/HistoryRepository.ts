import { getRepository, LessThan, Repository } from 'typeorm'

import ICreateHistoryDTO from '@modules/history/dtos/ICreateHistoryDTO'
import IHistoryRepository from '@modules/history/repositories/IHistoryRepository'

import History from '../entities/History'

class HistoryRepository implements IHistoryRepository {
  private ormRepository: Repository<History>;

  constructor () {
    this.ormRepository = getRepository(History)
  }

  public async findAll (): Promise<History[]> {
    return await this.ormRepository.find()
  }

  public async findByTicker (ticker: string): Promise<History[] | undefined> {
    const histories = await this.ormRepository.find({
      where: { ticker }
    })
    return histories
  }

  public async create (data: ICreateHistoryDTO): Promise<History> {
    const history = this.ormRepository.create(data)
    await this.ormRepository.save(history)
    return history
  }

  public async deleteBeforeDate (date: Date): Promise<number> {
    const { affected } = await this.ormRepository.delete({
      created_at: LessThan(date)
    })
    return affected
  }
}

export default HistoryRepository
