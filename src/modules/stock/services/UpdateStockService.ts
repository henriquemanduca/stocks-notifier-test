import { injectable, inject } from 'tsyringe'

import IStock from '../infra/typeorm/entities/Stock'
import IStockRepository from '../repositories/IStockRepository'

@injectable()
class UpdateStocksService {
  constructor (
    @inject('StockRepository')
    private stockRepository: IStockRepository
  ) {}

  /**
   * execute
   */
  public async execute (stock: IStock): Promise<IStock> {
    return await this.stockRepository.save(stock)
  }
}

export default UpdateStocksService
