import { DataSource } from 'typeorm';
import { User } from './entity/user';
import envRequestValues from './utils/request-variables';

const variables = envRequestValues();

export const appDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: parseInt(variables.DB_PORT),
  username: variables.DB_USERNAME,
  password: variables.DB_PASSWORD,
  database: variables.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
