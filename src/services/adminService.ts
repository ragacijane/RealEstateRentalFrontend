import type { OwnerItem, ItemBody } from '@/typesAndUtils/types'
import { get, post, postImages, put } from './apiService'
import { BACKEND_URL } from '@/constants/constant'
import { getEmptyItem } from '@/typesAndUtils/utils'
import { checkTokenExpiration, getAuthHeaders } from './authService';


export async function fetchProperties(): Promise<OwnerItem[]> {
  if (!checkTokenExpiration()) {
    throw new Error('Token expired');
  }
  const url = `${BACKEND_URL}/admin/properties`;
  const response = await get<OwnerItem[]>(url, getAuthHeaders());
  if (response.data?.length === 0) throw new Error('Array is empty!');
  if (response.error) throw new Error(response.error);
  return response.data ?? [];
}

export async function createProperty(body: ItemBody) {
  if (!checkTokenExpiration()) {
    throw new Error('Token expired');
  }
  const url = `${BACKEND_URL}/admin/properties`;
  const response = await post<OwnerItem>(url, body, getAuthHeaders());
  if (response.error) throw new Error(response.error);
  return response.data ?? Object.assign({}, getEmptyItem());
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
