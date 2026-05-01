import { Router } from "express";
import { authticate } from "../auth/middleware";
import {
  getAllWorkspaces,
  createWorkspace,
  getWorkspace,
  updateWorkspace,
  deleteWorkspace,
} from "./controller";

const router = Router();

router.post("/create", authticate, createWorkspace);
router.get("/all", authticate, getAllWorkspaces);
router.get("/:id", authticate, getWorkspace);
router.patch("/update/:id", authticate, updateWorkspace);
router.delete("/delete/:id", authticate, deleteWorkspace);

export default router;
