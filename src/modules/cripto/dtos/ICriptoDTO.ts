export interface IValuesCriptoDTO {
  value: number;
  variation: number;
}

export interface ICriptoValuesDTO {
  title: string;
  ticker: string;
  values: IValuesCriptoDTO[];
}

export default interface ICriptoDTO {
  title: string;
  ticker: string;
  value: number;
  variation: number;  
}
