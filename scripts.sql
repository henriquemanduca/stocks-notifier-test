
select * from stocks s ;

select * from history h ;

select * from criptos c order by id desc;



select * from criptos c
where ticker = 'BTC'
order by id desc;


select ticker, title  from criptos c
group by ticker, title;


select * from group_criptos();

drop function public.group_criptos;

create or replace function public.group_criptos()
	returns table(ticker varchar, title varchar)
	language plpgsql
as $function$
begin
	return query
		select c.ticker, c.title
		from criptos c
		group by c.ticker, c.title
		order by ticker;
end;
$function$
;


select * from public.criptos_values('btc');

drop function public.criptos_values;

create or replace function public.criptos_values(pticker varchar)
	returns table(id integer, value integer, variation integer)
	language plpgsql
as $function$
begin
	return query
		select c.id, c.value, c.variation
		from criptos c
		where c.ticker =  UPPER(pticker)
		order by c.id desc
		limit 20;
end;
$function$
;





