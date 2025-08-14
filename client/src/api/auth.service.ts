import { api } from "./axios";
import type { AuthMeResponse } from "../types/interfaces";
import type { User } from "../types/interfaces";

function mapApiToUser(data: AuthMeResponse): User {
  return {
    id: data.id,
    email: data.email,
    name: data.name ?? "",
  };
}
export async function fetchMe(): Promise<User> {
  const { data } = await api.get<AuthMeResponse>("/auth");
  return mapApiToUser(data);
}
