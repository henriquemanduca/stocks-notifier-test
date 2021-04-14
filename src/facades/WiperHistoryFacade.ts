import { container } from 'tsyringe'

import WipeHistoryService from '@shared/services/WipeHistoryService'

class WiperHistoryFacade {
  constructor (
    private wipeService = container.resolve(WipeHistoryService)
  ) {}

  public async execute () {
    await this.wiperStockHistory()
    await this.wiperCriptStory()
  }

  private async wiperStockHistory () {
    await this.wipeService.wiperStockHistory()
  }

  private async wiperCriptStory () {
    await this.wipeService.wiperCriptoStory()
  }
}

export default WiperHistoryFacade