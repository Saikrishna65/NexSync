import { Workspace } from "./schema";

export const createWorkspaceService = async (name: string, id: string) => {
  const existingWorkspace = await Workspace.findOne({ name, owner: id });
  if (existingWorkspace) {
    throw new Error(
      "Workspace with the same name already exists for this user",
    );
  }

  const workspace = new Workspace({
    name,
    owner: id,
    members: [{ user: id, role: "owner" }],
  });
  await workspace.save().then((savedWorkspace) => {
    return savedWorkspace;
  });
};

export const getAllWorkspacesService = async (id: string) => {
  const workspaces = await Workspace.find({ "members.user": id });
  return workspaces;
};

export const getWorkspaceService = async (id: string, userId: string) => {
  const workspace = await Workspace.findOne({
    _id: id,
    "members.user": userId,
  });
  if (!workspace) {
    throw new Error("Workspace not found");
  }
  return workspace;
};

export const updateWorkspaceService = async (
  id: string,
  userId: string,
  data: any,
) => {
  const workspace = await Workspace.findOneAndUpdate(
    {
      _id: id,
      members: {
        $elemMatch: {
          user: userId,
          role: { $in: ["owner", "editor"] },
        },
      },
    },
    data,
    { new: true },
  );

  if (!workspace) {
    throw new Error(
      "Workspace not found or user does not have permission to update",
    );
  }
  return workspace;
};

export const deleteWorkspaceService = async (id: string, userId: string) => {
  const workspace = await Workspace.findOneAndDelete({
    _id: id,
    owner: userId,
  });
  if (!workspace) {
    throw new Error("Workspace not found or user is not owner");
  }
  return workspace;
};
