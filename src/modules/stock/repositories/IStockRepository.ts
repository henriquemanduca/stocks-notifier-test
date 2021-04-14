import IStockDTO from '../dtos/IStockDTO'
import Stock from '../infra/typeorm/entities/Stock'

export default interface IStockRepository {
  findAll(): Promise<Stock[]>;
  findById(id: string): Promise<Stock | undefined>;
  findByTicker(code: string): Promise<Stock | undefined>;
  create(data: IStockDTO): Promise<Stock>;
  save(data: Stock): Promise<Stock>
}
