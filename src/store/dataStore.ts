// src/stores/dataStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  fetchTags,
  fetchEquipment,
  fetchTypes,
  fetchBoroughs,
  fetchStructures
} from '@/services/dataService'
import type { Tag, Equipment, Types, Borough, Structure } from '@/typesAndUtils/types'

export const useDataStore = defineStore('dataStore', () => {
  const allTags = ref<Tag[]>([])
  const allEquips = ref<Equipment[]>([])
  const allTypes = ref<Types[]>([])
  const allBoroughs = ref<Borough[]>([])
  const allStructures = ref<Structure[]>([])

  const setAllTags = (newData: Tag[]) => {
    allTags.value = newData
  }
  const setAllEquips = (newData: Equipment[]) => {
    allEquips.value = newData
  }
  const setAllTypes = (newData: Types[]) => {
    allTypes.value = newData
  }
  const setAllBoroughs = (newData: Borough[]) => {
    allBoroughs.value = newData
  }
  const setAllStructures = (newData: Structure[]) => {
    allStructures.value = newData
  }

  const fetchTagsDataStore = async () => {
    try {
      const tags = await fetchTags()
      setAllTags(tags)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchData = async () => {
    try {
      const [tags, equipment, types, boroughs, structures] = await Promise.all([
        fetchTags(),
        fetchEquipment(),
        fetchTypes(),
        fetchBoroughs(),
        fetchStructures()
      ])
      setAllTags(tags)
      setAllEquips(equipment)
      setAllTypes(types)
      setAllBoroughs(boroughs)
      setAllStructures(structures)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return {
    allTags,
    allEquips,
    allTypes,
    allBoroughs,
    allStructures,
    setAllTags,
    setAllEquips,
    setAllTypes,
    setAllBoroughs,
    setAllStructures,
    fetchData,
    fetchTagsDataStore
  }
})
