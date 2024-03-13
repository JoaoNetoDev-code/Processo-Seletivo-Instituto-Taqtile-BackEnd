import { sign, verify } from 'jsonwebtoken';

export const verifyToken = (token: string) => {
  try {
    const decode = verify(token, process.env.JWT_SECRET);
    return decode;
  } catch (err) {
    throw new Error(`Erro ao realizar o decode: ${err}`);
  }
};

export const signToken = (data: string) => {
  try {
    const encode = sign(data, process.env.JWT_SECRET);
    return encode;
  } catch (err) {
    throw new Error(`Erro ao realizar o encode: ${err}`);
  }
};
