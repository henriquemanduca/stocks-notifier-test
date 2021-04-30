import { container } from 'tsyringe'

import logging from '@shared/infra/log'
import Utils from '@shared/utils'
import SendMailService from '@shared/services/SendMailService'
import AnalysisCriptoService from '@modules/cripto/services/AnalysisCriptoService'
import { ICriptoValueListDTO, ICriptoInfoDTO } from '@modules/cripto/dtos/ICriptoDTO'

class AnalysisCriptoFacade {
  private criptos: ICriptoValueListDTO[]

  constructor (
    private criptoService = container.resolve(AnalysisCriptoService),
    private mailService = container.resolve(SendMailService)
  ) {}

  public async execute () {
    await this.getMonitoredCriptos()
    this.getBiasCripto()

    await this.getMonitoredStocks()
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
  }

  private async getMonitoredStocks () {
    this.criptos = await this.criptoService.getCriptos()
  }

  private getBiasCripto () {
    let message = '<h2>Relatório - Criptomoedas</h2>'

    const table = `<table style='text-align:left;'>
      <thead>
        <th style='width:80px; border-bottom: 1px solid #ddd;'>Tiker</th>
        <th style='width:150px; border-bottom: 1px solid #ddd;'>Title</th>
        <th style='width:90px; border-bottom: 1px solid #ddd;'>Value</th>
      </thead>
    `

    let tabelaAltas = `<h3>Viés de Alta</h3>
      ${table}
    `

    let tabelaBaixas = `<h3>Viés de Baixa</h3>
      ${table}
    `

    let tabelaEstaveis = `<h3>Estáveis</h3>
      ${table}
    `

    this.criptos.forEach((cripto: ICriptoValueListDTO) => {
      let upCount = 0
      let downCount = 0

      cripto.values.forEach((value: ICriptoInfoDTO) => {
        if (value.variation > 0) { upCount++ } else { downCount++ }
      })

      cripto.bias = this.getBias(upCount, downCount)

      const row = `<tr>
        <td>${cripto.ticker}</td>
        <td>${cripto.title}</td>
        <td style='text-align:right;'>${Utils.moneyFormat(cripto.values[0].value)}</td>
      </tr>`

      switch (cripto.bias) {
        case -1:
          tabelaBaixas += row
          break

        case 0:
          tabelaEstaveis += row
          break

        case 1:
          tabelaAltas += row
          break

        default:
          break
      }
    })

    tabelaAltas += '</table>'
    tabelaBaixas += '</table>'
    tabelaEstaveis += '</table>'

    message += tabelaAltas + '<br>' + tabelaBaixas + '<br>' + tabelaEstaveis

    logging.debug('AnalysisCriptoFacade', 'getBias', 'Sending e-mail')
    this.mailService.sendCriptoReport(message)
  }

  private async getBiasStocks () {

  }
}

export default AnalysisCriptoFacade
