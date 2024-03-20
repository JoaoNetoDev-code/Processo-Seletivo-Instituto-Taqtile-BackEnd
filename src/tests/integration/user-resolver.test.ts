import axios, { AxiosResponse } from 'axios';
import { after, before, describe, it } from 'mocha';
import { expect } from 'chai';

import { createUserMutation, deleteUserMutation, getUserQuery } from '../resolvers/user-resolver-test';
import { CreateUserType, DeleteUserType, GetUsersType } from './../types/get-users-type';

import { appDataSource } from '../../data-source';
import { User } from '../../entity/user';
import { faker } from '@faker-js/faker/locale/pt_BR';

import envRequestVariables from '../../utils/request-variables';

const PORT = envRequestVariables().DB_HOST;
const URL = `http://localhost:${PORT}`;

const prefix = (Math.floor(Math.random() * 10) + 1).toString();
const createUser = {
  name: faker.internet.userName(),
  email: faker.internet.email(),
  birthDate: faker.date.birthdate({ refDate: new Date() }),
  password: faker.internet.password({ memorable: true, prefix, pattern: /[a-zA-Z0-9]+/ }),
};

describe('Testando user-resolver', async () => {
  const users = appDataSource.getRepository(User);

  before('INICIANDO TESTES: ', async () => {
    await appDataSource.initialize();
  });

  after('TESTE FINALIZADO: LIMPANDO ENTITY DE USER', async () => {
    await users.clear();
  });

  it('A QUERY  getUser deve retorna todos os usuários do banco de dados.', async () => {
    const response: AxiosResponse<{ data: GetUsersType }> = await axios.post(URL, {
      query: getUserQuery,
    });

    const allUsers = (await users.find()).length;

    expect(response.status).to.equal(200);
    expect(response.data.data.getUsers).to.have.length(allUsers);
  });

  it('A MUTATION createUser deve retorna as informações do usuário criado.', async () => {
    const response: AxiosResponse<{ data: CreateUserType }> = await axios.post(URL, {
      query: createUserMutation,
      variables: {
        userData: createUser,
      },
    });
    const userInsert = await users.findOne({ where: { id: response.data.data.createUser.id } });

    expect(response.status).to.equal(200);
    expect(response.data.data.createUser.name).to.deep.equal(userInsert.name);
    expect(response.data.data.createUser.email).to.deep.equal(userInsert.email);
    expect(response.data.data.createUser.id).to.deep.equal(userInsert.id);
  });

  it('A MUTATION deleteUser deve retorna o usuario removido em caso de sucesso.', async () => {
    const getUsers = await users.find();
    const getFirst = getUsers.filter((_user, index) => index == 0);

    const response: AxiosResponse<{ data: DeleteUserType }> = await axios.post(URL, {
      query: deleteUserMutation,
      variables: { deleteUserId: getFirst[0].id },
    });

    expect(response.status).to.equal(200);
    expect(response.data.data.deleteUser.id).to.equal(getFirst[0].id);
    expect(response.data.data.deleteUser.name).to.equal(getFirst[0].name);
    expect(response.data.data.deleteUser.email).to.equal(getFirst[0].email);
  });
});
