import { Request, Response } from "express";
import { loginUser, registerUser } from "./service";
import { User } from "./schema";
import Jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const { accessToken, refreshToken, user } = await registerUser(
      name,
      email,
      password,
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ message: "User registered and logged in", user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const { accessToken, refreshToken, user } = await loginUser(
      email,
      password,
    );

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ message: "Login successful", user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const refresh = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res.status(401).json({ error: "No refresh token provided" });
  }

  try {
    const decoded = Jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as {
      userId: string;
    };

    const user = await User.findById(decoded.userId);
    if (!user || !user.refreshTokens.includes(token)) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }
    user.refreshTokens = user.refreshTokens.filter((t) => t !== token);
    const newAccessToken = Jwt.sign(
      {
        userId: decoded.userId,
      },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: "15m" },
    );

    const newRefreshToken = Jwt.sign(
      {
        userId: decoded.userId,
      },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "7d" },
    );

    user.refreshTokens.push(newRefreshToken);
    await user.save();

    res.cookie("accessToken", newAccessToken, { httpOnly: true });
    res.cookie("refreshToken", newRefreshToken, { httpOnly: true });
    res.json({ message: "Token refreshed" });
  } catch (error: any) {
    res.status(401).json({ message: "Invalid Refresh Token" });
  }
};

export const logout = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res.status(400).json({ error: "No refresh token provided" });
  }

  const decoded = Jwt.decode(token) as { userId: string };
  const user = await User.findById(decoded.userId);

  if (user) {
    user.refreshTokens = user.refreshTokens.filter((t) => t !== token);
    await user.save();
  }

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.json({ message: "Logged out successfully" });
};
