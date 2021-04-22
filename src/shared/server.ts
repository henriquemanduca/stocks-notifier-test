import 'reflect-metadata'

// Keep on top
import logging from '@shared/infra/log'
import Utils from '@shared/utils'
import NodeCronFactory from '@shared/infra/factories/nodeScheduleFactory'

import AnalysisCriptoFacade from '@facades/AnalysisCriptoFacade'
import WiperHistoryFacade from '@facades/WiperHistoryFacade'

import './infra/typeorm'
import '@shared/container'

const NAMESPACE = 'Server'

const coinMarketJob = async () => {
  logging.info(NAMESPACE, 'Starting CoinMarket')
  const coinMarket = new AnalysisCriptoFacade()
  coinMarket.execute()
}

const wiperJob = () => {
  logging.info(NAMESPACE, 'Starting Wiper')
  const wiper = new WiperHistoryFacade()
  wiper.execute()
}

const main = async () => {
  Utils.memoryUsage(NAMESPACE)
  logging.info(NAMESPACE, 'Main method called')

  // Wiper
  NodeCronFactory.newCron('0 11 * * *', wiperJob)

  setTimeout(() => {
    coinMarketJob()
  }, 2000)

  // Criptos
  // NodeCronFactory.newCron(Utils.schedulesEvery25min(), coinMarketJob)
}

main()
