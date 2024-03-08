- # Quais problemas o graphql resolve??
- # Aprenda comigo.

  - ## Overfetching:
  - É quando o back-end retorna mais dados do que o necessario para aquele momento da aplicação

  - ## Underfetching
  - É quando o back-end retorna dados insuficiêntes para a aplicação.

- # Pontos negativos:
  - Maior complexidade de implementação.
  - Cache das requisições.
      por ter uma unica rota na aplicação é mais difícil determinar o chache das requisições, em aplicações rest comuns por exemplo o browser faz esse processo automaticamente.
  - Erros
      a tratativa de erros tornasse mais complicada pois o graphql retorna um unico status http: 200 padrão para todas as requisições, fazendo-se necessario levar a tratativa de erros alem do que o browser considere sucesso, uma melhor definição de dados e uma divisão por camadas "Model" e "service" por exemplo.

- ## schema first and code first.
    - existem duas formas de implementar uma API
      com  graphql
    - SCHEMA FIRST: é quando cria-se primeiro o schame da requisição "query".
    - CODE FIRST: é quando cria-se primeiro o codigo da "query" é o proprio graphql gera o schema correspondente.
  
- ## observação: EXISTEM DUAS FORMAS DE REQUISÇÕES NO GRAPHQL:
  - QUERY: é todo método do tipo GET que busca e retorna dados de um determinado schema.
  - MUTATION: é toda forma que altere crie ou delete um schame dentro para o GRAPHQL.

    - ## Nesta aplicação irei usar o CODE FIRST.

- # links uteis:
  - ## Type-graphql: https://typegraphql.com/
  - ## Apollo-server: https://www.apollographql.com/docs/apollo-server/
  - ## Graphql: https://graphql.org/
  - ## Class-validator: https://github.com/typestack/class-validator