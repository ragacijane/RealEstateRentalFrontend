<script setup lang="ts">
import PropertyCard from '@/components/UserViewComponents/PropertyCard.vue'
import TheHeader from '@/components/UserViewComponents/TheHeader.vue'
import type { Property, SearchQueryParams } from '@/typesAndUtils/types'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import SearchBar from '@/components/UserViewComponents/SearchBar.vue'

const fetchFilteredProperties = (filterParams: SearchQueryParams) => {
  // Add your API logic to fetch filtered properties here
  // Based on filterParams
  return [] // Returning empty for now
}

const filteredProperties = ref<Property[]>([])
const router = useRoute()

const parseQueryParams = (): SearchQueryParams => {
  return {
    idTy: router.query.idTy ? parseInt(router.query.idTy as string) : null,
    idBor:
      router.query.idBor !== undefined
        ? (router.query.idBor as string).split(',').map(Number)
        : null,
    sqMin: (router.query.sqMin as string) || null,
    sqMax: (router.query.sqMax as string) || null,
    cat: router.query.cat !== undefined ? parseInt(router.query.cat as string) : null,
    idSt: router.query.idSt !== undefined ? parseInt(router.query.idSt as string) : null,
    idEq: router.query.idEq !== undefined ? parseInt(router.query.idEq as string) : null,
    prMin: (router.query.prMin as string) || null,
    prMax: (router.query.prMax as string) || null
  }
}

const filterParams = ref<SearchQueryParams>(parseQueryParams())

watch(
  () => router.query,
  () => {
    filterParams.value = parseQueryParams()
    filteredProperties.value = fetchFilteredProperties(filterParams.value)
  },
  { immediate: true } // Make sure the watcher triggers on initial load
)

const handleFilterUpdate = (newFilterParams: SearchQueryParams) => {
  // Update the filtered properties based on the new filter params
  filteredProperties.value = fetchFilteredProperties(newFilterParams)
}
</script>

<template>
  <TheHeader class="pb-2" />
  <SearchBar :filter-params="filterParams" @filter="handleFilterUpdate" />
  <v-container>
    <PropertyCard />
  </v-container>
</template>
