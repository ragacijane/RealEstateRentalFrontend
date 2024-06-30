import type { OwnerItem, OwnerItemBodyRequest, PicturesBody } from '@/typesAndUtils/types'
import { get, post, postImages, put } from './apiService'
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
  const url = BACKEND_URL + '/properties/createProperty'
  const response = await post<OwnerItem>(url, body)
  if (response.error) {
    throw new Error(response.error)
  }
  return response.data ?? Object.assign({}, getEmptyItem())
}

export async function updateProperty(id: number, body: OwnerItemBodyRequest) {
  const url = BACKEND_URL + '/properties/updateProperty/' + id
  const response = await put(url, body)
  if (response.error) {
    throw new Error(response.error)
  }
}

export async function updateImages(id: number, body: FormData) {
  const url = BACKEND_URL + '/pictures/updatePictures/' + id
  // console.log(JSON.stringify(Object.fromEntries(body.entries())))
  const resp = await postImages<string>(url, body)
  if (resp.error) {
    console.error(resp.data)
  }
  // console.log('Response')
  // console.log(resp.data)
  return resp.data ?? ''
}
