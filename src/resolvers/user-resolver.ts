import { Resolver, Mutation, Query, Arg } from 'type-graphql';
import { appDataSource } from '../data-source';
import { User } from '../entity/user';

@Resolver()
export class UserResolver {
  users = appDataSource.getRepository(User);

  @Query(() => [User])
  async getUsers() {
    return this.users.find();
  }

  @Mutation(() => User)
  async createUser(
    @Arg('name') name: string,
    @Arg('password') password: string,
    @Arg('email') email: string,
    @Arg('birthDate') birthDate: string,
  ): Promise<User> {
    const savedUser = await this.users.save({
      name,
      password,
      email,
      birthDate,
    });
    return savedUser;
  }
}
