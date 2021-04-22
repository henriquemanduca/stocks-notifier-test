import { container } from 'tsyringe'

import logging from '@shared/infra/log'
import CriptoAnalysisService from '@modules/cripto/services/AnalysisCriptoService'
import { ICriptoValueListDTO, ICriptoInfoDTO } from '@modules/cripto/dtos/ICriptoDTO'

class AnalysisCriptoFacade {
  private criptos: ICriptoValueListDTO[]

  constructor (
    private criptoService = container.resolve(CriptoAnalysisService)
  ) {}

  public async execute () {
    await this.getMonitoredCriptos()
    this.getBiasCripto()
  }

  private getBias (upCount: number, downCount: number): number {
    if (upCount > downCount) {
      return 1
    } else if (upCount < downCount) {
      return -1
    } else {
      return 0
    }
  }

  private async getMonitoredCriptos () {
    this.criptos = await this.criptoService.getCriptos()
    // logging.debug('AnalysisCriptoFacade', 'getMonitoredCriptos', this.criptos)
  }

  private getBiasCripto () {
    this.criptos.forEach((cripto: ICriptoValueListDTO) => {
      let upCount = 0
      let downCount = 0

      cripto.values.forEach((value: ICriptoInfoDTO) => {
        if (value.variation > 0) { upCount++ } else { downCount++ }
      })

      cripto.bias = this.getBias(upCount, downCount)

      const ticker = cripto.ticker.padStart(5, ' ')

      if (cripto.bias === 0) {
        logging.debug('AnalysisCriptoFacade', 'getBias', `${ticker}: ESTAVEL`)
      } else {
        logging.debug('AnalysisCriptoFacade', 'getBias', `${ticker}: ${cripto.bias > 0 ? 'ALTA' : 'QUEDA'}`)
      }
    })
  }
}

export default AnalysisCriptoFacade
