import axios, { AxiosResponse } from 'axios';
import { describe, it } from 'mocha';
import { expect } from 'chai';

import { createUserMutation, getUserQuery } from '../resolvers/user-resolver-test';
import { CreateUserType, GetUsersType } from './../types/get-users-type';

const url = 'http://localhost:3002/';

const createUser = {
  id: 1,
  name: 'joão neto',
  email: 'joaoneto.adm2@gmail.com',
  birthDate: '1998-12-18T03:00:00.000Z',
};

describe('Testando user-resolver', () => {
  it('A QUERY  getUser deve retorna todos os usuários do banco de dados.', async () => {
    const response: AxiosResponse<{ data: GetUsersType }> = await axios.post(url, {
      query: getUserQuery,
    });

    expect(response.status).to.equal(200);
    expect(response.data.data.getUsers).to.deep.equal([]);
  });

  it('A Mutation createUser deve retorna as informações do usuário criado.', async () => {
    const response: AxiosResponse<{ data: CreateUserType }> = await axios.post(url, {
      query: createUserMutation,
      variables: {
        userData: {
          name: 'joão neto',
          password: '12345d',
          email: 'joaoneto.adm2@gmail.com',
          birthDate: '12-18-1998',
        },
      },
    });

    expect(response.status).to.equal(200);
    expect(response.data.data).to.deep.equal({ createUser });
  });
});
