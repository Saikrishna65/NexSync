import { Request, Response } from "express";
import {
  createWorkspaceService,
  deleteWorkspaceService,
  getAllWorkspacesService,
  getWorkspaceService,
  updateWorkspaceService,
} from "./service";

export const createWorkspace = async (req: Request, res: Response) => {
  try {
    const { name, id } = req.body;
    const workspace = await createWorkspaceService(name, id);

    res
      .status(201)
      .json({ message: "Workspace created successfully", workspace });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const getAllWorkspaces = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const workspaces = await getAllWorkspacesService(id);
    res
      .status(200)
      .json({ messages: "Workspaces fetched successfully", workspaces });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const getWorkspace = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const { userId } = req.body;
    const workspace = await getWorkspaceService(id, userId);
    res
      .status(200)
      .json({ message: "Workspace fetched successfully", workspace });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const updateWorkspace = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const { userId, data } = req.body;
    const workspace = await updateWorkspaceService(id, userId, data);
    res
      .status(200)
      .json({ message: "Workspace updated successfully", workspace });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const deleteWorkspace = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const { userId } = req.body;
    const workspace = await deleteWorkspaceService(id, userId);
    res
      .status(200)
      .json({ message: "Workspace deleted successfully", workspace });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
