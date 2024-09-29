<script setup lang="ts">
import PropertyCard from '@/components/UserViewComponents/PropertyCard.vue'
import TheHeader from '@/components/UserViewComponents/TheHeader.vue'
import type { Property, SearchQueryParams } from '@/typesAndUtils/types'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import SearchBar from '@/components/UserViewComponents/SearchBar.vue'
import { fetchFilteredProperty as fetchFilteredProperties } from '@/services/dataService'
import { useDataStore } from '@/store/dataStore'

const applyFiltersParams = async (filterParams: SearchQueryParams) => {
  const data = await fetchFilteredProperties(filterParams)

  console.log(data.length)
  return data
}

const filteredProperties = ref<Property[]>([])
const router = useRoute()
const isLoading = ref<Boolean>(false)
const dataStore = useDataStore()

const parseQueryParams = (): SearchQueryParams => {
  return {
    idTy: router.query.idTy ? parseInt(router.query.idTy as string) : null,
    idBors:
      router.query.idBors !== undefined
        ? (router.query.idBors as string).split(',').map(Number)
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
  async () => {
    filterParams.value = parseQueryParams()
    isLoading.value = true
    filteredProperties.value = await applyFiltersParams(filterParams.value)
    isLoading.value = false
  },
  { immediate: true } // Make sure the watcher triggers on initial load
)

// const handleFilterUpdate = async (newFilterParams: SearchQueryParams) => {
//   // Update the filtered properties based on the new filter params
//   isLoading.value = true
//   filteredProperties.value = await applyFilters(newFilterParams)
//   isLoading.value = false
// }
</script>

<template>
  <TheHeader class="pb-2" />
  <v-container fluid>
    <SearchBar :filter-params="filterParams" />

    <v-divider></v-divider>
  </v-container>

  <v-container fluid>
    <div v-if="isLoading" class="text-center">
      <v-progress-circular size="120" color="primary" indeterminate />
    </div>
    <div v-else-if="filteredProperties.length > 0">
      <v-row align="center" justify="center">
        <v-col
          v-for="(property, index) in filteredProperties"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
          class="d-flex justify-center"
        >
          <PropertyCard :property="property" />
        </v-col>
      </v-row>
    </div>
    <!-- Show message when no properties are found -->
    <div v-else class="text-center">
      <p>No properties found.</p>
    </div>
  </v-container>
</template>
