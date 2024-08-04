

> PostgreSQL：去O首选，号称是开源界的Oracle。Oracle 主要是涉及到数据安全这方面的问题。
>
> PostgreSQL 是一个 **免费** 的对象-关系数据库服务器（BSD许可证）
>
> 主流版本是 PG 12
>
> 目前：June 27th, 2024: [PostgreSQL 17 Beta 2 Released!](https://www.postgresql.org/about/news/postgresql-17-beta-2-released-2885/)

## 1. 使用原因

众所周知，MySQL 被 Oracle 所控制，MySQL 同时使用了GPL和一种商业许可(称为双重许可)。

GPL (General Public license) 是公共许可，遵循了 GPL 的软件是公共的。如果某软件使用了 GPL 软件，那么该软件也需要开源，如果不开就不能使用 GPL 软件，这和是否把该软件商用与否是没关系的。

如果无法满足 GPL，就需要获得商业许可，通过与 Oracle 公司联系，制定解决方案，受 Oracle 公司约束.

**同为开源软件，PostgreSQL源码使用自由友好、商业应用不受任何公司实体所控制，而 MySQL 则在一定程度上有所限制。**



## 2. 和 `mySql` 区别

### 2.1.  PG > MySQL

1. 在 SQL 的标准实现上要比 MySQL 完善，而且功能实现比较严谨。

2. 对表连接支持较完整，优化器的功能较完整，支持的索引类型很多，复杂查询能力较强。

3. PG 主表采用堆表存放，MySQL 采用索引组织表，能够支持比 MySQL 更大的数据量。

4. PG 的主备复制属于物理复制，相对于 MySQL 基于 binlog 的逻辑复制，数据的一致性更加可靠，复制性能更高，对主机性能的影响也更小。

5. PostgreSQL 支持 JSON 和其他 NoSQL 功能，如本机 XML 支持和使用 HSTORE 的键值对，它还支持索引 JSON 数据以加快访问速度，特别是10版本 JSONB 更是强大。

6. **PostgreSQL 完全免费，而且是BSD协议**，如果你把PostgreSQL改一改，然后再拿去卖钱，也没有人管你，这一点很重要

   这表明了 PostgreSQL 数据库不会被其它公司控制。相反，MySQL 现在主要是被 Oracle 公司控制。

### 2.2. MySQL > PG

1. innodb 的基于**回滚段**实现的 MVCC 机制，相对PG新老数据一起存放的**基于 XID** 的 MVCC机制，是占优的。

   新老数据一起存故，需要定时触发 VACUUM，会带来多余的 IO 和数据库对象加锁开销，引起数据库整体的并发能力下降

   而且VACUUM清理不及时，还可能会引发数据膨胀。

2. MySQL 采用索引组织表，这种存储方式非常适合基于主键匹配的查询、删改操作，但是对表结构设计存在约束。
3. MySQL 的优化器较简单，系统表、运算符、数据类型的实现都很精简，非常适合简单的查询操作。
4. MySQL 相对于PG在国内的流行度更高。
5. MySQL 的存储引擎插件化机制，使得它的应用场景更加广泛，比如除了 innodb 适合事务处理场景外，myisam 适合静态数据的査询场景。

### 2.3. 总结

从应用场景来说，PG **更加适合严格的企业应用场景**（比如金融、电信、ERP、CRM），但不仅仅限制于此。

PostgreSQL 的 json，jsonb，hstore等数据格式，**特别适用于一些大数据格式的分析**；

而 MySQL 更加适合**业务逻辑相对简单、数据可靠性要求较低**的互联网场景，

当然现在MySQL的在 innodb 引擎的大力发展，功能表现良好。

## 3. 应用

安装：https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

打开 pgAdmin4 应用是可视化的 postgreSQL 工具。

教程：https://www.w3schools.com/postgresql/postgresql_create_table.php

**创建`table`**

```shell
create table cars (
  brand varchar(255),
  model varchar(255),
  year int
);
```

**简单查询：**

```shell
select * from cars;

# 查询有限字段
select brand, year from cars;


```

**添加数据：**成功的标识是：`INSERT 0 1`

```shell
insert into cars (brand, model, year) values ('Ford', 'Mustang', 1987);

# 添加多组数据：使用逗号分隔 values
INSERT INTO cars (brand, model, year)
VALUES ('Volvo', 'p1800', 1968),('BMW', 'M1', 1978),('Toyota', 'Celica', 1975);
```

**修改数据：**

```shell
update cars set color = 'red' where brand = 'Volvo'; # 有条件的修改

update cars set color = 'blue'; # 对表中的所有数据都生效

update cars set color = 'blue', year = 1981; # 修改多个字段的数据
```

**删除数据**

```shell
delete from cars where brand = 'Ford'; # 条件删除

delete from cars; # 全部删除
TRUNCATE TABLE cars; # 全部删除 
```



**添加表列** 使用`alter table` 来添加

```shell
alter table cars add color varchar(255);
```

**删除表列**

```shell
alter table cars drop column color;
```



**修改字段的类型**

```shell
alter table cars alter column year type varchar(4);
```



 **删除表**

```shell
DROP TABLE cars;
```



/