import { Resolver, Mutation, Query, Field, Arg, InputType } from 'type-graphql';
import { IsDateString, IsEmail, Matches, MinLength } from 'class-validator';

import { appDataSource } from '../data-source';
import { UserModel } from '../model/user-model';
import { User } from '../entity/user';

@InputType()
class CreateUserInput {
  @Field()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(6)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
  password: string;

  @Field()
  @IsDateString()
  birthDate: string;
}

@Resolver()
export class UserResolver {
  users = appDataSource.getRepository(User);

  @Query(() => [UserModel])
  async getUsers() {
    return await this.users.find();
  }

  @Mutation(() => UserModel)
  async createUser(@Arg('userData') userData: CreateUserInput): Promise<UserModel> {
    const userExists = await this.users.find({ where: { email: userData.email } });

    if (!userExists.length) {
      return await this.users.save(userData);
    }
    return;
  }
}
