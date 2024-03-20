import { UserModel } from '../../model/user-model';

export type GetUsersType = {
  getUsers: UserModel[];
};

export type CreateUserType = {
  createUser: UserModel;
};
