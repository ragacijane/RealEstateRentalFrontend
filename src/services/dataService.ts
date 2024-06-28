// src/services/dataService.ts
import { get } from './apiService'
import { BACKEND_URL } from '../constants/constant'
import {
  type Tag,
  type Equipment,
  type Types,
  type Borough,
  type Structure
} from '../typesAndUtils/types'

export async function fetchTags(): Promise<Tag[]> {
  const url = BACKEND_URL + '/constants/getTags'
  const response = await get<Tag[]>(url)
  if (response.data?.length == 0) throw new Error('Array is empty!')
  if (response.error) {
    throw new Error(response.error)
  }
  return response.data ?? []
}

export async function fetchTagsFromProperty(id: number): Promise<number[]> {
  const url = BACKEND_URL + '/properties/getTags/' + id
  const response = await get<number[]>(url)
  if (response.data?.length == 0) throw new Error('Array is empty!')
  if (response.error) {
    throw new Error(response.error)
  }
  return response.data ?? []
}

export async function fetchEquipment(): Promise<Equipment[]> {
  const url = BACKEND_URL + '/constants/getEquipments'
  const response = await get<Equipment[]>(url)
  if (response.data?.length == 0) throw new Error('Array is empty!')
  if (response.error) {
    throw new Error(response.error)
  }
  return response.data ?? []
}

export async function fetchTypes(): Promise<Types[]> {
  const url = BACKEND_URL + '/constants/getTypes'
  const response = await get<Types[]>(url)
  if (response.data?.length == 0) throw new Error('Array is empty!')
  if (response.error) {
    throw new Error(response.error)
  }
  return response.data ?? []
}

export async function fetchBoroughs(): Promise<Borough[]> {
  const url = BACKEND_URL + '/constants/getBoroughs'
  const response = await get<Borough[]>(url)
  if (response.data?.length == 0) throw new Error('Array is empty!')
  if (response.error) {
    throw new Error(response.error)
  }
  return response.data ?? []
}

export async function fetchStructures(): Promise<Structure[]> {
  const url = BACKEND_URL + '/constants/getStructures'
  const response = await get<Structure[]>(url)
  if (response.data?.length == 0) throw new Error('Array is empty!')
  if (response.error) {
    throw new Error(response.error)
  }
  return response.data ?? []
}

export async function fetttchImages(id: number) {
  const url = BACKEND_URL + '/pictures/getPictures/' + id
  const response = await get<string[]>(url)
  if (response.data?.length == 0) throw new Error('Array is empty!')
  if (response.error) {
    throw new Error(response.error)
  }
  return response.data ?? []
}

export async function fetchImages(id: number) {
  const url = BACKEND_URL + '/pictures/getPictures/' + id
  const response = await get<string[]>(url)
  if (response.error) {
    throw new Error(response.error)
  }
  return response.data ?? []
}
