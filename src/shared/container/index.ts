import { container } from 'tsyringe'

import IStockRepository from '@modules/stock/repositories/IStockRepository'
import StockRepository from '@modules/stock/infra/typeorm/repositories/StockRepository'

import IHistoryRepository from '@modules/history/repositories/IHistoryRepository'
import HistoryRepository from '@modules/history/infra/typeorm/repositories/HistoryRepository'

import ICriptoRepository from '@modules/cripto/repositories/ICriptoRepository'
import CriptoRepository from '@modules/cripto/infra/typeorm/repositories/CriptoRepository'

container.registerSingleton<IStockRepository>(
  'StockRepository',
  StockRepository
)

container.registerSingleton<IHistoryRepository>(
  'HistoryRepository',
  HistoryRepository
)

container.registerSingleton<ICriptoRepository>(
  'CriptoRepository',
  CriptoRepository
)
