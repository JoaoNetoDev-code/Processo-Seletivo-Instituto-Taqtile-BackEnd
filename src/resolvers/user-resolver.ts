import { Resolver, Mutation, Query, Field, Arg, InputType } from 'type-graphql';
import { IsEmail, IsOptional, Matches, MaxDate, MinLength } from 'class-validator';

import { appDataSource } from '../data-source';
import { UserModel } from '../model/user-model';
import { User } from '../entity/user';
import argonUtil from '../utils/argon-util';

@InputType()
class CreateUserInput {
  @Field()
  name: string;

  @Field()
  @IsEmail({}, { message: 'Por favor, insira um endereço de e-mail válido.' })
  email: string;

  @Field()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d).+$/, { message: 'A senha deve ter no mínimo uma letra e um número.' })
  password: string;

  @Field()
  @MaxDate(() => new Date(), { message: 'Deve ser uma data presente ou passada.' })
  birthDate: Date;
}

@InputType()
class UpdatedUserInput {
  @Field({ nullable: true })
  @IsOptional()
  @MinLength(2, { message: 'O nome deve ter no mínimo 2 caracteres.' })
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail({}, { message: 'Por favor, insira um endereço de e-mail válido.' })
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d).+$/, { message: 'A senha deve ter no mínimo uma letra e um número.' })
  password?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxDate(() => new Date(), { message: 'Deve ser uma data presente ou passada.' })
  birthDate?: Date;
}

@Resolver()
export class UserResolver {
  users = appDataSource.getRepository(User);

  @Query(() => [UserModel])
  async getUsers() {
    return this.users.find();
  }

  @Mutation(() => UserModel)
  async createUser(@Arg('userData') userData: CreateUserInput): Promise<UserModel> {
    const userExists = await this.users.findOne({ where: { email: userData.email } });

    if (userExists) {
      throw new Error('Erro ao cadastrar novo usuário.');
    }

    const token = await argonUtil.signHashPassword(userData.password);

    return this.users.save({ ...userData, password: token });
  }

  @Mutation(() => String)
  async deleteUser(@Arg('id') id: number): Promise<string> {
    const userExists = await this.users.findOne({ where: { id } });

    if (!userExists) {
      throw new Error('Usuário não encontrado.');
    }

    await this.users.remove(userExists);

    return 'Usuário removido com sucesso!';
  }

  @Mutation(() => UserModel)
  async updateUser(@Arg('id') id: number, @Arg('userData') userData: UpdatedUserInput): Promise<UserModel> {
    const userExists = await this.users.findOne({ where: { id } });
    const emailIsDuplicate = await this.users.findOne({ where: { email: userData.email } });

    if (!userExists) {
      throw new Error('Usuário não encontrado.');
    }

    if (emailIsDuplicate && emailIsDuplicate.id !== userExists.id) {
      throw new Error('O e-mail fornecido já está em uso por outro usuário.');
    }

    Object.assign(userExists, userData);

    if (userData.password) {
      userExists.password = await argonUtil.signHashPassword(userData.password);
    }

    return this.users.save(userExists);
  }
}
