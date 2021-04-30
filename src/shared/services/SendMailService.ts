import { injectable } from 'tsyringe'
import * as nodemailer from 'nodemailer'

import logging from '@shared/infra/log'

const NAMESPACE = 'SendMailService'

@injectable()
class SendMailService {
  private transporter: nodemailer.Transporter

  constructor () {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.aol.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SERVICE_MAIL,
        pass: process.env.SERVICE_MAIL_PASSWORD
      }
    })
  }

  public async sendCriptoReport (htmlMessage: string) {
    const info = await this.transporter.sendMail({
      from: `"Me" <${process.env.SERVICE_MAIL}>`,
      to: process.env.TARGET_MAIL,
      subject: 'Crypto Report',
      html: htmlMessage
    })

    logging.debug(NAMESPACE, 'sendCriptoReport', `ID: ${info.messageId}`)
  }
}

export default SendMailService
