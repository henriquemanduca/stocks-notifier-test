export interface ICriptoInfoDTO {
  value: number;
  variation: number;
}

export interface ICriptoValueListDTO {
  title: string;
  ticker: string;
  values: ICriptoInfoDTO[];
  bias: number;
}

export default interface ICriptoDTO {
  title: string;
  ticker: string;
  value: number;
  variation: number;
}
