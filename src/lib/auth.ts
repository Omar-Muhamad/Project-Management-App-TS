import bcrypt from 'bcrypt';
import { SignJWT, jwtVerify } from 'jose';
import { db } from './db';

const hashPassword = (password) => bcrypt.hash(password, 10);

const comparePasswords = (plainTextPassword, hashPassword) =>
  bcrypt.compare(plainTextPassword, hashPassword);

const createJWT = (user) => {
  const initiation = Math.floor(Date.now() / 1000);
  const expiration = initiation + 60 * 60 * 24 * 7;

  return new SignJWT({ id: user.id, email: user.email })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(expiration)
    .setIssuedAt(initiation)
    .setNotBefore(initiation)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

const validateJWT = async (jwt) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET),
  );

  return payload;
};

const getUserFromCookie = async (cookies) => {
  const jwt = cookies.get(process.env.COOKIE_NAME);
  const { id } = await validateJWT(jwt.value);

  const user = await db.user.findUnique({
    where: {
      id: id as string,
    },
  });

  return user;
};

export {
  hashPassword,
  comparePasswords,
  createJWT,
  validateJWT,
  getUserFromCookie,
};
