import axios, { AxiosResponse } from 'axios';
import { describe, it } from 'mocha';
import { expect } from 'chai';

import { getUserQuery } from '../resolvers/user-resolver-test';
import { GetUsersType } from './../types/get-users-type';

const url = 'http://localhost:3002/client';

describe('Testando user-resolver', () => {
  it('A QUERY  getUser deve retorna todos os usuários do banco de dados.', async () => {
    const response: AxiosResponse<{ data: GetUsersType }> = await axios.post(url, {
      query: getUserQuery,
    });

    expect(response.status).to.equal(200);
    expect(response.data.data.getUsers).to.deep.equal([]);
  });
});
