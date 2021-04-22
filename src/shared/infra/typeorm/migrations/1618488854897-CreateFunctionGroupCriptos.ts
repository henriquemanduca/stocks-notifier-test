import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateFunctionGroupCriptos1618488854897 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `create or replace function public.group_criptos()
          returns table(ticker varchar, title varchar)
          language plpgsql
      as $function$
      begin
          return query
              select
                  c.ticker, c.title
              from
                  criptos c
              group by
                  c.ticker, c.title
              order by
                  ticker;
      end;
      $function$;`
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('drop function public.group_criptos')
  }
}
