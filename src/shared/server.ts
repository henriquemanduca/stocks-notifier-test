import 'reflect-metadata'

// Keep on top
import logging from '@shared/infra/log'
import Utils from '@shared/utils'
import NodeCronFactory from '@shared/infra/factories/nodeScheduleFactory'

import './infra/typeorm'
import '@shared/container'

const NAMESPACE = 'Server'
const isProduction = Utils.isProduction()

const coinMarketJob = async () => {
  if (Utils.isProduction && !Utils.isWorkingTime) {
    logging.debug(NAMESPACE, 'CoinMarket - Waiting for work')
    return false
  }

  logging.info(NAMESPACE, 'Starting CoinMarket-Crawler')
  const coinMarketCrawler = new CoinMarketCrawler()
  await coinMarketCrawler.getTopCriptos(50)
}

const main = async () => {
  Utils.memoryUsage(NAMESPACE)
  logging.info(NAMESPACE, 'Main method called')

  if (isProduction) {
    // Wiper
    NodeCronFactory.newCron(Utils.schedulesWeekDay(10), wiperJob)

    // Criptos
    NodeCronFactory.newCron(Utils.schedulesEvery25min(), coinMarketJob)

    // Uol
    NodeCronFactory.newCron(Utils.schedulesWeekDay(11), uolJobs)
    NodeCronFactory.newCron(Utils.schedulesWeekDay(15), uolJobs)
    NodeCronFactory.newCron(Utils.schedulesWeekDay(18), uolJobs)
  } else {
    setTimeout(async () => {
      await uolJobs()
      await coinMarketJob()
    }, 3000)
  }
}

main()
