drop database if exists estacionamento;
create database estacionamento charset=UTF8 collate UTF8_general_ci;
use estacionamento;

-- CRIANDO TABELA CLIENTS
create table clientes(
    id_cliente integer not null primary key auto_increment,
    nome_cli varchar(30) not null,
    email varchar (100) null,
    data_nasc date null,
    cpf varchar (15) not null,
    bairro varchar(30) not null,
    rua varchar(30) not null,
    cep varchar(30) not null,
    complemento varchar(30) not null,
    municipio varchar(30) not null
);

-- CRIANDO TABELA FUNCIONARIOS
create table funcionarios(
    id_func integer not null primary key auto_increment,
    nome_func varchar(30) not null,
    email varchar (100),
    data_nasc date,
    cpf varchar (15) not null,
    cargo varchar(30) not null,
    bairro varchar(30) not null,
    rua varchar(30) not null,
    cep varchar(30) not null,
    complemento varchar(30),
    municipio varchar(30) not null
);

-- "on delete cascade" para quando eliminar-mos algum cliente, as informações do mesmo também serem excluidas
create table telefonesCli(
    id_cliente integer null,
    telefone varchar(15) not null, 
    foreign key (id_cliente) references clientes(id_cliente) on delete cascade
);

-- CRIANDO TABELA TELEFONES DOS CLIENTES
create table telefonesFunc(
    id_func integer null, 
    telefone varchar(15), 
    foreign key (id_func) references funcionarios(id_func) on delete cascade
);

-- CRIANDO TABELA DE CARROS
create table carros(
    id_cliente integer not null,
    id_carro integer not null primary key auto_increment,
    placa varchar(8) not null,
    tipo varchar(15) not null,
    marca varchar(15) not null,
    modelo varchar(30) not null,
    cor varchar(15) not null,
    descricao varchar(50) not null,
    foreign key (id_cliente) references clientes(id_cliente) on delete cascade
);

-- CRIANDO TABELA VAGAS
create table vagas(
    id_vaga integer not null primary key,
    ocupada boolean
);


-- IMPORTANDO INFORMAÇÕES DO CSV
LOAD DATA INFILE 'C:/Users/Desenvolvimento/Desktop/PROJETOS/EstacionamentoAtualizado/docs/bd/clientes.csv'
INTO TABLE clientes
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA INFILE 'C:/Users/Desenvolvimento/Desktop/PROJETOS/EstacionamentoAtualizado/docs/bd/telefonesCli.csv'
INTO TABLE telefonesCli
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA INFILE 'C:/Users/Desenvolvimento/Desktop/PROJETOS/EstacionamentoAtualizado/docs/bd/carros.csv'
INTO TABLE carros
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA INFILE 'C:/Users/Desenvolvimento/Desktop/PROJETOS/EstacionamentoAtualizado/docs/bd/funcionarios.csv'
INTO TABLE funcionarios
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

LOAD DATA INFILE 'C:/Users/Desenvolvimento/Desktop/PROJETOS/EstacionamentoAtualizado/docs/bd/telefonesFunc.csv'
INTO TABLE telefonesFunc
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;


-- MOSTRANDO AS TABELAS
select * from clientes;
select * from telefonesCli;
select * from carros;
select * from funcionarios;
select * from telefonesFunc;

--ADICIONANDO A TABELA DE VAGAS AS VAGAS

INSERT INTO vagas values(1,false);
INSERT INTO vagas values(2,false);
INSERT INTO vagas values(3,false);
INSERT INTO vagas values(4,false);
INSERT INTO vagas values(5,false);
INSERT INTO vagas values(6,false);
INSERT INTO vagas values(7,false);
INSERT INTO vagas values(8,false);
INSERT INTO vagas values(9,false);
INSERT INTO vagas values(10,false);
INSERT INTO vagas values(11,false);
INSERT INTO vagas values(12,false);
INSERT INTO vagas values(13,false);
INSERT INTO vagas values(14,false);
INSERT INTO vagas values(15,false);
INSERT INTO vagas values(16,false);
INSERT INTO vagas values(17,false);
INSERT INTO vagas values(18,false);
INSERT INTO vagas values(19,false);
INSERT INTO vagas values(20,false);
INSERT INTO vagas values(21,false);
INSERT INTO vagas values(22,false);
INSERT INTO vagas values(23,false);
INSERT INTO vagas values(24,false);
INSERT INTO vagas values(25,false);
INSERT INTO vagas values(26,false);
INSERT INTO vagas values(27,false);
INSERT INTO vagas values(28,false);
INSERT INTO vagas values(29,false);
INSERT INTO vagas values(30,false);

-- CRIANDO TABELA REGISTRO

create table registro(
    id_cliente integer not null,
    id_carro integer not null,
    id_vaga integer,
    hora_entrada time not null,
    hora_saida time not null,
    data DATETIME not null,
    foreign key (id_cliente) references clientes(id_cliente) on delete cascade,
    foreign key (id_carro) references carros(id_carro) on delete cascade,
    foreign key (id_vaga) references vagas(id_vaga)
);

-- subtime para subtrair a hora
-- SELECT SUBTIME("21:00:00","20:00:00");

-- VIEW PARA CALCULAR HORAS A PAGAR
drop view if exists vw_valorHora;
CREATE VIEW vw_valorHora AS
SELECT c.nome_cli, r.id_carro, SUBTIME(r.hora_saida,r.hora_entrada) as "hora", r.data, v.id_vaga, v.ocupada
FROM registro r INNER JOIN vagas v on r.id_vaga = v.id_vaga
INNER JOIN clientes c on c.id_cliente = r.id_cliente;
select * from vw_valorHora;