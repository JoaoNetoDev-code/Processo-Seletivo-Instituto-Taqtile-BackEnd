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
  deleteUser(id: $deleteUserId)
}`;

export const updateUserMutation = `
mutation($userData: UpdatedUserInput!, $updateUserId: Float!) {
  updateUser(userData: $userData, id: $updateUserId) {
    id 
    name
    email
    birthDate
  }
}`;
