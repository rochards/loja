# Desenvolvimento de um sistema de vendas:  Front-end em ReactJS e API desenvolvida com o Spring Framework.

O projeto se desenvolveu a partir de um cenário onde existia uma empresa de vendas que possuía vendedores  e  gerentes  e  produtos  a  serem  vendidos  para  os  clientes  e  havia  a  necessidade  do  sistemarealizar vendas e gerar relatórios.
A proposta dessa atividade visa complementação do plano de formação de estágio.

---

## Clonando o repositório

Uma vez tendo o git instalado no computador execute no terminal os passos abaixo. Caso não tenha, siga os passos deste tutorial: https://www.atlassian.com/git/tutorials/install-git

1. ~$ git clone https://github.com/rochards/loja.git

---

## Instalando o MySQL

1. Siga o tutorial encontrado no link: https://sempreupdate.com.br/como-instalar-o-mysql-workbench-no-ubuntu/. O tutorial lhe ensinará a instalar o MySQL e também a ferramenta MySQL Workbench.
2. Execute, se preferir no MySQL Workbench, o script_create_bd_empresa.sql encontrado na pasta bd no repositório clonado para ter a estrutura do banco montada.
3. Adicione algumas informações no banco executando os comandos de inserts do arquivo script_inserts.sql.

---

## Importando o projeto no eclipse IDE

Siga o tutorial encontrado no link: https://www.lagomframework.com/documentation/1.4.x/java/EclipseMavenInt.html

---

## Executando o Spring Boot App pelo terminal

Caso já tenha o maven instalado siga os passos abaixo, se não, siga os passos descritos no link: https://www.javahelps.com/2017/10/install-apache-maven-on-linux.html. 

Pelo terminal, dentro da pasta do projeto execute:

1. ~$ mvn clean install
2. ~$ mvn spring-boot:run
3. No navegador acesse http://localhost:8080/swagger-ui.html#/ para consultar a documentação da API com Swagger

---

## Executando o front-end

Pelo terminal, dentro da pasta appweb execute:
1. Para instalar todos os módulos ~$ npm install npm-install-all -g
2. Para executar a aplicação ~$ npm start
