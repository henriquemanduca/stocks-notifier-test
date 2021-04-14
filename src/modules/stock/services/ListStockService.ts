import { injectable, inject } from 'tsyringe'

import Stock from '../infra/typeorm/entities/Stock'
import IStockRepository from '../repositories/IStockRepository'

@injectable()
class ListStocksService {
  constructor (
    @inject('StockRepository')
    private stockRepository: IStockRepository
  ) {}

  /**
   * execute
   */
  public async execute (): Promise<Stock[]> {
    return await this.stockRepository.findAll()
  }
}

export default ListStocksService
