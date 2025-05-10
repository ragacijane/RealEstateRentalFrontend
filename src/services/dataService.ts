// src/services/dataService.ts
import { get } from './apiService'
import { BACKEND_URL } from '../constants/constant'
import {
  type Tag,
  type Equipment,
  type Types,
  type Borough,
  type Structure,
  type Pictures,
  type SearchQueryParams,
  type PropertyProjected
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
  return response.data ?? []
}

export async function fetchStructures(): Promise<Structure[]> {
  const url = BACKEND_URL + '/constants/structures'
  const response = await get<Structure[]>(url)
  if (response.data?.length == 0) throw new Error('Array is empty!')
  return response.data ?? []
}

export async function fetchImages(id: number) {
  const url = BACKEND_URL + '/pictures/' + id
  const response = await get<Pictures[]>(url)
  return response.data ?? []
}

export async function fetchTagsFromProperty(id: number): Promise<number[]> {
  const url = BACKEND_URL + '/properties/tags/' + id
  const response = await get<number[]>(url)
  return response.data ?? []
}

export async function fetchFilteredProperty(
  params: SearchQueryParams
): Promise<PropertyProjected[]> {
  const queryParams: string[] = []
  if (params.idTy != undefined) queryParams.push(`idTy=${params.idTy}`)
  if (params.idBors != undefined && params.idBors.length > 0)
    queryParams.push(`idBors=${params.idBors.join(',')}`)
  if (params.sqMin) queryParams.push(`sqMin=${params.sqMin}`)
  if (params.sqMax) queryParams.push(`sqMax=${params.sqMax}`)
  if (params.cat != undefined) queryParams.push(`cat=${params.cat}`)
  if (params.idSt != undefined) queryParams.push(`idSt=${params.idSt}`)
  if (params.idEq != undefined) queryParams.push(`idEq=${params.idEq}`)
  if (params.prMin) queryParams.push(`prMin=${params.prMin}`)
  if (params.prMax) queryParams.push(`prMax=${params.prMax}`)

  queryParams.push(`page=${params.page}`)
  queryParams.push(`size=${params.size}`)
  queryParams.push(`sort=${params.sort}`)
  queryParams.push(`asc=${params.ascending}`)

  const queryString = `?${queryParams.join('&')}`
  const url = `${BACKEND_URL}/properties/filters${queryString}`
  const response = await get<PropertyProjected[]>(url)
  return response.data ?? []
}

export async function fetchProperty(id: number): Promise<PropertyProjected | null> {
  const url = `${BACKEND_URL}/properties/property?id=${id}`
  const response = await get<PropertyProjected>(url)
  return response.data ?? null
}
