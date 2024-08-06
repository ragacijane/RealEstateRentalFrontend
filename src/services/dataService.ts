// src/services/dataService.ts
import { get } from './apiService'
import { BACKEND_URL } from '../constants/constant'
import {
  type Tag,
  type Equipment,
  type Types,
  type Borough,
  type Structure,
  type PictureDto
} from '../typesAndUtils/types'

export async function fetchTags(): Promise<Tag[]> {
  const url = BACKEND_URL + '/constants/tags'
  const response = await get<Tag[]>(url)
  if (response.data?.length == 0) throw new Error('Array is empty!')
  // if (response.error) {
  //   throw new Error(response.error)
  // }
  return response.data ?? []
}

export async function fetchEquipment(): Promise<Equipment[]> {
  const url = BACKEND_URL + '/constants/equipments'
  const response = await get<Equipment[]>(url)
  if (response.data?.length == 0) throw new Error('Array is empty!')
  // if (response.error) {
  //   throw new Error(response.error)
  // }
  return response.data ?? []
}

export async function fetchTypes(): Promise<Types[]> {
  const url = BACKEND_URL + '/constants/types'
  const response = await get<Types[]>(url)
  if (response.data?.length == 0) throw new Error('Array is empty!')
  // if (response.error) {
  //   throw new Error(response.error)
  // }
  return response.data ?? []
}

export async function fetchBoroughs(): Promise<Borough[]> {
  const url = BACKEND_URL + '/constants/boroughs'
  const response = await get<Borough[]>(url)
  if (response.data?.length == 0) throw new Error('Array is empty!')
  // if (response.error) {
  //   throw new Error(response.error)
  // }
  return response.data ?? []
}

export async function fetchStructures(): Promise<Structure[]> {
  const url = BACKEND_URL + '/constants/structures'
  const response = await get<Structure[]>(url)
  if (response.data?.length == 0) throw new Error('Array is empty!')
  // if (response.error) {
  //   throw new Error(response.error)
  // }
  return response.data ?? []
}

export async function fetchImages(id: number) {
  const url = BACKEND_URL + '/pictures/' + id
  const response = await get<PictureDto[]>(url)
  // if (response.error) {
  //   throw new Error(response.error)
  // }
  return response.data ?? []
}

export async function fetchThumbnail(thumbnail: string) {
  const url = `${BACKEND_URL}/pictures/thumbnail/${thumbnail}`
  const response = await get<string>(url, undefined)
  if (response.error) {
    console.error('Error fetching thumbnail:', response.error)
    return ''
  }
  return response.data ?? ''
}

export async function fetchTagsFromProperty(id: number): Promise<number[]> {
  const url = BACKEND_URL + '/properties/tags/' + id
  const response = await get<number[]>(url)
  // if (response.data?.length == 0) throw new Error('Array is empty!')
  // if (response.error) {
  //   throw new Error(response.error)
  // }
  return response.data ?? []
}
