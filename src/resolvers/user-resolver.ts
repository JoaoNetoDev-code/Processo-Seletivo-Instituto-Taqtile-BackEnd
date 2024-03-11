import { Resolver, Mutation, Query, Arg } from 'type-graphql';
import { User } from '../entity/user';
import { appDataSource } from '../data-source';

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async getUsers() {
    const users = appDataSource.getRepository(User);
    return users.find();
  }

  @Mutation(() => User)
  async createUser(
    @Arg('name') name: string,
    @Arg('password') password: string,
    @Arg('email') email: string,
    @Arg('birthDate') birthDate: string,
  ): Promise<User> {
    const newUser = appDataSource.getRepository(User);
    const savedUser = await newUser.save({
      name,
      password,
      email,
      birthDate,
    });
    return savedUser;
  }
}
