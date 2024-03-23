import { sign, verify } from 'jsonwebtoken';
import envRequestVariables from './request-variables';

const variables = envRequestVariables();

const verifyToken = (token: string) => {
  try {
    return verify(token, variables.JWT_SECRET);
  } catch (err) {
    throw new Error(`Erro ao realizar o decode: ${err}`);
  }
};

const signToken = (payload: string) => {
  try {
    return sign(payload, variables.JWT_SECRET);
  } catch (err) {
    throw new Error(`Erro ao realizar o encode: ${err}`);
  }
};

export default { signToken, verifyToken };
