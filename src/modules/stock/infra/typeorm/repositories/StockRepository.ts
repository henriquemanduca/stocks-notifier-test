import { getRepository, Repository } from 'typeorm'

import IStockDTO from '@modules/stock/dtos/IStockDTO'
import IStockRepository from '@modules/stock/repositories/IStockRepository'

import Stock from '../entities/Stock'

class StocksRepository implements IStockRepository {
  private ormRepository: Repository<Stock>;

  constructor () {
    this.ormRepository = getRepository(Stock)
  }

  public async findAll (): Promise<Stock[]> {
    return await this.ormRepository.find()
  }

  public async findById (id: string): Promise<Stock | undefined> {
    return await this.ormRepository.findOne(id)
  }

  public async findByTicker (ticker: string): Promise<Stock | undefined> {
    const stock = await this.ormRepository.findOne({
      where: { ticker }
    })
    return stock
  }

  public async create (stockData: IStockDTO): Promise<Stock> {
    const stock = this.ormRepository.create(stockData)
    await this.ormRepository.save(stock)
    return stock
  }

  public async save (stock: Stock): Promise<Stock> {
    return this.ormRepository.save(stock)
  }
}

export default StocksRepository
