import { api } from "../api/axios";
import type { Inventory, InventoryListResponse } from "../types/interfaces";

export type ListParams = {
  page?: number;
  pageSize?: number;
  query?: string;
  tag?: string;
};

function cleanParams(p?: ListParams): Record<string, unknown> {
  if (!p) return {};
  const { page, pageSize, query, tag } = p;
  return {
    ...(page !== undefined ? { page } : {}),
    ...(pageSize !== undefined ? { pageSize } : {}),
    ...(query && query.trim() ? { query: query.trim() } : {}),
    ...(tag && tag.trim() ? { tag: tag.trim() } : {}),
  };
}

export async function listPublicInventories(
  params?: ListParams,
): Promise<InventoryListResponse> {
  const { data } = await api.get<InventoryListResponse>("/inventories", {
    params: cleanParams(params),
  });
  return data;
}

export async function listMyInventories(
  params?: Omit<ListParams, "tag">,
): Promise<InventoryListResponse> {
  const { data } = await api.get<InventoryListResponse>("/inventories", {
    params: { mine: true, ...cleanParams(params) },
  });
  return data;
}

export async function getInventory(id: string): Promise<Inventory> {
  const { data } = await api.get<Inventory>(`/inventories/${id}`);
  return data;
}

export type CreateInventoryDto = {
  title: string;
  description?: string;
  category?: string;
  tags?: string[];
  isPublic?: boolean;
};

export async function createInventory(
  payload: CreateInventoryDto,
): Promise<Inventory> {
  const { data } = await api.post<Inventory>("/inventories", payload);
  return data;
}

export type UpdateInventoryDto = {
  title?: string;
  description?: string | null;
  category?: string | null;
  tags?: string[];
  isPublic?: boolean;
  version: number;
};

export async function updateInventory(
  id: string,
  payload: UpdateInventoryDto,
): Promise<Inventory> {
  const { data } = await api.patch<Inventory>(`/inventories/${id}`, payload);
  return data;
}

export async function deleteInventory(id: string): Promise<void> {
  await api.delete(`/inventories/${id}`);
}
