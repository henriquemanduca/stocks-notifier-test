import { injectable } from 'tsyringe'
import { getConnection } from 'typeorm'
import PromisePool from '@supercharge/promise-pool'

import logging from '@shared/infra/log'
import Utils from '@shared/utils'
// import ICriptoRepository from '@modules/cripto/repositories/ICriptoRepository'
import { ICriptoInfoDTO, ICriptoValueListDTO } from '@modules/cripto/dtos/ICriptoDTO'

const NAMESPACE = 'CriptoAnalysisService'

@injectable()
class AnalysisCriptoService {
  constructor () {}

  public async getInfoByTicker (ticker: string): Promise<ICriptoInfoDTO[]> {
    try {
      // the last 20 rows
      const sqlResult = await getConnection()
        .query(`select id, value, variation from criptos_values('${ticker}')`)

      const values: ICriptoInfoDTO[] = []

      sqlResult.forEach((cripto: ICriptoInfoDTO) => {
        values.push({
          value: Utils.intToMoney(cripto.value),
          variation: Utils.intToMoney(cripto.variation)
        })
      })

      return values
    } catch (error) {
      logging.error(NAMESPACE, 'getInfoByTicker', error)
      return []
    }
  }

  public async getCriptos (): Promise<ICriptoValueListDTO[]> {
    try {
      const sqlResult = await getConnection()
        .query('select ticker, title from group_criptos()')

      const criptos: ICriptoValueListDTO[] = []

      sqlResult.forEach((cp: ICriptoValueListDTO) => {
        criptos.push({
          ticker: cp.ticker,
          title: cp.title,
          values: [],
          bias: 0
        })
      })

      await PromisePool
        .for(criptos)
        .withConcurrency(3)
        .process(async (cripto: ICriptoValueListDTO) => {
          cripto.values = await this.getInfoByTicker(cripto.ticker)
        })

      return criptos
    } catch (error) {
      logging.error(NAMESPACE, 'getCriptoStory', error)
      return []
    }
  }
}

export default AnalysisCriptoService
