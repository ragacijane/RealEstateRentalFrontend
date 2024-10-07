<script setup lang="ts">
import PropertyCard from '@/components/UserViewComponents/PropertyCard.vue'
import type { PropertyProjected, SearchQueryParams } from '@/typesAndUtils/types'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SearchBar from '@/components/UserViewComponents/SearchBar.vue'
import { fetchFilteredProperty as fetchFilteredProperties } from '@/services/dataService'
import apoloneImage from '@/assets/colorLogoTextVer.svg'

const filteredProperties = ref<PropertyProjected[]>([])
const sortedProperties = ref<PropertyProjected[]>([])
const route = useRoute()
const router = useRouter()
const isLoading = ref<Boolean>(false)

const applyFiltersParams = async (filterParams: SearchQueryParams) => {
  const data = await fetchFilteredProperties(filterParams)
  return data
}

// PARAMS

const parseQueryParams = (): SearchQueryParams => {
  return {
    idTy: route.query.idTy ? parseInt(route.query.idTy as string) : null,
    idBors:
      route.query.idBors !== undefined
        ? (route.query.idBors as string).split(',').map(Number)
        : null,
    sqMin: (route.query.sqMin as string) || null,
    sqMax: (route.query.sqMax as string) || null,
    cat: route.query.cat !== undefined ? parseInt(route.query.cat as string) : null,
    idSt: route.query.idSt !== undefined ? parseInt(route.query.idSt as string) : null,
    idEq: route.query.idEq !== undefined ? parseInt(route.query.idEq as string) : null,
    prMin: (route.query.prMin as string) || null,
    prMax: (route.query.prMax as string) || null
  }
}

const filterParams = ref<SearchQueryParams>(parseQueryParams())

watch(
  () => route.query,
  async () => {
    filterParams.value = parseQueryParams()
    isLoading.value = true
    filteredProperties.value = await applyFiltersParams(filterParams.value)
    sortedProperties.value = sortProperties()
    isLoading.value = false
  },
  { immediate: true }
)

// SORTING
const sortOption = ref('priceAsc')

const sortProperties = () => {
  if (!filteredProperties.value) return []

  let sorted = [...filteredProperties.value]

  switch (sortOption.value) {
    case 'priceAsc':
      sorted.sort((a, b) => (parseInt(a.price) || 0) - (parseInt(b.price) || 0))
      break
    case 'priceDesc':
      sorted.sort((a, b) => (parseInt(b.price) || 0) - (parseInt(a.price) || 0))
      break
    case 'sqFtAsc':
      sorted.sort((a, b) => (parseInt(a.squareFootage) || 0) - (parseInt(b.squareFootage) || 0))
      break
    case 'sqFtDesc':
      sorted.sort((a, b) => (parseInt(b.squareFootage) || 0) - (parseInt(a.squareFootage) || 0))
      break
    default:
      break
  }
  return sorted
}

const handleSortChange = (option: string) => {
  sortOption.value = option
}

watch(
  sortOption,
  () => {
    isLoading.value = true
    sortedProperties.value = sortProperties()
    isLoading.value = false
  },
  { immediate: true }
)
</script>

<template>
  <v-container fluid :key="sortOption" min-height="100vh">
    <SearchBar
      :filter-params="filterParams"
      :current-sort-method="sortOption"
      @sort="handleSortChange"
    />
    <v-divider class="pa-4"></v-divider>
    <div v-if="isLoading" class="text-center">
      <v-row align="center" justify="center">
        <v-col
          v-for="n in 12"
          :key="n"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
          class="d-flex justify-center"
        >
          <v-skeleton-loader
            class="mx-auto"
            width="250px"
            height="360px"
            type="image, article"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </div>
    <div v-else-if="sortedProperties.length > 0">
      <v-row align="center" justify="center">
        <v-col
          v-for="(property, index) in sortedProperties"
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
      <v-empty-state
        headline="&nbsp;"
        title="Nema rezultata."
        text="Nažalost nemamo oglase koji odgovaraju navedenim kriterijumima."
        :image="apoloneImage"
      >
        <v-btn variant="flat" color="primary" @click="() => router.push('/')">Povratak</v-btn>
      </v-empty-state>
    </div>
  </v-container>
</template>
