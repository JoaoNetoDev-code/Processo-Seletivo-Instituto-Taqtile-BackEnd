import * as argon2 from 'argon2';

const verifyToken = async (payload: string, token: string) => {
  try {
    const decoded = await argon2.verify(token, payload);
    return decoded;
  } catch (err) {
    console.error(`Erro ao realizar o decoded: ${err}`);
  }
};

const signToken = async (payload: string) => {
  try {
    const encoded = await argon2.hash(payload);
    return encoded;
  } catch (err) {
    throw new Error(`Erro ao realizar o encoded: ${err}`);
  }
};

export { signToken, verifyToken };
