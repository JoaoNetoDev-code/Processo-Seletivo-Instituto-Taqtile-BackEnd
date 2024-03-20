export const getUserQuery = `
query {
  getUsers {
    id
    name
    email
    birthDate
  }
}`;

export const createUserMutation = `
mutation($userData: CreateUserInput!) {
  createUser(userData: $userData) {
    id
    name
    email
    birthDate
  }
}`;

export const deleteUserMutation = `
mutation($deleteUserId: Float!) {
  deleteUser(id: $deleteUserId) {
    id
    name
    email
    birthDate
  }
}`;
