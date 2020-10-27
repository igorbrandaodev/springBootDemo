# springBootDemo
#### O projeto consiste em uma API REST CRUD construída com Spring Boot, Spring Data e Spring Security com OAuth2. Também existe um cliente Angular para consumir a API.


###### Credenciais para teste:

	• Usuário: igor
	• Senha: 123
	• Usuário: bruno
	• Senha: 1234


###### Tecnologias utilizadas:

	• Java 9
	• Spring Boot 2.3
	• Spring Data JPA
	• Spring Security (OAuth2)
	• SQL Server
	• Angular 9
	• Eclipse IDE
 

###### Ao executar o projeto, atenção nos seguintes pontos:

	• O Angular está na pasta 'presentation' dentro da raiz do projeto.
	• No Angular, o arquivo 'environment.ts' está apontando para a api em http://localhost:8080/
	• Na API, a classe 'CorsConfig' no pacote 'com.example.demo.security' está permitindo apenas http://localhost:4200
	• Uma base de dados com o nome 'demo' deve ser criada, pois o Hibernate não está executando o create.
	• Os dados de conexão ao banco de dados deve ser alterado no arquivo 'application.properties'. No meu caso, utilizei conexão integrada com o Windows.
	• Criei uma classe chamada 'DataInitializr' para inserir os dados padrão solicitados.
