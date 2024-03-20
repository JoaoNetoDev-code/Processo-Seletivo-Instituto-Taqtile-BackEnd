import axios, { AxiosResponse } from 'axios';
import { describe, it } from 'mocha';
import { expect } from 'chai';

import { createUserMutation, deleteUserMutation, getUserQuery } from '../resolvers/user-resolver-test';
import { CreateUserType, DeleteUserType, GetUsersType } from './../types/get-users-type';

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

  it('A MUTATION createUser deve retorna as informações do usuário criado.', async () => {
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

  it('A MUTATION deleteUser deve retorna o usuario removido em caso de sucesso.', async () => {
    const response: AxiosResponse<{ data: DeleteUserType }> = await axios.post(url, {
      query: deleteUserMutation,
      variables: { deleteUserId: 1 },
    });

    expect(response.status).to.equal(200);
    expect(response.data.data).to.deep.equal({ deleteUser: { ...createUser } });
  });
});
