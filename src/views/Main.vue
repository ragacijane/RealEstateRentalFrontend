<script setup lang="ts">
import Image from '@/assets/backgroundImage.jpg'
import { onMounted, ref } from 'vue'
import MainPageSearch from '@/components/UserViewComponents/MainPageSearch.vue'
import { useDataStore } from '@/store/dataStore'

const dataStore = useDataStore()

onMounted(async () => {
  await dataStore.fetchData()
})
</script>

<template>
  <!-- Background Image Container -->
  <v-container fluid class="pa-0 pt-2 background-container">
    <v-img :src="Image" alt="Responsive Image" class="background-image" cover />
    <div class="card-wrapper">
      <MainPageSearch />
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
