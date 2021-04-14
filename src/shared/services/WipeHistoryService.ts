import { injectable, inject } from 'tsyringe'
import { sub } from 'date-fns'

import logging from '@shared/infra/log'
import IHistoryRepository from '@modules/history/repositories/IHistoryRepository'
import ICriptoRepository from '@modules/cripto/repositories/ICriptoRepository'

const NAMESPACE = 'CleanerHistoryService'

@injectable()
class CleanerHistoryService {
  private sliceDate: Date

  constructor (
    @inject('HistoryRepository')
    private historyRepository: IHistoryRepository,
    @inject('CriptoRepository')
    private criptoRepository: ICriptoRepository
  ) {
    this.sliceDate = sub(new Date(), { days: 60 })
  }

  public async wiperStockHistory (): Promise<Boolean> {
    try {
      const affected = await this.historyRepository.deleteBeforeDate(this.sliceDate)
      logging.info(NAMESPACE, 'wiperStockHistory', { date: this.sliceDate, affected })
      return true
    } catch (error) {
      logging.error(NAMESPACE, 'wiperStockHistory', { date: this.sliceDate, error })
      return false
    }
  }

  public async wiperCriptoStory (): Promise<Boolean> {
    try {
      const affected = await this.criptoRepository.deleteBeforeDate(this.sliceDate)
      logging.info(NAMESPACE, 'wiperCriptoStory', { date: this.sliceDate, affected })
      return true
    } catch (error) {
      logging.error(NAMESPACE, 'wiperCriptoStory', { date: this.sliceDate, error })
      return false
    }
  }
}

export default CleanerHistoryService
