import type { OwnerItem, OwnerItemBodyRequest } from '@/typesAndUtils/types'
import { get, post } from './apiService'
import { BACKEND_URL } from '@/constants/constant'
import { getEmptyItem } from '@/typesAndUtils/utils'

export async function fetchProperties(): Promise<OwnerItem[]> {
  const response = await get<OwnerItem[]>(`${BACKEND_URL}/ownersandproperties`)
  if (response.error) {
    throw new Error(response.error)
  }
  return response.data ?? []
}

export async function uploadImages(id: number, body: any) {
  const url = BACKEND_URL + `/uploadImages/` + id
  const data = post(url, body)
}

export async function createProperty(body: OwnerItemBodyRequest) {
  const url = BACKEND_URL + '/creatingProp'
  const response = await post<OwnerItem>(url, body)
  if (response.error) {
    throw new Error(response.error)
  }
  return response.data ?? getEmptyItem()
}

export async function updateProperty(id: number, body: OwnerItemBodyRequest) {
  const url = BACKEND_URL + '/updateProp/' + id
  const response = await post(url, body)
  if (response.error) {
    throw new Error(response.error)
  }
}
