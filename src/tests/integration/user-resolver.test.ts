import axios, { AxiosResponse } from 'axios';
import { before, beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';

import {
  createUserMutation,
  deleteUserMutation,
  getUserQuery,
  updateUserMutation,
} from '../resolvers/user-resolver-test';
import { CreateUserType, DeleteUserType, GetUsersType, UpdatedUserType } from './../types/get-users-type';

import { appDataSource } from '../../data-source';
import { User } from '../../entity/user';

import envRequestVariables from '../../utils/request-variables';
import { createUser, dateFuture } from '../mock-users/users-mock';

const PORT = envRequestVariables().DB_HOST;
const URL = `http://localhost:${PORT}`;

describe('Testando user-resolver', async () => {
  const users = appDataSource.getRepository(User);

  before('INICIANDO TESTES: ', async () => {
    await appDataSource.initialize();
  });

  beforeEach(async () => {
    users.clear();
  });

  it('A QUERY getUser deve retornar todos os usuários do banco de dados.', async () => {
    const response: AxiosResponse<{ data: GetUsersType }> = await axios.post(URL, {
      query: getUserQuery,
    });

    const allUsers = (await users.find()).length;

    expect(response.status).to.equal(200);
    expect(response.data.data.getUsers).to.have.length(allUsers);

    response.data.data.getUsers.forEach((user) => {
      expect(user).to.have.all.keys('id', 'name', 'email', 'birthdate');
      expect(user.id).to.not.be.undefined;
      expect(user.name).to.not.be.undefined;
      expect(user.email).to.not.be.undefined;
      expect(user.birthDate).to.not.be.undefined;
    });
  });

  it('A MUTATION createUser deve retornar as informações do usuário criado em caso de SUCESSO.', async () => {
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

    expect(response.data.data.createUser.name).to.deep.equal(createUser.name);
    expect(response.data.data.createUser.email).to.deep.equal(createUser.email);
  });

  it('A MUTATION createUser deve retornar um STATUS:200 e a mensagem: "Por favor, insira um endereço de e-mail válido." caso o atributo email seja inválido.', async () => {
    const response = await axios.post(URL, {
      query: createUserMutation,
      variables: {
        userData: { ...createUser, email: 'joao.com' },
      },
    });
    expect(response.status).to.equal(200);
    expect(response.data.errors[0].extensions.exception.validationErrors[0].constraints.isEmail).to.equal(
      'Por favor, insira um endereço de e-mail válido.',
    );
  });

  it('A MUTATION createUser deve retornar um STATUS:200 e a mensagem: "Deve ser uma data presente ou passada." caso o atributo birthDate seja uma data futura.', async () => {
    const response = await axios.post(URL, {
      query: createUserMutation,
      variables: {
        userData: { ...createUser, birthDate: dateFuture(10) },
      },
    });
    expect(response.status).to.equal(200);
    expect(response.data.errors[0].extensions.exception.validationErrors[0].constraints.maxDate).to.equal(
      'Deve ser uma data presente ou passada.',
    );
  });

  it('A MUTATION createUser deve retornar um STATUS:200 e a mensagem: "A senha deve ter no mínimo uma letra e um número." caso o password não possua os caracteres desejados.', async () => {
    const response = await axios.post(URL, {
      query: createUserMutation,
      variables: {
        userData: { ...createUser, password: '123454' },
      },
    });
    expect(response.status).to.equal(200);
    expect(response.data.errors[0].extensions.exception.validationErrors[0].constraints.matches).to.equal(
      'A senha deve ter no mínimo uma letra e um número.',
    );
  });

  it('A MUTATION createUser deve retornar um STATUS:200 e a mensagem: "A senha deve ter no mínimo 6 caracteres." caso o password não tenha um tamanho válido.', async () => {
    const response = await axios.post(URL, {
      query: createUserMutation,
      variables: {
        userData: { ...createUser, password: 'a1234' },
      },
    });
    expect(response.status).to.equal(200);
    expect(response.data.errors[0].extensions.exception.validationErrors[0].constraints.minLength).to.equal(
      'A senha deve ter no mínimo 6 caracteres.',
    );
  });

  it('A MUTATION deleteUser deve retornar o usuário removido em caso de SUCESSO.', async () => {
    const newUser = await users.save(createUser);

    const response: AxiosResponse<{ data: DeleteUserType }> = await axios.post(URL, {
      query: deleteUserMutation,
      variables: { deleteUserId: newUser.id },
    });
    expect(response.status).to.equal(200);
    expect(response.data.data.deleteUser).to.be.equal('Usuário removido com sucesso!');
  });

  it('A MUTATION deleteUser deve retornar o STATUS:200 e a mensagem: "Usuário não encontrado." caso não encontre o usuário do id recebido.', async () => {
    const response = await axios.post(URL, {
      query: deleteUserMutation,
      variables: { deleteUserId: -1 },
    });

    expect(response.status).to.equal(200);
    expect(response.data.errors[0].message).to.equal('Usuário não encontrado.');
  });

  it('A MUTATION updateUser deve ser capaz de retornar o objeto atualizado em caso de SUCESSO', async () => {
    const newUser = await users.save(createUser);

    const response: AxiosResponse<{ data: UpdatedUserType }> = await axios.post(URL, {
      query: updateUserMutation,
      variables: {
        updateUserId: newUser.id,
        userData: {
          name: 'joão Neto',
          birthDate: '12-18-1889',
          email: 'joaont@gmail.com',
          password: '123456d',
        },
      },
    });

    expect(response.status).to.equal(200);
    expect(response.data.data.updateUser.email).to.be.not.equal(newUser.email);
    expect(response.data.data.updateUser.name).to.be.not.equal(newUser.name);
    expect(response.data.data.updateUser.id).to.be.equal(newUser.id);
    expect(response.data.data.updateUser.birthDate).to.be.not.equal(newUser.birthDate);
  });

  it('A MUTATION updateUser deve ser capaz de atualizar o usuário independentemente da quantidade de parâmetros recebidos', async () => {
    const newUser = await users.save(createUser);

    const response: AxiosResponse<{ data: UpdatedUserType }> = await axios.post(URL, {
      query: updateUserMutation,
      variables: {
        updateUserId: newUser.id,
        userData: {
          name: 'sopa de caju',
          birthDate: '12-18-1998',
        },
      },
    });

    expect(response.status).to.equal(200);

    expect(response.data.data.updateUser.id).to.be.equal(newUser.id);
    expect(response.data.data.updateUser.email).to.be.equal(newUser.email);

    expect(response.data.data.updateUser.birthDate).to.be.not.equal(newUser.birthDate);
    expect(response.data.data.updateUser.name).to.be.not.equal(newUser.name);
  });
});
