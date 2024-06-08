// src/services/dataService.ts
import { get } from './apiServices';
import { BACKEND_URL } from './constant';
import type { Tag, Equipment, Types, Borough, Structure } from './types';


export async function fetchTags(): Promise<Tag[]> {
  const response = await get<Tag[]>(`${BACKEND_URL}/listOfTags`);
  if (response.error) {
    throw new Error(response.error);
  }
  return response.data ?? [];
}

export async function fetchEquipment(): Promise<Equipment[]> {
  const response = await get<Equipment[]>(`${BACKEND_URL}/getEquipments`);
  if (response.error) {
    throw new Error(response.error);
  }
  return response.data ?? [];
}

export async function fetchTypes(): Promise<Types[]> {
  const response = await get<Types[]>(`${BACKEND_URL}/getTypes`);
  if (response.error) {
    throw new Error(response.error);
  }
  return response.data ?? [];
}

export async function fetchBoroughs(): Promise<Borough[]> {
  const response = await get<Borough[]>(`${BACKEND_URL}/getBoroughs`);
  if (response.error) {
    throw new Error(response.error);
  }
  return response.data ?? [];
}

export async function fetchStructures(): Promise<Structure[]> {
  const response = await get<Structure[]>(`${BACKEND_URL}/getStructures`);
  if (response.error) {
    throw new Error(response.error);
  }
  return response.data ?? [];
}
