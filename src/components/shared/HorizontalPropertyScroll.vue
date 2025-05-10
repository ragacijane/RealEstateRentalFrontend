<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import PropertyCard from '@/components/UserViewComponents/PropertyCard.vue'
import type { PropertyProjected } from '@/typesAndUtils/types'
import { fetchFilteredProperty } from '@/services/dataService'

const properties = ref<PropertyProjected[]>([])
const isLoading = ref(true)
const scrollContainer = ref<HTMLElement | null>(null)
let scrollInterval: ReturnType<typeof setInterval> | null = null

const CLONE_COUNT = 2 // Clone first N items

onMounted(async () => {
  const data = await fetchFilteredProperty({
    idTy: null,
    idBors: null,
    sqMin: null,
    sqMax: null,
    cat: null,
    idSt: null,
    idEq: null,
    prMin: null,
    prMax: null,
    page: 0,
    size: 10,
    sort: 'price',
    ascending: false
  })
  properties.value = [...data, ...data.slice(0, CLONE_COUNT)] // Clone first N items
  isLoading.value = false
  await nextTick()
  startAutoScroll()
})

const startAutoScroll = () => {
  scrollInterval = setInterval(() => {
    const el = scrollContainer.value
    if (!el) return

    const scrollAmount = 260
    const maxScroll = el.scrollWidth - el.clientWidth

    // If near cloned items, reset to start instantly
    if (el.scrollLeft + scrollAmount >= maxScroll - scrollAmount) {
      el.scrollTo({ left: 0, behavior: 'auto' }) // Instant jump
    } else {
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }, 3000)
}

onBeforeUnmount(() => {
  if (scrollInterval) clearInterval(scrollInterval)
})
</script>

<template>
  <v-container fluid class="scroll-container">
    <h3 class="text-h5 mb-4">PREPORUČENO</h3>
    <v-divider class="pa-4"></v-divider>

    <div ref="scrollContainer" class="scroll-wrapper">
      <div v-for="(property, index) in properties" :key="index" class="property-card-wrapper">
        <PropertyCard :property="property" />
      </div>
    </div>

    <div v-if="isLoading" class="text-center mt-4">
      <v-progress-circular indeterminate color="primary" />
    </div>
  </v-container>
</template>

<style scoped>
.scroll-container {
  background-color: transparent !important;
  box-shadow: none;
}

.scroll-wrapper {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  gap: 80px;
  padding-bottom: 10px;
  scrollbar-width: none;
}
.scroll-wrapper::-webkit-scrollbar {
  display: none;
}

.property-card-wrapper {
  flex: 0 0 auto;
  scroll-snap-align: start;
  width: 250px;
}
</style>
