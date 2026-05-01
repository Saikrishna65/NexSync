import { Router } from "express";
import { login, logout, refresh, register } from "./controller";
import { authticate } from "./middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

router.get("/me", authticate, (req, res) => {
  res.json({ message: "Autnenticated", user: (req as any).user });
});

export default router;
