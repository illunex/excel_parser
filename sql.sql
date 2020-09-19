select count(*) from node;
select count(*) from link;
#
select * from node where companyName like "마에스텍";
select * from node where kedcd = 0000129023;
# select * from link where targetkedcd = 99284;
select * from link where standardKedcd = 9011350790;
#
#
# explain select * from `node` where `companyName` = "울텍";
# explain select * from `link` where `standardkedcd` in (129023, 717880);
# explain select * from `link` where `standardkedcd` in (select kedcd from `node` where `companyName` = "울텍");
# explain select * from `node` where `kedcd` in (select targetkedcd from `link` where `standardkedcd` in (select kedcd from `node` where `companyName` = "울텍"));
# explain select * from `link` where `standardkedcd` in (select kedcd from `node` where `kedcd` in (select targetkedcd from `link` where `standardkedcd` in (select kedcd from `node` where `companyName` = "울텍")))
#                        and `targetkedcd` in (select kedcd from `node` where `kedcd` in (select targetkedcd from `link` where `standardkedcd` in (select kedcd from `node` where `companyName` = "울텍")));

explain select a.targetkedcd, a.relation
from (
    select targetkedcd, relation from `link` where `standardkedcd` in (select kedcd from `node` where `kedcd` in (select targetkedcd from `link` where `standardkedcd` in (select kedcd from `node` where `companyName` = "울텍")))
    ) as a
where a.`targetkedcd` in (select kedcd from `node` where `kedcd` in (select targetkedcd from `link` where `standardkedcd` in (select kedcd from `node` where `companyName` = "울텍")));


select * from node where companyName like "%하이닉스%";

-- truncate table finance;
# create table finance
# (
#     kedcd varchar(100) not null,
# 	settlementDate varchar(100) null,
# 	sales bigint null,
# 	operatingProfit bigint null,
# 	randDExprenses bigint null,
# 	constraint finance_node_kedcd_fk
# 		foreign key (kedcd) references node (kedcd)
# )
# comment '재무정보';
#
# alter table finance modify sales varchar(100) null;

-- update nodeTemp set kedcd = concat("000", kedcd) where LENGTH(kedcd) = 7;
-- update nodeTemp set kedcd = right(kedcd, 10) where LENGTH(kedcd) > 10;
select count(*) from nodeTemp where LENGTH(kedcd) > 10;


-- insert into finance (kedcd, sales) select kedcd, sales2019 from node;
-- update link set standardKedcd = right(standardKedcd, 10) where LENGTH(standardKedcd) > 10;
select count(*) from link where targetkedcd = "0000099284";

-- insert into link (standardKedcd, targetkedcd, relation, transactionAmount)
-- select targetkedcd as standardKedcd, standardKedcd as targetkedcd, "sell", transactionAmount from link where targetkedcd = "0000099284" and relation="buy";

-- SELECT right(standardKedcd, 10) from link

-- update finance set year = 2019 where year is null;

select * from finance where kedcd = 0000129023;

# alter table finance
# 	add constraint finance_pk
# 		primary key (kedcd, year);


select count(*) from node where kedcd in (select kedcd from nodeTemp);

select * from nodeTemp where kedcd = "0000099284";
-- delete from nodeTemp where companyName is null;
# update nodeTemp as b, node as a
# set b.companyName = a.companyName
#   ,b.ir = a.ir
#   , b.industryCode = a.industryCode
#   , b.industryName = a.industryName
#   , b.kind = a.kind
#   , b.corporationNum = a.corporationNum
#   , b.businessNum = a.businessNum
#   , b.sales2019 = a.sales2019
#   , b.scale = a.scale
#   , b.publicOffering = a.publicOffering
#   , b.establishment = a.establishment
#   , b.product = a.product
#   , b.state = a.state
#   , b.zipCode = a.zipCode
#   , b.addr = a.addr
#   , b.addr_new = a.addr_new
#   , b.formEnterprise = a.formEnterprise
#   , b.formEstablishment = a.formEstablishment
# where b.kedcd = a.kedcd;
