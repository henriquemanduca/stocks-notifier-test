import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  AfterLoad,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm'

// import { Exclude, Expose } from 'class-transformer'
import Utils from '@shared/utils'

@Entity('stocks')
class Stock {
  @AfterLoad()
  intToMoneyValues () {
    this.value = Utils.intToMoney(this.value)
    this.max_day = Utils.intToMoney(this.max_day)
    this.min_day = Utils.intToMoney(this.min_day)
    this.variation = Utils.intToMoney(this.variation)
  }

  @BeforeInsert()
  @BeforeUpdate()
  moneyToIntValues () {
    this.value = Utils.moneyToInt(this.value)
    this.max_day = Utils.moneyToInt(this.max_day)
    this.min_day = Utils.moneyToInt(this.min_day)
    this.variation = Utils.moneyToInt(this.variation)
  }

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  company: string;

  @Column()
  ticker: string;

  @Column()
  value: number;

  @Column()
  max_day: number;

  @Column()
  min_day: number;

  @Column()
  variation: number;

  @Column()
  inspect: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Stock
