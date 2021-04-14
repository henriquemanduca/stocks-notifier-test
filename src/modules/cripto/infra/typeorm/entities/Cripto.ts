import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  AfterLoad,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm'

// import { Exclude, Expose } from 'class-transformer'
import Utils from '@shared/utils'

@Entity('criptos')
class Cripto {
  @AfterLoad()
  intToMoneyValues () {
    this.value = Utils.intToMoney(this.value)
    this.variation = Utils.intToMoney(this.variation)
  }

  @BeforeInsert()
  @BeforeUpdate()
  moneyToIntValues () {
    this.value = Utils.moneyToInt(this.value)
    this.variation = Utils.moneyToInt(this.variation)
  }

  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  title: string;

  @Column()
  ticker: string;

  @Column()
  value: number;

  @Column({ nullable: true })
  variation: number;

  @CreateDateColumn()
  created_at: Date;
}

export default Cripto
