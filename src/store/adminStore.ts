import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchProperties } from '@/services/adminService'
import type { OwnerItem } from '@/typesAndUtils/types'

export const useAdminStore = defineStore('admin', () => {
  const allProperties = ref<OwnerItem[]>([])
  const isLoading = ref<boolean>(false)

  const setAllProperties = (newData: OwnerItem[]) => {
    allProperties.value = newData
  }

  const fetchAndSetProperties = async () => {
    isLoading.value = true
    try {
      const properties = await fetchProperties()
      setAllProperties(properties)
    } catch (error) {
      console.error('Error fetching properties:', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    allProperties,
    isLoading,
    setAllProperties,
    fetchAndSetProperties
  }
})
