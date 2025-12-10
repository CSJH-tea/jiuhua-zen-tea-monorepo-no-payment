import jwt from 'jsonwebtoken';
const signAccessToken = (payload: object) => {
  const secret = process.env.JWT_ACCESS_SECRET || 'dev';
  const exp = Number(process.env.ACCESS_TOKEN_EXPIRES_IN) || 3600;
  return jwt.sign(payload, secret, { expiresIn: exp + 's' });
};
const signRefreshToken = (payload: object) => {
  const secret = process.env.JWT_REFRESH_SECRET || 'dev2';
  const exp = Number(process.env.REFRESH_TOKEN_EXPIRES_IN) || 604800;
  return jwt.sign(payload, secret, { expiresIn: exp + 's' });
};
const verifyRefreshToken = (token: string) => jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'dev2');
export { signAccessToken, signRefreshToken, verifyRefreshToken };
