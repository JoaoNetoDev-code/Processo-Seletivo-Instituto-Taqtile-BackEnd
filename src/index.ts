import { ApolloServer } from 'apollo-server';
import 'reflect-metadata';
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

  server.listen({ port: 3001 });

  console.log('Servidor on na porta: 3001');
};

main();
