<script lang="ts">
import { provideAdminContext } from '@/contexts/adminContext'
import { fetchProperties } from '@/services/adminService'
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'AdminProvider',
  setup() {
    const { allProperties, setAllProperties } = provideAdminContext()
    // hello world
    const fetchAndSetProperties = async () => {
      if (allProperties.length == 0) {
        try {
          const allProperties = await fetchProperties()
          setAllProperties(allProperties)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
    }

    onMounted(fetchAndSetProperties)
  }
})
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>
