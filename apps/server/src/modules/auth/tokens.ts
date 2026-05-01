import jwt, { Secret } from "jsonwebtoken";

export const createAccessToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET as Secret, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY as any,
  });
};

export const createRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET as Secret, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY as any,
  });
};
