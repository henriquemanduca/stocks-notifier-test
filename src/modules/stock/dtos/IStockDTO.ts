export default interface IStockDTO {
  company: string;
  ticker: string;
  value: number;
  max_day: number;
  min_day: number;
  variation: number;
  inspect: boolean;
}
