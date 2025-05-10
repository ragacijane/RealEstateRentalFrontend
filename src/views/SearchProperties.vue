<script setup lang="ts">
import PropertyCard from '@/components/UserViewComponents/PropertyCard.vue'
import type { PropertyProjected, SearchQueryParams } from '@/typesAndUtils/types'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SearchBar from '@/components/UserViewComponents/SearchBar.vue'
import { fetchFilteredProperty as fetchFilteredProperties } from '@/services/dataService'
import apoloneImage from '@/assets/colorLogoTextVer.svg'

const filteredProperties = ref<PropertyProjected[]>([])
const route = useRoute()
const router = useRouter()
const isLoading = ref<Boolean>(true)
const hasMore = ref(true)
const isFirstLoad = ref(true)

const handleScroll = () => {
  if (!hasMore.value || isLoading.value) return

  const scrollBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
  if (scrollBottom) {
    filterParams.value.page++
    applyFiltersParams()
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const applyFiltersParams = async () => {
  isLoading.value = true
  const data = await fetchFilteredProperties(filterParams.value)

  if (filterParams.value.page === 0) {
    filteredProperties.value = data
    isFirstLoad.value = false
  } else {
    filteredProperties.value = [...filteredProperties.value, ...data]
  }

  hasMore.value = data.length === filterParams.value.size
  isLoading.value = false
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
    prMax: (route.query.prMax as string) || null,
    page: 0,
    size: 20,
    sort: 'price',
    ascending: true
  }
}

const filterParams = ref<SearchQueryParams>(parseQueryParams())

watch(
  () => route.query,
  async () => {
    filterParams.value = parseQueryParams()
    filteredProperties.value = []
    hasMore.value = true
    await applyFiltersParams()
  },
  { immediate: true }
)

// SORTING
const sortOption = ref('priceAsc')

const handleSortChange = (option: string) => {
  sortOption.value = option
  switch (option) {
    case 'priceAsc':
      filterParams.value.sort = 'price'
      filterParams.value.ascending = true
      break
    case 'priceDesc':
      filterParams.value.sort = 'price'
      filterParams.value.ascending = false
      break
    case 'sqFtAsc':
      filterParams.value.sort = 'squareFootage'
      filterParams.value.ascending = true
      break
    case 'sqFtDesc':
      filterParams.value.sort = 'squareFootage'
      filterParams.value.ascending = false
      break
    default:
      break
  }
  filterParams.value.page = 0
  filteredProperties.value = []
  applyFiltersParams()
}
</script>

<template>
  <v-container fluid :key="sortOption" min-height="100vh">
    <SearchBar
      :filter-params="filterParams"
      :current-sort-method="sortOption"
      @sort="handleSortChange"
    />
    <v-divider class="pa-4"></v-divider>
    <div v-if="filteredProperties.length > 0">
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
    <div v-if="!isFirstLoad && !isLoading && filteredProperties.length === 0" class="text-center">
      <v-empty-state
        headline="&nbsp;"
        title="Nema rezultata."
        text="Nažalost nemamo oglase koji odgovaraju navedenim kriterijumima."
        :image="apoloneImage"
      >
        <v-btn variant="flat" color="primary" @click="() => router.push('/')">Povratak</v-btn>
      </v-empty-state>
    </div>
    <div v-if="isLoading || isFirstLoad" class="text-center">
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
  </v-container>
</template>
