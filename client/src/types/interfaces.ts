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

export interface Inventory {
  id: string;
  title: string;
  description?: string | null;
  category?: string | null;
  tags: string[];
  isPublic: boolean;
  version: number;
  createdAt: string;
  ownerId: string;
}

export interface InventoryListResponse {
  items: Inventory[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
