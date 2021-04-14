import Stock from '@modules/stock/infra/typeorm/entities/Stock'

export default interface ICreateHistoryDTO {
  stock?: Stock;
  ticker: string;
  value: number;
}
