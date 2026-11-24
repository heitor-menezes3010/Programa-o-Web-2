-- =====================================================
-- Sistema de Gestão de RH - Modelo Escalado com Autenticação
-- Execute este script na aba SQL do MySQL Workbench / phpMyAdmin
-- =====================================================

-- Se você já criou o banco da aula anterior (só com nome/funcao/salario),
-- descomente a linha abaixo para recriar tudo do zero:
-- DROP DATABASE IF EXISTS crud_funcionarios;

CREATE DATABASE IF NOT EXISTS crud_funcionarios;
USE crud_funcionarios;

-- Tabela de login (independente, como no diagrama)
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL          -- guarda o hash do bcrypt (60 caracteres)
);

CREATE TABLE IF NOT EXISTS departamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    localizacao VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS funcionarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    funcao VARCHAR(100) NOT NULL,
    salario DECIMAL(10,2) NOT NULL,
    email VARCHAR(150),
    data_admissao DATE,
    status ENUM('Ativo','Inativo') NOT NULL DEFAULT 'Ativo',
    departamento_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (departamento_id) REFERENCES departamentos(id)
);

-- Departamentos de exemplo
INSERT INTO departamentos (nome, localizacao) VALUES
    ('Recursos Humanos', 'Bloco A'),
    ('Tecnologia', 'Bloco B'),
    ('Financeiro', 'Bloco C');

-- OBS: o usuário administrador NÃO é inserido aqui, porque a senha precisa
-- ser criptografada com bcrypt. Crie-o com:  node criarUsuario.js admin 123456
