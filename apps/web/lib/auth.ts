import { api } from "./api";

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await api.post("/auth/login", data);
  console.log(response);
  return response.data;
};

export const signupUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};
