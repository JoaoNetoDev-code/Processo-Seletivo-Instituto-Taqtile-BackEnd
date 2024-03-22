import axios from 'axios';
import { describe, it } from 'mocha';
import { expect } from 'chai';

import helloQuery from '../resolvers/hello-resolver-test';
import envRequestVariables from '../../utils/request-variables';

const PORT = envRequestVariables().DB_HOST;
const URL = `http://localhost:${PORT}`;

describe('Testando a QUERY hello', () => {
  it("A QUERY deve retornar a string 'Hello, world!' ao ser chamada.", async () => {
    const response = await axios.post(URL, {
      query: helloQuery,
    });

    expect(response.status).to.equal(200);
    expect(response.data.data.hello).to.equal('Hello, world!');
  });
});
