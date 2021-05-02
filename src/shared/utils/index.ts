import dotenv from 'dotenv'
import numeral from 'numeral'

import logging from '@shared/infra/log'

if (process.env.NODE_ENV !== 'production') { dotenv.config() }

class Utils {
  static NAMESPACE = 'Utils'
  static isCriptoWorking = false

  static onlyNumbers (value: string): string {
    return value.replace(/\D/g, '')
  }

  static formatCompanyName (name: string): string {
    return name.trim().toUpperCase()
  }

  static formatStock (stock: string): string {
    return stock.replace('.SA', '')
  }

  static formatValue (value: string): number {
    return Number(value.replace('R$', '').replace(' ', '').replace(',', '.'))
  }

  static formatVariation (value: string): number {
    return Number(value.replace('%', '').replace(' ', '').replace(',', '.'))
  }

  static formatVolumeValue (value: string): number {
    return Number(value.replace('mi', '').replace(' ', '').replace(',', '.'))
  }

  static formatZerosLeft (value: number, mask: string = '00'): string {
    return numeral(value).format(mask)
  }

  static isProduction (): boolean {
    const isProduction = process.env.NODE_ENV === 'production'

    if (isProduction) {
      logging.info(this.NAMESPACE, 'isProduction')
    } else {
      logging.info(this.NAMESPACE, 'isDevelopment')
    }

    return isProduction
  }

  static isWorkingTime (): boolean {
    const currentTime = {
      hour: new Date().getHours(),
      minute: new Date().getMinutes()
    }

    if ((currentTime.hour <= 10) || (currentTime.hour >= 17 && currentTime.minute >= 40)) {
      logging.info(this.NAMESPACE, 'Skipping schedule', currentTime)
      return false
    }
    return true
  }

  static schedulesWeekDay (hour: number = 10, increaseHour: number = 0): string {
    return `0 0 ${hour + increaseHour} * * 1-5`
  }

  static schedulesDevString (increaseMin: number = 1): string {
    let currentHour = (new Date()).getHours()
    let nextMin = (new Date()).getMinutes() + increaseMin

    if (nextMin === 60) {
      nextMin = 0
      currentHour++
    }

    const value = `0 ${nextMin} ${currentHour} * * *`
    logging.debug(this.NAMESPACE, 'Schedules configuration:', value)
    return value
  }

  static memoryUsage (nameSpace: string = this.NAMESPACE): void {
    const used = process.memoryUsage().heapUsed / 1024 / 1024
    logging.info(nameSpace, `The App is using approximately ${Math.round(used * 100) / 100} MB`)
  }

  static moneyToInt (value: number): number {
    return Math.floor(value * 100)
  }

  static intToMoney (value: number): number {
    return value / 100
  }

  static moneyFormat (value: number): string {
    return new Intl.NumberFormat('pt-BR',
      { minimumFractionDigits: 2 }
    ).format(value)
  }

  static moneyFormatBR (value: number): string {
    return new Intl.NumberFormat('pt-BR',
      { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }
    ).format(value)
  }
}

export default Utils
