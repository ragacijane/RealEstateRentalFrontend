<script setup lang="ts">
import TheHeader from '@/components/UserViewComponents/TheHeader.vue'
import Image from '@/assets/backgroundImage.jpg'
import { defineComponent, onMounted, ref } from 'vue'
import BaseSearch from '@/components/UserViewComponents/BaseSearch.vue'
import type { Borough, Equipment, Structure, Tag, Types } from '@/typesAndUtils/types'
import { useDataStore } from '@/store/dataStore'

const dataStore = useDataStore()
const allTags = ref<Tag[]>([])
const allTypes = ref<Types[]>([])
const allBoroughs = ref<Borough[]>([])
const allStructures = ref<Structure[]>([])
const allEquips = ref<Equipment[]>([])
const isLoading = ref(true)

onMounted(async () => {
  await dataStore.fetchData()
  console.log('fetched')
  allTypes.value = dataStore.allTypes

  isLoading.value = false
})
</script>

<template>
  <TheHeader :allTypes="allTypes" />
  <!-- Background Image Container -->
  <v-container fluid class="pa-0 pt-2 background-container">
    <v-img :src="Image" alt="Responsive Image" class="background-image" cover />
    <div class="card-wrapper">
      <BaseSearch :loading="isLoading" />
    </div>
  </v-container>
</template>

<style scoped>
/* Background image style */
.background-container {
  position: relative;
  width: 100vw;
  height: calc(100vh - 68px); /* Adjust according to the header height */
  overflow: hidden;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  z-index: -1; /* Ensure image stays in the background */
}

.card-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 68px);
}
</style>
