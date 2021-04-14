import { container } from 'tsyringe'

import logging from '@shared/infra/log'
import CriptoAnalysisService from '@modules/cripto/services/AnalysisCriptoService'

class AnalysisCriptoFacade {
  constructor (
    private criptoService = container.resolve(CriptoAnalysisService)
  ) {}

  public async execute () {
    await this.getMonitoredCriptos()
  }

  private async getMonitoredCriptos () {
    const criptos = await this.criptoService.getCriptos()

    logging.debug('AnalysisCriptoFacade', 'getMonitoredCriptos', criptos)      
  }

}

export default AnalysisCriptoFacade