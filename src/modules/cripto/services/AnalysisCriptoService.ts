import { injectable, inject } from 'tsyringe'
import PromisePool from '@supercharge/promise-pool'
import { getConnection } from "typeorm";

import logging from '@shared/infra/log'
import ICriptoRepository from '@modules/cripto/repositories/ICriptoRepository'
import { IValuesCriptoDTO, ICriptoValuesDTO } from '@modules/cripto/dtos/ICriptoDTO'

const NAMESPACE = 'CriptoAnalysisService'

@injectable()
class CriptoAnalysisService {
  constructor(
    @inject('CriptoRepository')
    private criptoRepository: ICriptoRepository
  ) {}

  public async getInfoByTicker (ticker: string): Promise<IValuesCriptoDTO[]> {
    try {
      const sqlResult = await this.criptoRepository
        .getRepository()
        .createQueryBuilder()
        .select('id, value, variation')
        .where('ticker = :tk', { tk: ticker })        
        .orderBy('id', 'DESC')
        .limit(10)
        .getRawMany()
      
      const values: IValuesCriptoDTO[] = []

      sqlResult.forEach((value: IValuesCriptoDTO) => {
        values.push({
          value: value.value,
          variation: value.variation,
        })
      })

      return values
    } catch (error) {
      logging.error(NAMESPACE, 'getInfoByTicker', error)
      return []
    }
  }

  public async getCriptos (): Promise<ICriptoValuesDTO[]> {
    try {
      const sqlResult = await getConnection()
        .query('select ticker, title from group_criptos()')
     
      const criptos: ICriptoValuesDTO[] = []

      sqlResult.forEach((cp: ICriptoValuesDTO) => {
        criptos.push({
          ticker: cp.ticker,
          title: cp.title,
          values: [] 
        })
      })

      await PromisePool
        .for(criptos)
        .withConcurrency(3)
        .process(async (cripto: ICriptoValuesDTO) => {
          cripto.values = await this.getInfoByTicker(cripto.ticker)
        })

      return criptos

    } catch (error) {
      logging.error(NAMESPACE, 'getCriptoStory', error)
      return []
    }
  }

}

export default CriptoAnalysisService