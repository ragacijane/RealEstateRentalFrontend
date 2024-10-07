import type { Property, ItemBody } from '@/typesAndUtils/types'
import { get, post, postImages, put, toggle } from './apiService'
import { BACKEND_URL } from '@/constants/constant'
import { getEmptyItem } from '@/typesAndUtils/utils'
import { checkTokenExpiration, getAuthHeaders } from './authService';


export async function fetchProperties(): Promise<Property[]> {
  if (!checkTokenExpiration()) {
    throw new Error('Token expired');
  }
  const url = `${BACKEND_URL}/admin/properties`;
  const response = await get<Property[]>(url, getAuthHeaders());
  if (response.data?.length === 0) throw new Error('Array is empty!');
  if (response.error) throw new Error(response.error);
  return response.data ?? [];
}

export async function createProperty(body: ItemBody) {
  if (!checkTokenExpiration()) {
    throw new Error('Token expired');
  }
  const url = `${BACKEND_URL}/admin/properties`;
  const response = await post<number>(url, body, getAuthHeaders());
  if (response.error) throw new Error(response.error);
  return response.data ? Number(response.data) : 0;
}

export async function updateProperty(body: ItemBody) {
  if (!checkTokenExpiration()) {
    throw new Error('Token expired');
  }
  const url = `${BACKEND_URL}/admin/properties`;
  const response = await put(url, body, getAuthHeaders());
  if (response.error) throw new Error(response.error);
}

export async function updateImages(id: number, body: FormData) {
  if (!checkTokenExpiration()) {
    throw new Error('Token expired');
  }
  const url = `${BACKEND_URL}/pictures/upload/${id}`;
  const resp = await postImages<string>(url, body, getAuthHeaders());
  if (resp.error) console.error(resp.data);
  return resp.data ?? '';
}

export async function toggleActive(id: number) {
  if (!checkTokenExpiration()) {
    throw new Error('Token expired');
  }
  const url = `${BACKEND_URL}/admin/properties/${id}/toggle-active`
  return await toggle(url, getAuthHeaders());
}

export async function toggleVisible(id: number) {
  if (!checkTokenExpiration()) {
    throw new Error('Token expired');
  }
  const url = `${BACKEND_URL}/admin/properties/${id}/toggle-visible`
  return await toggle(url, getAuthHeaders());
}
