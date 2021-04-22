import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateFunctionCriptosValues1618493919228 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `create or replace function public.criptos_values(pticker varchar)
          returns table(id integer, value integer, variation integer)
          language plpgsql
      as $function$
      begin
          return query
              select
                  c.id, c.value, c.variation
              from
                  criptos c
              where
                  c.ticker =  UPPER(pticker)
              order by
                  c.id desc
              limit 20;
      end;
      $function$
      ;`
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('drop function public.criptos_values')
  }
}
