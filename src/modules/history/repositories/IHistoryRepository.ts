import History from '../infra/typeorm/entities/History'
import ICreateHistoryDTO from '../dtos/ICreateHistoryDTO'

export default interface IHistoryRepository {
  findAll(): Promise<History[]>;
  findByTicker(ticker: string): Promise<History[] | undefined>;
  create(data: ICreateHistoryDTO): Promise<History>;
  deleteBeforeDate(date: Date): Promise<number>;
}
