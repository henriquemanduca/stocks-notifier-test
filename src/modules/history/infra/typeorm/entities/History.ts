import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

// import { Expose } from 'class-transformer'

import Utils from '@shared/utils'
import Stock from '@modules/stock/infra/typeorm/entities/Stock'

@Entity('history')
class History {
  @AfterLoad()
  intToMoneyValues () {
    this.value = Utils.intToMoney(this.value)
  }

  @BeforeInsert()
  @BeforeUpdate()
  moneyToIntValues () {
    this.value = Utils.moneyToInt(this.value)
  }

  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Stock)
  @JoinColumn({ name: 'stock_id' })
  stock: Stock;

  @Column()
  ticker: string;

  @Column()
  value: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default History
