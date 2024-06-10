import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchProperties } from '@/services/adminService'
import type { OwnerItem } from '@/typesAndUtils/types'

export const useAdminStore = defineStore('admin', () => {
  const allProperties = ref<OwnerItem[]>([])

  const setAllProperties = (newData: OwnerItem[]) => {
    allProperties.value = newData
  }

  const fetchAndSetProperties = async () => {
    try {
      const properties = await fetchProperties()
      setAllProperties(properties)
    } catch (error) {
      console.error('Error fetching properties:', error)
    }
  }

  return {
    allProperties,
    setAllProperties,
    fetchAndSetProperties
  }
})
