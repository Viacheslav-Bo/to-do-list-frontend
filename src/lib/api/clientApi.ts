import { nextServer } from "./api";
import type { User } from "@/types/user";

export type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  status: number;
  message: string;
  data: { user: { id: string; email: string } };
};

export const login = async (payload: LoginRequest): Promise<User> => {
  await nextServer.post<LoginResponse>("/auth/login", payload);
  return getMe();
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export const register = async (payload: RegisterRequest): Promise<User> => {
  const res = await nextServer.post<User>("/auth/register", payload);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>("/user/me");
  return data;
};
