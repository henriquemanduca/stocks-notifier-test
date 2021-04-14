import { injectable, inject } from 'tsyringe'

import ICreateHistoryDTO from '../dtos/ICreateHistoryDTO'
import History from '../infra/typeorm/entities/History'

import IHistoryRepository from '../repositories/IHistoryRepository'
import IStockRepository from '@modules/stock/repositories/IStockRepository'

import logging from '@shared/infra/log'

@injectable()
class CreateHistoryService {
  constructor (
    @inject('HistoryRepository')
    private historyRepository: IHistoryRepository,
    @inject('StockRepository')
    private StockRepository: IStockRepository
  ) {}

  /**
   * execute
   */
  public async execute (data: ICreateHistoryDTO): Promise<History> {
    try {
      if (!data.stock) {
        data.stock = await this.StockRepository.findByTicker(data.ticker)
      }
      return await this.historyRepository.create(data)
    } catch (error) {
      logging.error('CreateHistoryService', 'execute', error.message)
    }
  }
}

export default CreateHistoryService
