<script setup lang="ts">
import TheHeader from '@/components/UserViewComponents/TheHeader.vue'
import { fetchProperty } from '@/services/dataService'
import type { Property } from '@/typesAndUtils/types'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const property = ref<Property | null>(null)
const router = useRoute()
const isLoading = ref<boolean>(false)

const getProperty = async () => {
  const id = router.query.id ? parseInt(router.query.id as string) : 0

  if (id > 0) {
    property.value = await fetchProperty(id)
  } else {
    console.error('Invalid property ID')
  }
}

onMounted(() => {
  getProperty()
})
</script>

<template>
  <TheHeader />
  Single Property
</template>
