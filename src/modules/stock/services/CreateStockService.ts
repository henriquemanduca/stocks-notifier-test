import { injectable, inject } from 'tsyringe'

import logging from '@shared/infra/log'

import IStockDTO from '../dtos/IStockDTO'
import Stock from '../infra/typeorm/entities/Stock'
import IStockRepository from '../repositories/IStockRepository'

@injectable()
class CreateStockService {
  constructor (
    @inject('StockRepository')
    private stockRepository: IStockRepository
  ) {}

  /**
   * execute
   */
  public async execute (stock: IStockDTO): Promise<Stock> {
    try {
      const stockExists = await this.stockRepository
        .findByTicker(stock.ticker)

      if (stockExists) {
        stockExists.company = (stock.company.length > 0)
          ? stock.company
          : stockExists.company

        stockExists.value = stock.value
        return await this.stockRepository.save(stockExists)
      }

      const stockEntity = await this.stockRepository.create(stock)
      return stockEntity
    } catch (error) {
      logging.error('CreateStockService', 'execute', error.message)
    }
  }
}

export default CreateStockService
