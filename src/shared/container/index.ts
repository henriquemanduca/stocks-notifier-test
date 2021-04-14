import { container } from 'tsyringe'

import IStockRepository from '@modules/stock/repositories/IStockRepository'
import StockRepository from '@modules/stock/infra/typeorm/repositories/StockRepository'

import IHistoryRepository from '@modules/history/repositories/IHistoryRepository'
import HistoryRepository from '@modules/history/infra/typeorm/repositories/HistoryRepository'

import ICriptoRepository from '@modules/cripto/repositories/ICriptoRepository'
import CriptoRepository from '@modules/cripto/infra/typeorm/repositories/CriptoRepository'

import ICacheHistoryRepository from '@modules/cache/repositories/ICacheHistoryRepository'
import CacheHistoryRepository from '@modules/cache/infra/node/CacheHistoryRepository'

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

container.registerSingleton<ICacheHistoryRepository>(
  'CacheHistoryRepository',
  CacheHistoryRepository
)
