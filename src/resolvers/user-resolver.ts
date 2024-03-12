import { Resolver, Mutation, Query, Field, Arg, InputType } from 'type-graphql';
import { appDataSource } from '../data-source';
import { User } from '../entity/user';
import { UserModel } from '../model/user-model';

@InputType()
class CreateUserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  birthDate: string;
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
    return this.users.save(userData);
  }
}
