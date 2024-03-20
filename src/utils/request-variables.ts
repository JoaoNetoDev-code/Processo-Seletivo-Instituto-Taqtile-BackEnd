import * as dotenv from 'dotenv';

type test = {
  DB_PORT: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
};

type development = {
  DB_PORT: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
};

type variablesType = development | test;

const envRequestVariables = (): variablesType => {
  dotenv.config();

  const envAmbientVariable = {
    test: {
      DB_PORT: process.env.DB_PORT_TEST,
      DB_USERNAME: process.env.DB_USERNAME_TEST,
      DB_PASSWORD: process.env.DB_PASSWORD_TEST,
      DB_DATABASE: process.env.DB_DATABASE_TEST,
    },
    development: {
      DB_PORT: process.env.DB_PORT_DEV,
      DB_USERNAME: process.env.DB_USERNAME_DEV,
      DB_PASSWORD: process.env.DB_PASSWORD_DEV,
      DB_DATABASE: process.env.DB_DATABASE_DEV,
    },
  };

  const ambient = process.env.NODE_ENV || 'development';
  const ambientSpecificVariables = envAmbientVariable[ambient];

  return ambientSpecificVariables;
};

export default envRequestVariables;
