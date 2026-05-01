import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";

export const authticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ error: "No access token provided" });
  }
  try {
    const decoded = Jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid access token" });
  }
};
