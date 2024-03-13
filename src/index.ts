import 'reflect-metadata';

import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/user-resolver';
import { appDataSource } from './data-source';
import { Hello } from './resolvers/hello';

const main = async () => {
  await appDataSource.initialize();

  const schema = await buildSchema({
    resolvers: [Hello, UserResolver],
  });

  const server = new ApolloServer({ schema });

  await server.listen({ port: 3001 }).then(({ url }) => console.log(`Servidor on na porta: ${url}`));
};

main();
