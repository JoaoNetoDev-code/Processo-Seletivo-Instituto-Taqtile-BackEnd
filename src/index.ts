import "reflect-metadata";

import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server';
import path from 'path';
import { Hello } from "./resolvers/Hello";

const main = async () => {
  const schema = await buildSchema({
    resolvers: [Hello],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  })

  const myServer = new ApolloServer({
    schema,
  })

  const { url } = await myServer.listen(3001)
  console.log(`Servidor On na porta ${url}`)
}

main();