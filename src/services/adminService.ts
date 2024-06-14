import type { OwnerItem, OwnerItemBodyRequest } from '@/typesAndUtils/types'
import { get, post } from './apiService'
import { BACKEND_URL } from '@/constants/constant'
import { getEmptyItem } from '@/typesAndUtils/utils'

export async function fetchProperties(): Promise<OwnerItem[]> {
  const url = BACKEND_URL + '/properties/getOwnsAndProps'
  const response = await get<OwnerItem[]>(url)
  if (response.data?.length == 0) throw new Error('Array is empty!')
  if (response.error) {
    throw new Error(response.error)
  }
  return response.data ?? []
}

export async function createProperty(body: OwnerItemBodyRequest) {
  const url = BACKEND_URL + '/property/createProperty'
  const response = await post<OwnerItem>(url, body)
  if (response.error) {
    throw new Error(response.error)
  }
  return response.data ?? getEmptyItem()
}

export async function updateProperty(id: number, body: OwnerItemBodyRequest) {
  const url = BACKEND_URL + '/property/updateProperty/' + id
  const response = await post(url, body)
  if (response.error) {
    throw new Error(response.error)
  }
}

export async function uploadImages(id: number, body: any) {
  const url = BACKEND_URL + '/pictures/uploadPictures/' + id
  const data = post(url, body)
}
