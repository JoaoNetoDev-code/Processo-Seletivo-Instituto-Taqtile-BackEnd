import axios from 'axios';
import { describe, it, beforeEach } from 'mocha';
import { appDataSource } from '../../data-source';
import { expect } from 'chai';

import helloQuery from '../resolvers/hello-resolver';

describe('Testando a QUERY hello', () => {
  beforeEach('Iniciando o servidor', function () {
    appDataSource.initialize();
  });

  it("A QUERY deve retornar a string 'Hello, world!' ao ser chamada.", async () => {
    const response = await axios.post('http://localhost:3001/client', {
      query: helloQuery,
    });

    expect(response.status).to.equal(200);
    expect(response.data.data.hello).to.equal('Hello, world!');
  });
});
