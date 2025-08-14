export interface User {
  id: string;
  name: string;
  email: string;
  authToken?: string;
}

export interface ApiUser {
  id: string;
  email: string;
  name?: string | null;
  role?: "USER" | "ADMIN";
}

export interface AuthMeResponse {
  id: string;
  email: string;
  name?: string | null;
  role?: "USER" | "ADMIN";
}
