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
    com graphql
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
  - ## TypeORM: https://typeorm.io/
  - ## Class-validator: https://github.com/typestack/class-validator

# anotações extras:

- O graphql faz a verificação de entrada de dados mesmo que você não tenha feito nem uma verificação, a principio ele apenas verifica tipo de dados e se os campos solicitados estão presentes, no entando ao utilizar o class-validator "lib" junto ao graphql pode ocorrer um erro onde ele lança um erro de "validationErrors". isso é um bug de versão e pode ser corrigido atualizando o type-graphql para ^2.0.0, caso não seja possivel fazer isso no momento existe a possibilidade de se colocar a opção ` validate: { forbidUnknownValues: false }` no seu schema, veja o exemplo:
- `  const schema = await buildSchema({
  resolvers: [Hello, UserResolver],
  validate: { forbidUnknownValues: false },
});`

isso ira ignorar as verificações de tipo de dado por hora. lembre de remove-lo assim que tiver feito suas verificações e o codigo ira funcionar normalmente.
mais informações: https://github.com/MichalLytek/type-graphql/issues/1397
